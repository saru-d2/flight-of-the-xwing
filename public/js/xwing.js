// import { Vector3 } from 'three';
import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
const MINX = -20
const MAXX = 20
const MINY = -45
const MAXY = 45

export default (scene) => {

    var xwing;
    var x = 0, y = 0;
    const loader = new GLTFLoader();
    loader.load('assets/xwing.glb', function (gltf) {

        xwing = gltf.scene
        xwing.scale.setScalar(1);
        xwing.rotation.x = Math.PI / 2
        scene.add(gltf.scene);
        console.log(scene)

    }, undefined, function (error) {

        console.error(error);

    });

    function move(inpX, inpY) {
        x -= inpX * 0.6
        y += inpY * 0.6

        x = Math.min(MAXX, x)
        y = Math.min(MAXY, y)
        x = Math.max(MINX, x)
        y = Math.max(MINY, y)

    }

    function update(tracks) {
        if (xwing) {
            xwing.position.x = x
            xwing.position.y = y


            // var raycaster = new THREE.Raycaster(xwing.position,new THREE.Vector3(0, 0, +1))
            // var intersects = raycaster.intersectObjects(tracks)

            // if (intersects[0])
            //     console.log(intersects)
        }
    }

    function getCoords() {
        return [xwing.position.x, xwing.position.y]
    }

    function getSize() {
        var box = new THREE.Box3().setFromObject(xwing);
        return [
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z,]
    }

    return { xwing, update, move, getCoords, getSize }
}