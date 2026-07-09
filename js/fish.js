(() => {
  const container = document.getElementById('fish-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0x00e5ff, 2);
  directional.position.set(2, 3, 5);
  scene.add(directional);

  // Fish body
  const bodyGeo = new THREE.SphereGeometry(1, 32, 32);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    metalness: 0.25,
    roughness: 0.25,
    emissive: 0x001a22,
    emissiveIntensity: 0.4
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.set(1.5, 1, 1);
  scene.add(body);

  // Tail
  const tailGeo = new THREE.ConeGeometry(0.55, 1.3, 4);
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0x7c3aed,
    metalness: 0.2,
    roughness: 0.3
  });
  const tail = new THREE.Mesh(tailGeo, tailMat);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-1.8, 0, 0);
  scene.add(tail);

  // Fin
  const finGeo = new THREE.ConeGeometry(0.25, 0.8, 3);
  const fin = new THREE.Mesh(finGeo, tailMat);
  fin.rotation.x = Math.PI;
  fin.position.set(0, 0.65, 0);
  scene.add(fin);

  // Eye
  const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const eye = new THREE.Mesh(eyeGeo, eyeMat);
  eye.position.set(0.8, 0.18, 0.72);
  scene.add(eye);

  const pupilGeo = new THREE.SphereGeometry(0.035, 16, 16);
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x050505 });
  const pupil = new THREE.Mesh(pupilGeo, pupilMat);
  pupil.position.set(0.86, 0.18, 0.79);
  scene.add(pupil);

  const mouse = { x: 0, y: 0 };
  const target = new THREE.Vector3(0, 0, 0);

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);

    target.x = mouse.x * 2;
    target.y = mouse.y * 1.2;

    body.position.x += (target.x - body.position.x) * 0.05;
    body.position.y += (target.y - body.position.y) * 0.05;

    tail.position.x = body.position.x - 1.8;
    tail.position.y = body.position.y;

    fin.position.x = body.position.x;
    fin.position.y = body.position.y + 0.65;

    eye.position.x = body.position.x + 0.8;
    eye.position.y = body.position.y + 0.18;

    pupil.position.x = body.position.x + 0.86;
    pupil.position.y = body.position.y + 0.18;

    body.rotation.z = (target.y - body.position.y) * 0.12;
    body.rotation.y = (target.x - body.position.x) * 0.12;

    tail.rotation.y = Math.sin(Date.now() * 0.005) * 0.25;
    fin.rotation.z = Math.sin(Date.now() * 0.006) * 0.18;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();
