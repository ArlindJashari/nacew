import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const canvasStyle = {
  width: '100%',
  height: '100%',
  display: 'block',
};

// Exact waterPlane preset from shadergradient.co. Per-tab colors/brightness are
// passed in as props; everything else is locked to the shared preset.
export default function ShaderWaterGradient({
  color1 = '#94ffd1',
  color2 = '#6bf5ff',
  color3 = '#ffffff',
  brightness = 1.2,
  uDensity = 1.2,
  uSpeed = 0.2,
  uStrength = 3.4,
  className = '',
}) {
  return (
    <div className={`shader-water-gradient ${className}`.trim()} style={canvasStyle}>
      <ShaderGradientCanvas style={canvasStyle} pixelDensity={1} fov={45}>
        <ShaderGradient
          control="props"
          animate="on"
          axesHelper="off"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={brightness}
          cAzimuthAngle={170}
          cDistance={4.4}
          cPolarAngle={70}
          cameraZoom={1}
          color1={color1}
          color2={color2}
          color3={color3}
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={0.9}
          positionZ={-0.3}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={45}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={uDensity}
          uFrequency={0}
          uSpeed={uSpeed}
          uStrength={uStrength}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
