import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';



export default (scene) => {

    var xwing;
    var x = 0, y = 0;
    const loader = new GLTFLoader();
    loader.load('assets/xwing.glb', function (gltf) {

        xwing = gltf.scene
        xwing.scale.setScalar(0.4);
        xwing.rotation.x = Math.PI / 2
        scene.add(gltf.scene);
        console.log(scene)
        
    }, undefined, function (error) {
        
        console.error(error);
        
    });
    
    function move(inpX, inpY) {
        x -= inpX * 0.1
        y += inpY * 0.1
    }

    function update() {
        if (xwing){
            xwing.position.x = x
            xwing.position.y = y
        }
    }

    return {xwing,  update, move}
}