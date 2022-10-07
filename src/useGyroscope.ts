import { useEffect, useState } from 'react'

export const useGyroscope = ({ frequency }: {frequency: number} = {frequency: 60}) => {

  const [angularVelocity, setAngularVelocity] = useState({
    x: 0,
    y: 0,
    z: 0,
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    landscape: false
  }
)

  useEffect(() => {

const handleOrientation = () => {
    var orientation = window.orientation;
    setAngularVelocity({...angularVelocity, landscape: orientation === 90 || orientation === -90 });
  }

  const handleAcceleration = (event: any) => {
    var acceleration = event.accelerationIncludingGravity;
    var rotation = event.rotationRate || 0;
    var x = acceleration.x;
    var y = acceleration.y;
    var z = acceleration.z;
    setAngularVelocity({
        ...angularVelocity,
      rotation: rotation,
      x: angularVelocity.landscape ? y : x,
      y: angularVelocity.landscape ? x : y,
      z: z,
    });
  }

    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any).requestPermission()
          .then((permissionState: any) => {
            if (permissionState === 'granted') {
              window.addEventListener('devicemotion', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices
        window.addEventListener('devicemotion', handleAcceleration);
      }
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: any) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('orientationchange', handleOrientation);
      }
    
    return () => {
        window.removeEventListener('devicemotion', handleAcceleration);
        window.removeEventListener('orientationchange', handleOrientation);

    }
  }, [angularVelocity, frequency])

  return angularVelocity
}
