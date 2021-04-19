import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import Xwing from './xwing.js'
import Tracks from './tracks.js'
import Star from './star.js'
import Tie from './tie.js';
import Bullet from './bullet.js'

var score = 0
var health = 5
let scene, camera, renderer, xwing, tracks, bullets, ties, stars, side = 1
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
  ties = []
  ties.push(Tie(scene, 15, 20))
  ties.push(Tie(scene, 0, 50))
  ties.push(Tie(scene, -15, 60))
  bullets = []
  stars = []
  stars.push(Star(scene, 3, 10))
  stars.push(Star(scene, 8, 30))
  stars.push(Star(scene, -10, 40))
}

function animate() {

  hud()

  handleInput()
  xwing.update(xwing, tracks)
  tracks.update(tracks)
  renderer.render(scene, camera)
  // bullets.update(bullets)
  updateBullets()
  // ties.update(ties)
  for (var i = 0; i < ties.length; i++) if (ties[i]) ties[i].update()
  // stars.update(stars)
  for (var i = 0; i < stars.length; i++) if (stars[i]) stars[i].update()
  handleCollisions()
  handleCollisionsStars()
  requestAnimationFrame(animate)
  // 
  // console.log(ties)

}

function handleCollisions() {
  //  ties, red bullets
  var x11 = -1, x2, x1, x22 = -1, y11 = -1, y2, y22 = -1, y1, x1, y1, z1, z2

  // console.log(ties.length())
  for (var i = 0; i < ties.length; i++) {
    // console.log('umm')
    if (ties[i]) {
      // console.log('heyo')
      var ret = ties[i].getCoords()
      if (ret) {
        x1 = ret[0]
        y1 = ret[1]
      }
      else { continue }
    }
    for (var j = 0; j < bullets.length; j++) if (bullets[i]) {
      // console.log(ties[i].getSize())
      if (x11 == -1) {
        var r1 = ties[i].getSize()
        if (r1) {
          x11 = r1[0]
          y11 = r1[1]
        }
      }
      if (x22 == -1) {
        var r2 = bullets[i].getSize()
        if (r2) {
          x22 = r2[0]
          y22 = r2[1]
        }
      }

      var ret = bullets[i].getPos()

      // console.log(ret)
      if (ret) {
        x2 = ret[0]
        y2 = ret[1]
        // console.log(x2, y2)
      }
      else { continue }
      // //  intersect 
      // console.log('hey')


      if (x1 + x11 >= x2 - x22 && x1 - x11 <= x2 + x22) {
        if (y1 + y11 >= y2 - y22 && y2 + y22 >= y1 + y11) {
          console.log('crash!!')

          handleCrashTies(i, j)
        }
      }
      // console.log(j)
    }
  }
}

function handleCollisionsStars() {
  var x1 = -1, x2, x11 = -1, x22 = -1, y1, y2, y11 = -1, y22 = -1
  for (var i = 0; i < stars.length; i++) {
    if (x11 == -1) if (xwing) {
      var r1 = xwing.getSize()
      if (r1) {
        x11 = r1[0]
        y11 = r1[1]
      }
    }
    if (x22 == -1) if (stars[i]) {
      var r2 = stars[i].getSize()
      if (r2) {
        x22 = r2[0]
        y22 = r2[1]
      }
    }

    if (xwing && stars[i]) {
      ;
    }
    else continue
    if (xwing)
      var r1 = xwing.getCoords()
    if (stars[i])
      var r2 = stars[i].getPos()
    if (r1) {
      x1 = r1[0]
      y1 = r1[1]
    } if (r2) {
      x2 = r2[0]
      y2 = r2[1]
    }
    if (x1 + x11 >= x2 - x22 && x1 - x11 <= x2 + x22) {
      if (y1 >= y2 - y22 && y2 + y22 >= y1 ) {
        console.log('crashStar!!')
        handleCrashStar(i)
      }
    }
  }
}

function handleCrashTies(i, j) {
  removeBullet(j)
  removeTie(i)
  score += 50
}

function handleCrashStar(i) {
  score += 10
  removeStar(i)
}

function removeStar(i) {
  stars[i].remove()
  stars.splice(i, 1)
}

function removeTie(i) {
  ties[i].remove()
  ties.splice(i, 1)
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
      spawnBullet(xwing.getCoords(), xwing.getSize())
      kbdSpace = false
    }
  // if (ties[0]) {
  //   // console.log(ties[0].getCoords())
  // } else {
  //   console.log('wtf is this')
  // }
}


function spawnBullet(pos, xwingSize) {
  var x = pos[0], y = pos[1]
  var xSize = xwingSize[0] / 2
  var yOff = xwingSize[1] / 3
  var bullet = Bullet(scene, x + side * xSize, y + yOff)
  side *= -1
  bullets.push(bullet)
  console.log(bullets.length)
}

function removeBullet(i) {
  bullets[i].remove()
  bullets.splice(i, 1)
}

function updateBullets() {
  for (var i = 0; i < bullets.length; i++)
    if (bullets[i]) {
      bullets[i].update()
      // console.log(bullets[i].position)
      var pos = bullets[i].getPos()
      if (pos) {
        if (pos[1] > 100) {

          console.log('remove')
          bullets[i].remove()
          bullets.splice(i, 1)
        }
      }
    }
    else { continue }
}


window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
window.addEventListener('resize', onWindowResize)

init()
animate();