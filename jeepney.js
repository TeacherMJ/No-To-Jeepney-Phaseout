var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light mula direkta sa taas, 90° mula x-axis
var light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(10, 10, 10);
scene.add(light);

// placeholder vehicle habang gumagawa pako ng jeep:

// Create a new OBJLoader
const loader = new THREE.OBJLoader();

// Load the .obj file
loader.load(
    'testfile.obj',

    function (object) {
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened while loading the .obj file');
    }
);


// Texture ng jeep dito
var textureLoader = new THREE.TextureLoader();
var jeepneyTexture = textureLoader.load('jeepney-texture.jpg');

// Insert jeepney object mula sa clara.io
var jeepneyGeometry = new THREE.BoxGeometry(5, 2, 2);
var jeepneyMaterial = new THREE.MeshPhongMaterial({ map: jeepneyTexture });
var jeepney = new THREE.Mesh(jeepneyGeometry, jeepneyMaterial);
jeepney.position.set(0, 0, 0);
scene.add(jeepney);

// Render
function animate() {
  requestAnimationFrame(animate);
  jeepney.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

//Dito yung signboard na may "No to jeepney phaseout"
var rectangleGeometry = new THREE.BoxGeometry(0.5, 0.0625, 1);
var rectangleMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  opacity: 0.5,
  transparent: true,
});
var rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
rectangle.position.set(0, 0, 5);
rectangle.rotation.y = Math.PI /
