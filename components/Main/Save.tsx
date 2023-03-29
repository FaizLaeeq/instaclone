import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, auth, db } from '../../firebaseConfig';
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

const Save = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [caption, setCaption] = useState<string>();
  const [percentage, setPercentage] = useState<number>();
  const { params } = route

  const uploadImage = async () => {
    const uri = params.image;
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `post/${auth.currentUser?.uid}/${caption}_${Math.random().toString(36)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercentage(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            savePostData(url)
          );
        }
      );
    }
  };

  const savePostData = (downloadURL: string) => {
    if (auth.currentUser) {
      const newCollection = collection(
        db,
        `users/${auth.currentUser.uid}/posts`
      );
      addDoc(newCollection, {
        downloadURL,
        caption,
        creation: serverTimestamp(),
        uid: auth.currentUser.uid
      }).then(() => navigation.navigate('Profile'));
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: params?.image }} />
      <TextInput
        placeholder='write a caption . . .'
        onChangeText={setCaption}
      />
      <Button title='Save' onPress={uploadImage} />
      <Text>{percentage}</Text>
    </View>
  );
};
export default Save;
