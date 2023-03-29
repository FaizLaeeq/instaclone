import { useRoute } from '@react-navigation/native';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { db } from '../../../firebaseConfig';

const Comment = ({ item }: { item: any }) => {
  const route = useRoute<any>();
  const { params } = route;
  const [userName, setUserName] = useState('');

  const userRef = doc(db, 'users', item.userId);
  onSnapshot(userRef, (res) => {
    setUserName(res.data()?.name);
  });

  const commentRef = doc(
    db,
    'users',
    params.imageData.uid,
    'posts',
    params.imageId,
    'comments',
    item.id
  );

  const deleteComment = async () => {
    await deleteDoc(commentRef);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userName}>
        <Text style={{ fontWeight: '600' }}>{userName}</Text>
      </View>
      <Text>{item.message}</Text>
      <View style={styles.buttonContainer}>
        <Button title='x' onPress={deleteComment} />
      </View>
    </View>
  );
};
export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dadada',
    margin: 1,
    padding: 1,
    position: 'relative',
    height: 40,
    alignItems: 'center'
  },
  userName: {
    paddingRight: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    height: 30,
    overflow: 'hidden',
  },
});
