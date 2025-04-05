import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function GamingSetup() {
  const { scene } = useGLTF('/models/gaming-desk/model9.glb');
  
  // Use the useFrame hook to apply continuous rotation on each frame
  useFrame(() => {
    if (scene) {
      // Continuously rotate the object on the Y-axis (you can adjust the rotation speed here)
      scene.rotation.y += 0.002;  // Adjust the value to change the speed of rotation
    }
  });

  // Optionally, handle mouse drag functionality if needed
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState([0, 0]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setPrevMousePosition([e.clientX, e.clientY]);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMousePosition[0];
      const deltaY = e.clientY - prevMousePosition[1];
      scene.rotation.x += deltaY * 0.005;
      scene.rotation.y += deltaX * 0.005;
      setPrevMousePosition([e.clientX, e.clientY]);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, prevMousePosition]);

  return <primitive object={scene} />;
}
