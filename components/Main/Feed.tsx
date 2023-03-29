import { useNavigation } from '@react-navigation/native';
import {
  collection,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../../firebaseConfig';

const Feed = () => {
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const followingRef = collection(
      db,
      `users/${auth.currentUser?.uid}/following`
    );
    onSnapshot(followingRef, (followingSnap) => {
      followingSnap.docs.map((user) => {
        setPosts([]);
        const postsRef = collection(db, 'users', user.data().uid, 'posts');
        onSnapshot(postsRef, (posts) => {
          posts.docs.map((post) => {
            setPosts((prev) => [...prev, post]);
          });
        });
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          key='1'
          horizontal={false}
          data={posts}
          renderItem={({ item }) => {
            const itemData = item.data();
            return (
              <View style={styles.imageContainer}>
                <Text>{itemData.caption}</Text>
                <Image
                  style={styles.image}
                  source={{ uri: itemData.downloadURL }}
                />
                <Text
                  onPress={() => {
                    navigation.navigate('Comment', {
                      imageData: { ...itemData },
                      imageId: item.id,
                    });
                  }}
                >
                  View Comments...
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default Feed;

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
});
