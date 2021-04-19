import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import Xwing from './xwing.js'
import Tracks from './tracks.js'
import Bullets from './bullets.js'
import Ties from './ties.js'
import Stars from './stars.js'
import tie from './tie.js';

var score = 0
var health = 5
let scene, camera, renderer, xwing, tracks, bullets, ties, stars
var tiesLoaded = false
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
  camera.position.y = -10;
  camera.position.z = 70;

  camera.lookAt(0, 2, 3)
  addObjs()
}

function addObjs() {
  xwing = Xwing(scene)
  tracks = Tracks(scene)
  bullets = Bullets(scene)
  ties = Ties(scene)
  ties.spawn([15, 20])
  ties.spawn([0, 50])
  ties.spawn([-15, 60])
  stars = Stars(scene)
  stars.spawn([3, 10])
  stars.spawn([8, 30])
  stars.spawn([-10, 40])
}

function animate() {

  hud()

  handleInput()
  xwing.update(xwing, tracks)
  tracks.update(tracks)
  renderer.render(scene, camera)
  bullets.update(bullets)
  ties.update(ties)
  stars.update(stars)
  handleCollisions()
  requestAnimationFrame(animate)
  // 
  // console.log(ties)

}

function handleCollisions() {
  //  ties, red bullets
  var x11, x2, x1, x22, y11, y2, y22, y1, x1, y1

  if (ties[0])
    x11, y11 = ties[0].getSize()
  if (bullets[0])
    x22, y22 = bullets[0].getSize()
  // console.log(ties.length())
  for (var i = 0; i < ties.length(); i++) {
    // console.log('umm')
    if (ties[i]) {
      console.log('heyo')
      x1, y1, z1 = ties[i].getCoords()
    }
    for (var j = 0; j < bullets.length(); j++) if (bullets[i]) {
      x2, y2, z2 = bullets[i].getCoords()
      console.log(x1, x2, y1, y2)
      //  intersect 
      console.log('hey')
      if (x1 + x11 >= x2 - x22 || x1 - x11 <= x2 - x22) {
        console.log('x intersect')
      }
    }
  }
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function hud() {
  document.getElementById('health').innerHTML = String(health);
  document.getElementById('score').innerHTML = String(score);
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
    // console.log('hi')
    // scene.remove(xwing)
    // xwing.move(-1, 0)
  }
}

function handleKeyUp(event) {
  var keyCode = event.code;

  if (keyCode == 'KeyA') {
    kbdA = false
  }
  if (keyCode == 'KeyW') {
    kbdW = false
  }
  if (keyCode == 'KeyS') {
    kbdS = false
  }
  if (keyCode == 'KeyD') {
    kbdD = false
  }
  if (keyCode == 'Space') {
    kbdSpace = false
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
      bullets.spawn(xwing.getCoords(), xwing.getSize())
      kbdSpace = false
    }
    if (ties[0]) {
      console.log(ties[0].getCoords())
    }else {
      console.log('wtf is this')
    }
}


window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.addEventListener('resize', onWindowResize)

init()
animate();