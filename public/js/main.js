import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import Xwing from './xwing.js'
import Tracks from './tracks.js'

let scene, camera, renderer, xwing, tracks

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)

  var amblight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(amblight)

  var dlight = new THREE.DirectionalLight(0xffffff, 2);
  dlight.castShadow = true;
  scene.add(dlight)
  camera.position.z = 50;

  addObjs()
}

function addObjs() {
  xwing = Xwing(scene)
  tracks = Tracks(scene)
}

function animate() {

  // cube.rotation.x += 0.01
  // xwing.rotation.x += 0.01
  xwing.update(xwing)
  tracks.update(tracks)
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function handleInput(event) {
  var keyCode = event.code;

  if (keyCode == 'KeyA') {
    xwing.move(1, 0)
  }
  if (keyCode == 'KeyW') {
    xwing.move(0, 1)
  }
  if (keyCode == 'KeyS') {
    xwing.move(0, -1)
  }
  if (keyCode == 'KeyD') {
    xwing.move(-1, 0)
  }
}

window.addEventListener('keydown', handleInput)
window.addEventListener('resize', onWindowResize)

init()
animate();