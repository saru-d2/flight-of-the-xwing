import * as THREE from '/build/three.module.js';
import Bullet from './bullet.js'
var right = true
var thing = 1
export default (scene) => {
    var bullets = []

    function update() {
        for (var i = 0; i < bullets.length; i++)
            if (bullets[i]) {
                bullets[i].update()
                // console.log(bullets[i].position)
                var pos = bullets[i].getPos()
                if (pos){
                    if (pos[1] > 100) {
                        
                        console.log('remove')
                        bullets[i].remove()
                        bullets.splice(i, 1)
                    }}
            }
            else { continue }
    }

    function spawn(pos, xwingSize) {
        var x = pos[0], y = pos[1]
        var xSize = xwingSize[0] / 2
        var yOff = xwingSize[1]/3
        var bullet = Bullet(scene, x + thing* xSize, y + yOff)
        thing *= -1
        bullets.push(bullet)
        console.log(bullets.length)
    }

    function remove(i) {
        bullets[i].remove()
        bullets.splice(i, 1)
    }

    function length() {
        return bullets.length;
    }

    function boundingBox(i) {
        return bullets[i].boundingBox()
    }

    return { bullets, update, spawn, remove, length, boundingBox }
}