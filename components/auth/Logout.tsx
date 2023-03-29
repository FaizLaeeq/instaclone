import { Button, View } from 'react-native';
import { auth } from '../../firebaseConfig';

const Logout = () => {
  const handleSignout = () => {
    auth.signOut();
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Button title='Signout' onPress={handleSignout} />
    </View>
  );
};
export default Logout;
