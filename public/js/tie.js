import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

const MINX = -20
const MAXX = 20
const MINY = -45
const MAXY = 45

export default (scene, x, y) => {
    var tie, size
    var loader = new GLTFLoader()
    loader.load('assets/tie.glb', function (gltf) {
        tie = gltf.scene
        tie.scale.setScalar(0.8);
        tie.rotation.z = Math.PI
        tie.rotation.x = - Math.PI / 2
        // tie.rotation.y = Math.PI / 2
        console.log(x)
        console.log(y)
        tie.position.set(x, y, 0)
        console.log(tie.position.y)
        scene.add(gltf.scene);
        var box = new THREE.Box3().setFromObject(tie);
        size = [
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z,]
        // console.log(scene)

    }, undefined, function (error) {

        console.error(error);

    });

    var dir = 1
    function update() {
        if (tie) {
            // tie.position.y -= 0.5
            tie.position.x += 0.1 * dir
            if (tie.position.x > MAXX) dir = -1
            if (tie.position.x < MINX) dir = 1
            // console.log(tie.position)
        }


    }

    function getPos() {
        if (tie) {
            return [tie.position.x, tie.position.y]
        }
    }

    function remove() {
        scene.remove(tie)
    }

    function getSize() {
        return size
    }

    function getCoords() {
        return [tie.position.x, tie.position.y]
    }

    return { tie, update, getPos, remove, getSize, getCoords }

}