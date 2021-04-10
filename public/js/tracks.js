import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

export default (scene) => {
    var tracks = [];

    var x1 = 0
    var x2 = 0
    var y1 = 0, y0 = 0, ySize

    const loader = new GLTFLoader();
    loader.load('assets/track.glb', function (gltf) {

        var track1 = gltf.scene
        track1.scale.setScalar(2);
        track1.position.z = -30;
        track1.rotation.x = Math.PI / 2
        track1.rotation.y = Math.PI / 2
        console.log(track1.position.y)
        scene.add(gltf.scene);
        console.log(scene)
        tracks.push(track1)

    }, undefined, function (error) {

        console.error(error);

    });
    const loader2 = new GLTFLoader();
    loader2.load('assets/track.glb', function (gltf) {
        var track2 = gltf.scene
        track2.scale.setScalar(2);
        track2.position.z = -30;
        track2.rotation.x = Math.PI / 2
        track2.rotation.y = Math.PI / 2
        tracks.push(track2)
        scene.add(tracks[1]);
        console.log(scene)
        var box = new THREE.Box3().setFromObject(tracks[0]);
        console.log(box)
        ySize = box.max.y - box.min.y
        track2.position.y = -ySize
        console.log(ySize)

    }, undefined, function (error) {

        console.error(error);

    });

    

    function update() {
        y1 -= 0.5
        y0 -= 0.5

        // do special thing for replacement
        if (tracks[0]) {
            // console.log(tracks[0].position.y)
            tracks[0].position.y = y0
            tracks[1].position.y = y1

            if (tracks[0].position.y > tracks[1].position.y){
                var tmp = tracks[1]
                tracks[1] = tracks[0]
                tracks[0] = tmp

                tmp = y1
                y1 = y0
                y1 = tmp
            }
            if (tracks[0].position.y <= -ySize)
            {
                y0 = ySize
                y1 = 0

                console.log('hi')
            }
            //     // console.log(y1)
            //     // var pos = new THREE.vector3();
            //     // console.log(pos.getPositionFromMatrix( tracks[0].matrixWorld ));
        }
        
    }

    return { tracks, update }
}