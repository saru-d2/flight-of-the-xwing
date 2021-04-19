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
    var enemyBullet, size
    var customMaterial = new THREE.ShaderMaterial({
        uniforms:
        {
            s: { type: "f", value: -1.0 },
            b: { type: "f", value: 1.0 },
            p: { type: "f", value: 2.0 },
            glowColor: { type: "c", value: new THREE.Color(0x0000ff) }
        },
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    })

    var loader = new GLTFLoader()
    // var pLight;


    loader.load('assets/enemyMissle.glb', function (gltf) {
        enemyBullet = gltf.scene
        // enemyBullet.traverse(function (child) {

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
        enemyBullet.scale.setScalar(1.5);
        enemyBullet.rotation.z = Math.PI
        enemyBullet.rotation.x =  Math.PI / 2
        enemyBullet.rotation.y = - Math.PI / 2
        enemyBullet.position.set(x, y, 1)

        // console.log(enemyBullet.material)
        if (enemyBullet instanceof THREE.Mesh) {
            console.log('ye')
        }
        // console.log(enemyBullet.position.y)
        scene.add(gltf.scene)

        var box = new THREE.Box3().setFromObject(enemyBullet);
        size = [
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z,]
        // var pLight = new THREE.PointLight(0xff00000, 1, 100);
        // pLight.position.set(enemyBullet.position)
        // pLight.position.z += 1
        // scene.add(pLight);
        // console.log(scene)

    }, undefined, function (error) {

        console.error(error);

    });

    function update() {
        if (enemyBullet) {
            enemyBullet.position.y -= 1
            // if (pLight) {
            //     pLight.position.set(enemyBullet.position)
            //     pLight.position.z -= 1
            // }
        }
    }

    function getPos() {
        if (enemyBullet) {
            return [enemyBullet.position.x, enemyBullet.position.y]
        }
    }

    function remove() {
        scene.remove(enemyBullet)
    }

    function getSize() {
        return size;
    }

    return { enemyBullet, update, getPos, remove, getSize }
}