import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

const MINX = -20
const MAXX = 20
const MINY = -45
const MAXY = 45

export default (scene, x, y) => {
    var tie
    var loader = new GLTFLoader()
    loader.load('assets/tie.glb', function (gltf) {
        tie = gltf.scene
        tie.scale.setScalar(0.8);
        tie.rotation.z = Math.PI
        tie.rotation.x = - Math.PI / 2
        // tie.rotation.y = Math.PI / 2
        tie.position.set(1, 0, 1)
        console.log(tie.position.y)
        scene.add(gltf.scene);
        // console.log(scene)
        
    }, undefined, function (error) {
        
        console.error(error);
        
    });
    
    var dir = 1
    function update() {
        if (tie) {
            // tie.position.y -= 0.5
            tie.position.x += 0.1*dir
            if (tie.position.x > MAXX) dir = -1
            if (tie.position.x < MINX) dir = 1
        }
        
    }

    return { tie, update }

}