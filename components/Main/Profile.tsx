import { useRoute } from '@react-navigation/native';
import {
  collection,
  DocumentData,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Pressable,
} from 'react-native';
import { auth, db, storage } from '../../firebaseConfig';
import Logout from '../auth/Logout';

const Profile = () => {
  const route = useRoute<any>();
  const { params } = route;
  const currentUser = auth.currentUser;
  const [userPosts, setUserPosts] = useState<DocumentData[]>([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    (async () => {
      const posts = params
        ? collection(db, `users/${params.uid}/posts`)
        : collection(db, `users/${currentUser?.uid}/posts`);
      onSnapshot(posts, (posts) => {
        setUserPosts([]);
        posts.docs.map((post) =>
          setUserPosts((prev) => [...prev, { id: post.id, ...post.data() }])
        );
      });
    })();
  }, [currentUser, params]);

  const onUnfollow = async () => {
    const docRef = doc(
      collection(db, `users/${auth.currentUser?.uid}/following`),
      params?.uid
    );
    deleteDoc(docRef);
  };
  const onFollow = async () => {
    const collectionRef = collection(
      db,
      `users/${auth.currentUser?.uid}/following`
    );
    const docRef = doc(collectionRef, params.uid);
    setDoc(
      docRef,
      { uid: params?.uid, creation: serverTimestamp() },
      { merge: true }
    );
  };

  useEffect(() => {
    if (params) {
      const docRef = doc(
        collection(db, `users/${auth.currentUser?.uid}/following`),
        params?.uid
      );
      onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data) {
          setFollowing(true);
        } else setFollowing(false);
      });
    }
  }, [params, onSnapshot]);

  const removeImage = async (item: any) => {
    const picRef = doc(db, `users/${currentUser?.uid}/posts/${item.id}`);
    const storageRef = ref(storage, item.downloadURL);
    await deleteDoc(picRef);
    deleteObject(storageRef).then(() => console.log('success'));
  };

  return (
    <View style={styles.container}>
      {currentUser && (
        <>
          <View style={styles.containerInfo}>
            <Text>{params ? params.displayName : currentUser.displayName}</Text>
            <Text>{params ? params.email : currentUser.email}</Text>
            {params && params.uid !== currentUser.uid ? (
              <View>
                {following ? (
                  <Button title='Following' onPress={onUnfollow} />
                ) : (
                  <Button title='Follow' onPress={onFollow} />
                )}
              </View>
            ) : (
              <Logout />
            )}
          </View>
          <View style={styles.containerGallery}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={userPosts}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.imageContainer}
                  onPress={() => {
                    removeImage(item);
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.downloadURL }}
                  />
                </Pressable>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
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
