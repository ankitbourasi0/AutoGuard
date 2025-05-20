import React, { useCallback, useRef, useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome5';



const CameraModule: React.FC = () => {
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState<CameraCapturedPicture | undefined>(undefined);
  const [flash, setFlash] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation(); // Navigation hook

  // Camera permissions handling
  useEffect(() => {
    (async () => {
      if (!permission) await requestPermission();
      if (!mediaLibraryPermission) await requestMediaLibraryPermission();
    })();
  }, [permission, mediaLibraryPermission, requestPermission, requestMediaLibraryPermission]);

  const toggleCameraFacing = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = useCallback(() => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }, []);

  // Capture picture
  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo);
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  }, []);

  // Simulate verification and navigate to GuardActivity
  // const verifyAndNavigate = async () => {
  //   if (image) {
  //     Alert.alert("Verification Successful", "Face verification completed successfully!", [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           // Navigate to GuardActivityScreen after verification
  //           navigation.dispatch(
  //             CommonActions.reset({
  //               index: 0,
  //               routes: [{ name: "GuardActivity" }],
  //             })
  //           );
  //         },
  //       },
  //     ]);
  //   }
  // };

  //new code

  const verifyAndNavigate = async () => {
    if (image) {
      try {
        // Create a form data object
        // const formData = new FormData();
        // formData.append('file', {
        //   uri: image.uri,
        //   type: 'image/jpeg',  // Assuming JPEG format, adjust if necessary
        //   name: 'upload.jpg',
        // } as any);
  
        // // Send the image to the backend
        // const response = await fetch('https://deepface-face-verification.onrender.com/analyze_single', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
  
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
  
        // const result = await response.json();
  
        // if (result.verification_result && result.verification_result.verified) {
        //   Alert.alert("Verification Successful", "Face verification completed successfully!", [
        //     {
        //       text: "OK",
        //       onPress: () => {
        //         navigation.dispatch(
        //           CommonActions.reset({
        //             index: 0,
        //             routes: [{ name: "GuardActivity" }],
        //           })
        //         );
        //       },
        //     },
        //   ]);
        // } else {
        //   Alert.alert("Verification Failed", result.message || "Face verification failed.");
        // }

        // for now we are directly navigating until face verification implemented 
        navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "GuardActivity" }],
                    })
                  );
      } catch (error) {
        console.error("Verification error:", error);
        Alert.alert("Error", "An error occurred during verification. Please try again.");
      }
    }
  };

  const checkPhoto = true
  const saveImage = async () => {
    if (image) {
      try {
        console.log("Image URI", image.uri);
        console.log("Image", image);
        
        
        await MediaLibrary.createAssetAsync(image.uri);
        alert("Picture Saved! ");

         verifyAndNavigate();

        // setImage(undefined);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!permission || !mediaLibraryPermission) {
    return (
      <View style={styles.container}>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted || !mediaLibraryPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera and access media library.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };
  return (
    <View style={styles.container}>

      {!image ? (
        <CameraView style={styles.camera} facing={type} flash={flash} ref={cameraRef}>

          <View style={styles.topControls}>
            {/* Back button navigate to home  */}

            <TouchableOpacity onPress={navigateToHome} style={styles.cameraButtonIcon} >
              <Icon name="arrow-back-outline" size={24} color="#fff" />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.cameraButtonIcon}>
              <Icon2 name="cycle" size={24} color="#fff" />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlash} style={styles.cameraButtonIcon} >
              <Icon name="flash" size={24} color={flash === "off" ? "#cbcbcb" : "#f1f1f1"} />

            </TouchableOpacity>


          </View>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Icon3 name="circle" size={48} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.camera}>
        <Image source={{ uri: image.uri }} style={styles.camera} />
       
       <View style={{flexDirection:"row", justifyContent:"space-around",padding:20}}>
         <TouchableOpacity onPress={() => setImage(undefined)} style={styles.cameraButtonIcon}>
           <Text style={styles.text} >Re-take</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={saveImage} style={styles.cameraButtonIcon}>
           <Text style={styles.text}>Save</Text>
         </TouchableOpacity>
        

       </View>
        </View>
      )}

      <View style={styles.actionButtons}>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
  cameraButtonIcon: { borderRadius: 25, backgroundColor: "#121212", padding: 5 },

  captureButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50
  },
  captureButton: {
    backgroundColor: "#121212",
    borderRadius: 50,
    padding: 5
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 14,
    padding:5,
    color: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
});

export default CameraModule;
