"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { addToCart } from "../../store/cartSlice";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ProductsPage() {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [weights, setWeights] = useState<number[]>(products.map(() => 1));

  useEffect(() => {
    products.forEach((product, index) => {
      const canvas = canvasRefs.current[index];
      if (canvas) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // Set white background for 3D render
        const camera = new THREE.PerspectiveCamera(
          75,
          canvas.clientWidth / canvas.clientHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(-5, 5, 5);
        scene.add(pointLight);

        const loader = new GLTFLoader();
        loader.load(
          product.modelPath,
          (gltf) => {
            scene.add(gltf.scene);

            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            gltf.scene.scale.multiplyScalar(scale);

            gltf.scene.position.sub(center.multiplyScalar(scale));
            gltf.scene.position.y = 0;

            camera.position.z = 4;
            camera.lookAt(0, 0, 0);

            function animate() {
              requestAnimationFrame(animate);
              controls.update();
              renderer.render(scene, camera);
            }
            animate();
          },
          undefined,
          (error) => {
            console.error("An error occurred loading the GLTF model:", error);
          }
        );
      }
    });
  }, [products]);

  const handleWeightChange = (index: number, change: number) => {
    const newWeights = [...weights];
    newWeights[index] = Math.max(1, newWeights[index] + change);
    setWeights(newWeights);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto pt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-green-400">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="border border-gray-700 rounded-lg p-4 bg-black shadow-xl"
            >
              <div className="relative w-full h-80 mb-4 bg-white rounded-md overflow-hidden">
                <canvas
                  ref={(el) => (canvasRefs.current[index] = el)}
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-green-400">
                {product.name}
              </h2>
              <p className="text-gray-300">
                ₿ {(product.price * weights[index]).toFixed(8)}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleWeightChange(index, -1)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md mr-2"
                >
                  -
                </button>
                <span className="text-gray-300">{weights[index]}g</span>
                <button
                  onClick={() => handleWeightChange(index, 1)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md ml-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  dispatch(addToCart({ ...product, quantity: weights[index] }))
                }
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
