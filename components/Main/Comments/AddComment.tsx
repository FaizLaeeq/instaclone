import { useRoute } from '@react-navigation/native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { auth, db } from '../../../firebaseConfig';

const AddComment = () => {
  const [text, setText] = useState('');
  const route = useRoute<any>();
  const { params } = route;

  const collectionRef = collection(
    db,
    'users',
    params.imageData.uid,
    'posts',
    params.imageId,
    'comments'
  );

  const postComment = () => {
    if (text) {
      addDoc(collectionRef, {
        creation: serverTimestamp(),
        message: text,
        userId: auth.currentUser?.uid,
      });
    }
    setText('');
  };
  
  return (
    <View>
      <TextInput
        onChangeText={(e) => setText(e)}
        clearTextOnFocus
        placeholder='Add Comment'
      />
      <Button title='send' onPress={postComment} />
    </View>
  );
};
export default AddComment;
