import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Button, useTheme } from 'react-native-paper';
import Toast from 'react-native-root-toast';

export default function Add() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState<string>('');
  const navigation = useNavigation<any>();
  const cameraRef = useRef() as React.MutableRefObject<Camera>;

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = () => {
    (async () => {
      if (cameraRef.current) {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      }
    })();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (navigation && image !== '') navigation.navigate('Save', { image });
    else
      Toast.show('please select an image', {
        duration: Toast.durations.SHORT,
        position: -100,
        animation: false,
        shadow: true,
        backgroundColor: theme.colors.primary,
      });
    setImage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={type}
            ratio='1:1'
            ref={cameraRef}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button compact mode='contained-tonal' onPress={toggleCameraType}>
          Flip Camera
        </Button>
        <Button compact mode='contained-tonal' onPress={takePicture}>
          Take Picture
        </Button>
        <Button compact mode='contained-tonal' onPress={pickImage}>
          Select
        </Button>
        <Button
          compact
          buttonColor={theme.colors.primary}
          mode='contained'
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
      <View style={styles.preview}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    flex: 1,
    aspectRatio: 4 / 3,
  },
  preview: {
    flex: 0.4,
    aspectRatio: 4 / 3,
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowRadius: 2,
    textShadowColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
