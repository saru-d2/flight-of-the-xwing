import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';


export default (scene, x, y) => {
    var star
    var loader = new GLTFLoader()
    loader.load('assets/star.glb', function (gltf) {
        star = gltf.scene
        star.scale.setScalar(0.8);
        star.rotation.z = Math.PI
        star.rotation.x = - Math.PI / 2
        // star.rotation.y = Math.PI / 2
        console.log(x)
        console.log(y)
        star.position.set(x, y, 0)
        console.log(star.position.y)
        scene.add(gltf.scene);
        // console.log(scene)
        
    }, undefined, function (error) {
        
        console.error(error);
        
    });
    
    function update() {
        if (star) {
            // star.position.y -= 0.5
            star.rotation.x += 0.01
            star.rotation.z += 0.03
            star.rotation.y += 0.02
            // console.log(star.rotation)
        }
    }
    return { star, update }
}
