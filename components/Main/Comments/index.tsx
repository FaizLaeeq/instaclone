import { useRoute } from '@react-navigation/native';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { db } from '../../../firebaseConfig';
import AddComment from './AddComment';
import Comment from './Comment';

const Comments = () => {
  const route = useRoute<any>();
  const { params } = route;
  const [comments, setComments] = useState<DocumentData[]>([]);

  const collectionRef = collection(
    db,
    'users',
    params.imageData.uid,
    'posts',
    params.imageId,
    'comments'
  );

  useEffect(() => {
    onSnapshot(collectionRef, (docs) => {
      setComments([]);
      docs.docs.map((doc) =>
        setComments((prev) => [...prev, { id: doc.id, ...doc.data() }])
      );
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Comments</Text>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: params.imageData.downloadURL }}
          />
        </View>
      </ScrollView>
      <AddComment />
      <FlatList
        style={{ flex: 0.5 }}
        numColumns={1}
        data={comments.sort((a, b) => b.creation - a.creation)}
        renderItem={({ item }) => <Comment item={item} />}
      />
    </View>
  );
};
export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 5,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    aspectRatio: 1 / 1,
  },
});
