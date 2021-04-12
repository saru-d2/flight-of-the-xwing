import * as THREE from '/build/three.module.js';
import Tie from './tie.js';

export default (scene) => {
    var ties = []

    function spawn(pos) {
        var tie = Tie(scene, pos[0], pos[1])
        ties.push(tie)
    }

    function update() {
        for (var i =0; i<ties.length; i++) {
            if (ties[i]){
                ties[i].update()
            }
        }
    }

    return { ties, update, spawn }
}