import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
export default (scene, x, y) => {
    var bullet
    var loader = new GLTFLoader()
    // var pLight;


    loader.load('assets/missle.glb', function (gltf) {
        bullet = gltf.scene
        gltf.scene.traverse(function (object) {
            if ((object instanceof THREE.Mesh)) {
                console.log('yes')
                object.emissive = new THREE.Color(0xff0000)
                object.emissiveIntensity = 10
            }
        });
        bullet.scale.setScalar(1);
        bullet.rotation.z = Math.PI
        bullet.rotation.x = Math.PI / 2
        bullet.rotation.y = Math.PI / 2
        bullet.position.set(x, y, 1)

        console.log(bullet.material)
        if (bullet instanceof THREE.Mesh) {
            console.log('ye')
        }
        console.log(bullet.position.y)
        scene.add(gltf.scene);
        // var pLight = new THREE.PointLight(0xff00000, 1, 100);
        // pLight.position.set(bullet.position)
        // pLight.position.z += 1
        // scene.add(pLight);
        // console.log(scene)

    }, undefined, function (error) {

        console.error(error);

    });

    function update() {
        if (bullet) {
            bullet.position.y += 1
            // if (pLight) {
            //     pLight.position.set(bullet.position)
            //     pLight.position.z -= 1
            // }
        }
    }

    function getPos() {
        if (bullet) {
            return [bullet.position.x, bullet.position.y]
        }
    }

    function remove() {
        scene.remove(bullet)
    }

    return { bullet, update, getPos, remove }
}