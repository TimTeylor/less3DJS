// Variables for setup

let container;
let camera;
let render;
let scene;
let model;

function init() {
    container = document.querySelector(".scene");

    // Create scene
    scene = new THREE.Scene();
    
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1700;

    // Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 1200);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(150, 150, 500);
    scene.add(light);
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        model = gltf.scene.children[0];
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    model.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);