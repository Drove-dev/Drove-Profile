import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-waves',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styleUrl: './waves.component.css',
})
export class WavesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ngZone = inject(NgZone);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mesh!: THREE.Mesh;
  private material!: THREE.ShaderMaterial;
  private frameId: number | null = null;
  private resizeListener = this.onResize.bind(this);

  ngOnInit() {}

  ngAfterViewInit() {
    this.initThree();
    this.animate();
  }

  ngOnDestroy() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    
    // Clean up Three.js resources
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    window.removeEventListener('resize', this.resizeListener);
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;
    
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(20, 10, 128, 128);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#38bdf8') }, // Primary
        uColorB: { value: new THREE.Color('#8b5cf6') }  // Purple
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        // Simplex 2D noise
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
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.2;
    this.scene.add(this.mesh);

    window.addEventListener('resize', this.resizeListener);
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const render = (time: number) => {
        this.material.uniforms['uTime'].value = time * 0.001;
        this.renderer.render(this.scene, this.camera);
        this.frameId = requestAnimationFrame(render);
      };
      this.frameId = requestAnimationFrame(render);
    });
  }
}
