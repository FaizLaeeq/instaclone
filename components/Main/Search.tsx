import { useNavigation } from '@react-navigation/native';
import {
  collection,
  DocumentData,
  endAt,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { RefObject, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { db } from '../../firebaseConfig';

const Search = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef() as RefObject<TextInput>

  useEffect(() => {
    fetchUsers(search);
  }, [search]);

  const fetchUsers = async (search: string) => {
    setUsers([]);
    const q = query(
      collection(db, 'users'),
      orderBy('email'),
      startAt(search),
      endAt(`${search}\uf8ff`)
    );
    onSnapshot(q, (filteredUsers) => {
      setUsers([]);
      filteredUsers.forEach((user) => setUsers((prev) => [...prev, user]));
    });
  };

  return (
    <View>
      <TextInput
        placeholder='Type here...'
        onChangeText={setSearch}
        ref={searchRef}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => {
          const userData = item.data();
          return (
            <Pressable
              onPress={() => {
                searchRef?.current?.clear();
                setSearch('');
                navigation.navigate('Profile', {
                  uid: item.id,
                  displayName: userData.name,
                  email: userData.email,
                });
              }}
            >
              <Text>{userData.email}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
export default Search;
