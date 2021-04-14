import * as THREE from '/build/three.module.js';
import Star from './star.js';


export default (scene) => {
    var stars = []

    function spawn(pos) {
        var star = Star(scene, pos[0], pos[1])
        // console.log(pos[0])
        // console.log(pos[1])
        stars.push(star)
    }

    function update() {
        for (var i =0; i<stars.length; i++) {
            if (stars[i]){
                stars[i].update()
            }
        }
    }

    return { stars, update, spawn }
}