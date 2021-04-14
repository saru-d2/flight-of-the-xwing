import * as THREE from '/build/three.module.js';
import Tie from './tie.js';

export default (scene) => {
    var ties = []

    function spawn(pos) {
        var tie = Tie(scene, pos[0], pos[1])
        console.log(pos[0])
        console.log(pos[1])
        ties.push(tie)
    }

    function update() {
        for (var i = 0; i < ties.length; i++) {
            if (ties[i]) {
                ties[i].update()
            }
        }


    }

    // function checkCols(ties) {
    //     // console.log('yutuy')
        
    // }
    function remove(i) {
        ties[i].remove()
        ties.splice(i, 1)
    }

    function length() {
        return ties.length;
    }

    function boundingBox(i) {
        return ties[i].boundingBox()
    }

    return { ties, update, spawn, remove, length, boundingBox }
}