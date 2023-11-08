import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./style.css";

//Instanciem el loader de models GLTF
const loader = new GLTFLoader();

const rotationSpeed = 0.001;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled=true
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


let textureLoader  = new THREE.TextureLoader()

// SISTEMA SOLAR //////
///////////////////////

// array d’objectes dels quals hem d’actualitzar la rotació.
const objects = [];

//objecte 3d buid que serà el pare de la resta
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// emprarem una mateixa esfera per a tots.
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);

// sol amb un material emisiu
const sunMaterial = new THREE.MeshStandardMaterial({ emissive: 0xffff00 });
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.set(5, 5, 5); // fem el sol més gran
// solarSystem.add(sun);
// objects.push(sun);

//carbassa que farà de sol
let pumpkinSun = null;
loadModel(
  "Models/Pumpkin/scene.gltf",
  pumpkinSun,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.04, 0.04, 0.04),
  solarSystem
);

// punt de llum al centre
const color = 0xffffff;
const intensity = 1000;
const light = new THREE.PointLight(color, intensity);
solarSystem.add(light);

//objecte buid que contindrà la terra i els seus stelits
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const albedoMud = "Textures/coast_sand_rocks_02_1k.gltf/textures/coast_sand_rocks_02_diff_1k.jpg"
const normalMud = "Textures/coast_sand_rocks_02_1k.gltf/textures/coast_sand_rocks_02_nor_gl_1k.jpg"

const albedoTexture = textureLoader.load(albedoMud)
const normalTexture = textureLoader.load(normalMud)

//colo blau lleugerament emisiu. vora el sol
const earthMaterial = new THREE.MeshStandardMaterial({
  
  map: albedoTexture,
  normalMap: normalTexture,
  //roughnessMap: roughTexture
})
const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earth);

//objecte buid que contindrà mart
const marsOrbit = new THREE.Object3D();
marsOrbit.position.x = -12;
solarSystem.add(marsOrbit);
objects.push(marsOrbit);

const mars = new THREE.Mesh(sphereGeometry, earthMaterial);
marsOrbit.add(mars);

//objecte buid que rotarà la lluna i els seus fulls ( si en tengués )
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);

//lluna lleugerament emisiva vora la terra
const moonMaterial = new THREE.MeshPhongMaterial({
  color: 0x888888,
  emissive: 0x222222,
});
const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
moon.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moon);

//objecte buid que contindrà la calavera i els seus satelits
const skullOrbit = new THREE.Object3D();
skullOrbit.position.z = 15;
skullOrbit.position.x = 15;
solarSystem.add(skullOrbit);
objects.push(skullOrbit);

//calavera com a planeta
let skullPlanet = null;
loadModel(
  "Models/Skull/scene.gltf",
  skullPlanet,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1.5, 1.5, 1.5),
  skullOrbit
);

//objecte buid que rotarà la lluna fantasma i els seus fulls ( si en tengués )
const ghostOrbit = new THREE.Object3D();
ghostOrbit.position.x = 2.5;
skullOrbit.add(ghostOrbit);
objects.push(ghostOrbit);


//model de fantasma que farà de lluna
let ghostMoon = null;
loadModel(
  "Models/Ghost/scene.gltf",
  ghostMoon,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.006, 0.006, 0.006),
  ghostOrbit
);

//objecte buid que rotarà la lluna fantasma i els seus fulls ( si en tengués )
const ghostOrbit2 = new THREE.Object3D();
ghostOrbit2.position.z = 2.5;
skullOrbit.add(ghostOrbit2);
objects.push(ghostOrbit2);


//model de fantasma que farà de lluna
let ghostMoon2 = null;
loadModel(
  "Models/Ghost/scene.gltf",
  ghostMoon2,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.004, 0.004, 0.004),
  ghostOrbit2
);

//objecte buid que contindrà el caramel
const candyOrbit = new THREE.Object3D();
candyOrbit.position.x = -20;
solarSystem.add(candyOrbit);
objects.push(candyOrbit);

//model de caramelo que farà de planeta
let candyPlanet = null;
loadModel(
  "Models/Candy/scene.gltf",
  candyPlanet,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.25, 0.25, 0.25),
  candyOrbit
);

//objecte buid que contindrà el caramel
const witchOrbit = new THREE.Object3D();
witchOrbit.position.x = -25;
witchOrbit.position.z = -20;
solarSystem.add(witchOrbit);
objects.push(candyOrbit);

//model de caramelo que farà de planeta
let witchPlanet = null;
loadModel(
  "Models/Witch/scene.gltf",
  witchPlanet,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.4, 0.4, 0.4),
  witchOrbit
);

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
  'Textures/environmentMaps/StarryNight/px.png',
  'Textures/environmentMaps/StarryNight/nx.png',
  'Textures/environmentMaps/StarryNight/py.png',
  'Textures/environmentMaps/StarryNight/ny.png',
  'Textures/environmentMaps/StarryNight/pz.png',
  'Textures/environmentMaps/StarryNight/nz.png'
])
scene.background = environmentMap

///////////////////////
///////////////////////

//directional light
// const dirlight = new THREE.DirectionalLight(0xffffff, 3);
// dirlight.position.set(-1, 2, 4);
// scene.add(dirlight);

//ambient light
const ambiLight = new THREE.AmbientLight( 0x808080, 2.5); // soft white light
scene.add( ambiLight );

let time = Date.now();
function animate() {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  objects.forEach((obj) => {
    if (obj != null) obj.rotation.y += rotationSpeed * deltaTime;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

function loadModel(path, object3d, position, scale, systemToAdd) {
  //Carregam el fitxer
  loader.load(
    path,
    //FUNCIONS DE CALLBACK
    function (gltf) {
      //Si es carrega correctament l'afegim a l'escena
      object3d = gltf.scene;
      object3d.position.set(position.x, position.y, position.z);
      object3d.scale.set(scale.x, scale.y, scale.z);
      systemToAdd.add(object3d);
      objects.push(pumpkinSun);
    },
    function (xhr) {
      //Aquesta funció de callback es crida mentre es carrega el model
      //i podem mostrar el progrés de càrrega
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      //callback per quan hi ha un error. El podem mostrar per consola.
      console.error(error);
    }
  );
}
