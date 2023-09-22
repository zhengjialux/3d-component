import { useEffect } from 'react'
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// 基础柱状图
export const Three = ({ fov = 75, near = 0.1 }) => {
  const _scene = new THREE.Scene();
  const _camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(1000, 500);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  _scene.add(cube);

  _camera.position.z = 5;

  useEffect(() => {
    const dom = document.querySelector('.three')
    if (WebGL.isWebGLAvailable()) {
      dom.appendChild(renderer.domElement);
      animate();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      dom.appendChild(warning);
    }
  }, [])

  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(_scene, _camera);
  }

  return <div className='three' />
}