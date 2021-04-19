import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';

function vertexShader() {
    return `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() 
    {
      vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
      vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `
}

function fragmentShader() {
    return `
    uniform vec3 glowColor;
    uniform float b;
    uniform float p;
    uniform float s;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    void main() 
    {
      float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
      gl_FragColor = vec4( glowColor, a );
    }
    `
}

export default (scene, x, y) => {
    var bullet, size
    var customMaterial = new THREE.ShaderMaterial({
        uniforms:
        {
            s: { type: "f", value: -1.0 },
            b: { type: "f", value: 1.0 },
            p: { type: "f", value: 2.0 },
            glowColor: { type: "c", value: new THREE.Color(0xff0000) }
        },
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    })

    var loader = new GLTFLoader()
    // var pLight;


    loader.load('assets/missle.glb', function (gltf) {
        bullet = gltf.scene
        // bullet.traverse(function (child) {

        //     if (child.isMesh) {
        //         child.material = customMaterial
        //     }

        // });
        // gltf.scene.traverse(function (object) {
        //     if ((object instanceof THREE.Mesh)) {
        //         console.log('yes')
        //         object.emissive = new THREE.Color(0xff0000)
        //         object.emissiveIntensity = 10
        //     }
        // });
        bullet.scale.setScalar(1);
        bullet.rotation.z = Math.PI
        bullet.rotation.x = Math.PI / 2
        bullet.rotation.y = Math.PI / 2
        bullet.position.set(x, y, 1)

        // console.log(bullet.material)
        if (bullet instanceof THREE.Mesh) {
            console.log('ye')
        }
        console.log(bullet.position.y)
        scene.add(gltf.scene);

        var box = new THREE.Box3().setFromObject(bullet);
        size = [
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z,]
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

    function getSize() {
        return size;
    }

    return { bullet, update, getPos, remove, getSize }
}