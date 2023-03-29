import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userRef = doc(db, 'users', result.user.uid);
        setDoc(
          userRef,
          {
            name: auth.currentUser?.displayName,
            email,
            password,
            uid: result.user.uid,
          },
          { merge: true }
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput placeholder='Email' onChangeText={setEmail} />
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder='Password'
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Button title='Login' onPress={handleLogin} />
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dadada',
    borderRadius: 10,
    width: 200,
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 20,
    overflow: 'hidden',
    margin: 5,
  },
  button: {
    width: 150,
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
