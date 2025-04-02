// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera, CameraType,  } from 'expo-camera';
// import FaceDetector from 'expo-face-detector';

// interface Styles {
//   container: object;
//   camera: object;
//   buttonContainer: object;
//   button: object;
//   buttonDisabled: object;
//   buttonText: object;
// }

// export default function FaceRecognition(): JSX.Element {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [faceDetected, setFaceDetected] = useState<boolean>(false);
//   const cameraRef = useRef<typeof Camera | null>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleFacesDetected = ({ faces }: FaceDetector.DetectionResult): void => {
//     setFaceDetected(faces.length > 0);
//   };

//   const takePicture = async (): Promise<void> => {
//     if (cameraRef.current && faceDetected) {
//       const photo = await cameraRef.current.detectFacesAsync();
//       console.log('Photo taken:', photo);
//       // Here you would typically send this photo to your backend for face recognition
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={CameraType.front}
//         ref={cameraRef}
//         onFacesDetected={handleFacesDetected}
//         faceDetectorSettings={{
//           mode: FaceDetector.FaceDetectorMode.fast,
//           detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
//           runClassifications: FaceDetector.FaceDetectorClassifications.none,
//           minDetectionInterval: 100,
//           tracking: true,
//         }}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, !faceDetected && styles.buttonDisabled]}
//             onPress={takePicture}
//             disabled={!faceDetected}
//           >
//             <Text style={styles.buttonText}>
//               {faceDetected ? 'Take Picture' : 'No Face Detected'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create<Styles>({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonDisabled: {
//     backgroundColor: '#A5D6A7',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//   },
// });