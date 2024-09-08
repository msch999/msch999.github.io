import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
// scene.overrideMaterial = new THREE.MeshBasicMaterial({
// 	color: 0x00ff00,
// 	wireframe: true,
// })

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// lights
const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
dirLight1.position.set(2, 2, 2);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
dirLight2.position.set(- 2, - 2, - 2);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

// plane
const geoPlane = new THREE.PlaneGeometry(5, 5);
const matPlane = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geoPlane, matPlane);
plane.rotateX(- Math.PI / 2);
plane.position.y = -1.0;
scene.add(plane);

// const gridHelper = new THREE.GridHelper(10 /* size */, 10 /* divisions */);
// gridHelper.position.y = -0.9;
// scene.add(gridHelper);

//const geoSphere = new THREE.SphereGeometry( 1,8, 4 ); 
const geoSphere = new THREE.OctahedronGeometry(1, 1);
const matSphere = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true, visible: true });
const sphere = new THREE.Mesh(geoSphere, matSphere);
scene.add(sphere);


const geometry = new THREE.BoxGeometry(1, 1, 1);
//const geometry = new THREE.BoxGeometry(1, 1, 1);
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
//const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
const material = new THREE.MeshNormalMaterial({ wireframe: false, transparent: true, opacity: 0.8 });

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const gui = new GUI();
gui.add(document, 'title');
gui.add(controls, 'enableDamping', true);

const cubefolder = gui.addFolder('the cube');

const cubeParams = {
	resetToDefault() { setDefaultCubeParams() },
	opacityChangeSwitch: true,
	rotationVelocity: 0.003,
	rotationSwitch: true,
	rotationXplus: true,
	rotationX: true,
	rotationYplus: true,
	rotationY: true
};

cubefolder.add(cubeParams, 'resetToDefault');
cubefolder.add(material, 'opacity', 0, 1).listen();
cubefolder.add(cubeParams, 'opacityChangeSwitch').name('auto opacity').listen();

cubefolder.add(cubeParams, 'rotationVelocity', 0, 1).listen();
cubefolder.add(cubeParams, 'rotationSwitch').listen();  // .disable();
cubefolder.add(cubeParams, 'rotationXplus').listen();
cubefolder.add(cubeParams, 'rotationX').listen();
cubefolder.add(cubeParams, 'rotationYplus').listen();
cubefolder.add(cubeParams, 'rotationY').listen();

function setDefaultCubeParams() {
	cubeParams.opacityChangeSwitch = true;
	cubeParams.rotationVelocity = 0.003;
	cubeParams.rotationSwitch = true;
	cubeParams.rotationXplus = true;
	cubeParams.rotationX = true;
	cubeParams.rotationYplus = true;
	cubeParams.rotationY = true;
	material.opacity = 0.8;
}

const spherefolder = gui.addFolder('the sphere');

const sphereParams = {
	resetToDefault() { setDefaultSphereParams() },
	rotationVelocity: 0.003,
	rotationSwitch: true,
	rotationXplus: true,
	rotationX: true,
	rotationYplus: true,
	rotationY: true
};

spherefolder.add(sphereParams, 'resetToDefault');
spherefolder.add(matSphere, 'wireframe').listen();
spherefolder.add(matSphere, 'visible').listen();
spherefolder.add(sphereParams, 'rotationVelocity', 0, 1).listen();
spherefolder.add(sphereParams, 'rotationSwitch').listen();
spherefolder.add(sphereParams, 'rotationXplus').listen();
spherefolder.add(sphereParams, 'rotationX').listen();
spherefolder.add(sphereParams, 'rotationYplus').listen();
spherefolder.add(sphereParams, 'rotationY').listen();

function setDefaultSphereParams() {
	sphereParams.rotationVelocity = 0.003;
	sphereParams.rotationSwitch = true;
	sphereParams.rotationXplus = true;
	sphereParams.rotationX = true;
	sphereParams.rotationYplus = true;
	sphereParams.rotationY = true;

	matSphere.wireframe = true;
	matSphere.visible = true;
}

function animate() {

	if (cubeParams.rotationSwitch) {
		if (cubeParams.rotationXplus) {
			if (cubeParams.rotationX)
				cube.rotation.x += cubeParams.rotationVelocity;
		} else {
			cube.rotation.x -= cubeParams.rotationVelocity;
		}

		if (cubeParams.rotationYplus) {
			if (cubeParams.rotationY)
				cube.rotation.y += cubeParams.rotationVelocity;
		} else {
			cube.rotation.y -= cubeParams.rotationVelocity;
		}
	}

	if (sphereParams.rotationSwitch) {
		if (sphereParams.rotationXplus) {
			if (sphereParams.rotationX)
				sphere.rotation.x += sphereParams.rotationVelocity;
		} else {
			sphere.rotation.x -= sphereParams.rotationVelocity;
		}

		if (sphereParams.rotationYplus) {
			if (sphereParams.rotationY)
				sphere.rotation.y += sphereParams.rotationVelocity;
		} else {
			sphere.rotation.y -= sphereParams.rotationVelocity;
		}
	}


	if (cubeParams.opacityChangeSwitch)  {
		// constantly change :  Math.sin(Date.now() * 0.001) * 2.5;
		material.opacity = Math.sin(Date.now() * 0.001) * 2.5;
	}

	// if (material.opacity < 0)
	// 	console.log('negative: ' + material.opacity);

	controls.update();
	renderer.render(scene, camera);
}

var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

function onPointerClick(event) {
	raycaster.setFromCamera(pointer, camera);

	const intersects = raycaster.intersectObject(cube);
	if (intersects.length > 0) {
		//console.log('INTERSECT');
		cubeParams.rotationSwitch = !cubeParams.rotationSwitch;
	}

	const intersects2 = raycaster.intersectObject(sphere);
	if (intersects2.length > 0) {
		//console.log('INTERSECT');
		sphereParams.rotationSwitch = !sphereParams.rotationSwitch;
	}
}

// console.log('three-rotates-around.js');

function onPointerMove(event) {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// function onMouseDown( event ) {
// 	console.log('down');
// }

// function onMouseUp( event ) {
// 	console.log('up');
// }

window.addEventListener('mousedown', onPointerClick, false);
//window.addEventListener( 'mousedown', onMouseDown, false );
window.addEventListener('mousemove', onPointerMove, false);
//window.addEventListener( 'mouseup', onMouseUp, false );

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}