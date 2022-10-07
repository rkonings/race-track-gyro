// @ts-nocheck - may need to be at the start of file
import { useState } from 'react'

export const useGyroscope = () => {
    const [deviceOrientation, setDeviceOrientation] = useState({})
    
    function handleOrientation(event) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        setDeviceOrientation({alpha, beta, gamma})
        // Do stuff...
      }

    function requestPermission() {
        console.log('request Permission')
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
          // Handle iOS 13+ devices.
          DeviceMotionEvent.requestPermission()
            .then((state) => {
              if (state === 'granted') {
                
                window.addEventListener('devicemotion', handleOrientation);
              } else {
                console.error('Request to access the orientation was rejected');
              }
              console.log('state', state)
            })
            .catch(console.error);
        } else {

          console.log('add listener')
          // Handle regular non iOS 13+ devices.
          window.addEventListener('devicemotion', handleOrientation);
        }
      }


  return {requestPermission, deviceOrientation}
}
