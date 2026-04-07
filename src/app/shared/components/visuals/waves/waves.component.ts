import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import * as THREE from 'three';

interface ResizeData {
  width: number;
  height: number;
  dpr: number;
}

@Component({
  selector: 'app-waves',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styleUrl: './waves.component.css',
})
export class WavesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mesh!: THREE.Mesh;
  private material!: THREE.ShaderMaterial;
  private frameId: number | null = null;
  private resizeTimeoutId: number | null = null;
  private lastTime: number = 0;
  private isAnimating = false;
  private resizeData: ResizeData = {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(window.devicePixelRatio, 2),
  };

  ngOnInit() {
    // Detect if mobile/low-end device to optimize antialias
    this.resizeData.dpr = this.shouldOptimizeForLowEnd() ? 1 : Math.min(window.devicePixelRatio, 2);
  }

  ngAfterViewInit() {
    // Initialize Three.js immediately since ViewChild is static: true
    this.initThree();
    this.startAnimation();
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  /**
   * Detect if device is low-end (mobile, older hardware)
   */
  private shouldOptimizeForLowEnd(): boolean {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 8;
    return cores <= 2 || memory <= 4 || /iPhone|iPad|Android/.test(navigator.userAgent);
  }

  /**
   * Initialize Three.js scene with optimized settings
   */
  private initThree() {
    const canvas = this.canvasRef.nativeElement;

    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.resizeData.width / this.resizeData.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup with optimization flags
    const useAntialias = !this.shouldOptimizeForLowEnd();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: useAntialias,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false, // Disable if not needed
      stencil: false,
      depth: true,
    });

    this.renderer.setSize(this.resizeData.width, this.resizeData.height);
    this.renderer.setPixelRatio(this.resizeData.dpr);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Geometry: reduced segments for mobile
    const segments = this.shouldOptimizeForLowEnd() ? 64 : 128;
    const geometry = new THREE.PlaneGeometry(20, 10, segments, segments);

    // Material: optimized shader
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#38bdf8') },
        uColorB: { value: new THREE.Color('#8b5cf6') },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          
          float elevation = snoise(vec2(uv.x * 2.0, uv.y * 2.0 + uTime * 0.2)) * 0.5;
          elevation += snoise(vec2(uv.x * 5.0 + uTime * 0.1, uv.y * 5.0)) * 0.2;
          
          vElevation = elevation;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.z += elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectionPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          float mixStrength = (vElevation + 0.5) * 0.8;
          vec3 color = mix(uColorA, uColorB, mixStrength);
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.2;
    this.scene.add(this.mesh);
  }

  /**
   * Setup event listeners with proper cleanup
   */
  private setupEventListeners() {
    this.ngZone.runOutsideAngular(() => {
      // Throttled resize listener (300ms debounce)
      const onResize = () => {
        if (this.resizeTimeoutId !== null) {
          clearTimeout(this.resizeTimeoutId);
        }
        this.resizeTimeoutId = window.setTimeout(() => {
          this.onResize();
          this.resizeTimeoutId = null;
        }, 300);
      };

      window.addEventListener('resize', onResize, { passive: true });

      // Auto-cleanup on destroy
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', onResize);
        if (this.resizeTimeoutId !== null) {
          clearTimeout(this.resizeTimeoutId);
        }
      });
    });
  }

  /**
   * Handle window resize efficiently
   */
  private onResize() {
    this.resizeData.width = window.innerWidth;
    this.resizeData.height = window.innerHeight;

    this.camera.aspect = this.resizeData.width / this.resizeData.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.resizeData.width, this.resizeData.height);
  }

  /**
   * Start continuous animation loop
   */
  private startAnimation() {
    this.isAnimating = true;
    this.ngZone.runOutsideAngular(() => {
      const render = (time: number) => {
        if (!this.isAnimating) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        // Update shader uniform
        if (this.material && this.material.uniforms) {
          this.material.uniforms['uTime'].value = time * 0.001;
        }

        // Render scene
        this.renderer.render(this.scene, this.camera);

        this.frameId = requestAnimationFrame(render);
      };

      this.frameId = requestAnimationFrame(render);
    });
  }

  /**
   * Cleanup all resources properly
   */
  private cleanup() {
    this.isAnimating = false;

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }

    if (this.mesh?.geometry) {
      this.mesh.geometry.dispose();
    }

    if (this.material) {
      this.material.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    // Textures cleanup
    if (this.scene) {
      this.scene.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? (mesh.material as THREE.Material[])
            : [mesh.material as THREE.Material];

          materials.forEach((mat: THREE.Material) => {
            mat.dispose();
          });
        }
      });
    }
  }
}
