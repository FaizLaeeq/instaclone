import { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const Register = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredientials) => {
        updateProfile(userCredientials.user, {
          displayName: name,
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput placeholder='Name' onChangeText={setName} />
      </View>
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
        <Button title='Signup' onPress={handleSignup} />
      </View>
    </View>
  );
};
export default Register;

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
