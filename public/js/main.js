import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import Xwing from './xwing.js'
import Tracks from './tracks.js'
import Bullets from './bullets.js'
import Ties from './ties.js'

let scene, camera, renderer, xwing, tracks, bullets, ties

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

  var amblight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(amblight)

  var dlight = new THREE.DirectionalLight(0xffffff, 1);
  dlight.castShadow = true;
  // scene.add(dlight)

  var pLight = new THREE.PointLight(0xeeeeeee, 1, 100);
  pLight.position.set(0, 0, 30);
  scene.add(pLight);


  camera.up.set(0, 0, 1);
  camera.position.y = -15;
  camera.position.z = 30;

  camera.lookAt(0, 2, 3)
  addObjs()
}

function addObjs() {
  xwing = Xwing(scene)
  tracks = Tracks(scene)
  bullets = Bullets(scene)
  ties = Ties(scene)
}

function animate() {

  // cube.rotation.x += 0.01
  // xwing.rotation.x += 0.01
  handleInput()
  xwing.update(xwing, tracks)
  tracks.update(tracks)
  renderer.render(scene, camera)
  bullets.update(bullets)
  ties.update(ties)
  requestAnimationFrame(animate)
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}

var kbdA = false, kbdW = false, kbdS = false, kbdD = false, kbdSpace = false
function handleKeyDown(event) {
  var keyCode = event.code;

  if (keyCode == 'KeyA') {
    // xwing.move(1, 0)
    kbdA = true
  }
  if (keyCode == 'KeyW') {
    kbdW = true
    // xwing.move(0, 1)
  }
  if (keyCode == 'KeyS') {
    kbdS = true
    // xwing.move(0, -1)
  }
  if (keyCode == 'KeyD') {
    kbdD = true
    // xwing.move(-1, 0) 
  }
  if (keyCode == 'Space') {
    kbdSpace = true
    console.log('hi')
    // scene.remove(xwing)
    // xwing.move(-1, 0)
  }
}

function handleKeyUp(event) {
  var keyCode = event.code;

  if (keyCode == 'KeyA') {
    // xwing.move(1, 0)
    kbdA = false
  }
  if (keyCode == 'KeyW') {
    kbdW = false
    // xwing.move(0, 1)
  }
  if (keyCode == 'KeyS') {
    kbdS = false
    // xwing.move(0, -1)
  }
  if (keyCode == 'KeyD') {
    kbdD = false
    // xwing.move(-1, 0)
  }
  if (keyCode == 'Space') {
    kbdSpace = false
    // xwing.move(-1, 0)
  }

}

function handleInput() {
  if (kbdA)
    xwing.move(1, 0)

  if (kbdW)
    xwing.move(0, 1)

  if (kbdS)
    xwing.move(0, -1)

  if (kbdD)
    xwing.move(-1, 0)

  if (kbdSpace)
    if (xwing) {
      console.log(xwing.getCoords())
      bullets.spawn(xwing.getCoords(), xwing.getSize())
      kbdSpace = false
      // ties.spawn(2, 3)

    }
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.addEventListener('resize', onWindowResize)

init()
animate();