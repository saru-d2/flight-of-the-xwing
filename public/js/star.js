import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';


export default (scene, x, y) => {
    var star, size
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
        var box = new THREE.Box3().setFromObject(star);
        size = [
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z,]

        // console.log(scene)
        
    }, undefined, function (error) {
        
        console.error(error);
        
    });

    function remove() {
        scene.remove(star)
    }
    
    function update() {
        if (star) {
            // star.position.y -= 0.5
            star.rotation.x += 0.01
            star.rotation.z += 0.03
            star.rotation.y += 0.02
            // console.log(star.rotation)
        }
    }

    function getPos() {
        if (star)
            return [star.position.x, star.position.y]
    }

    function getSize() {
        if (star)
            return size
    }
    
    return { star, update, remove, getPos, getSize }
}
