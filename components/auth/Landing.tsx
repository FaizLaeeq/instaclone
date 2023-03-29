import { Button, View, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.button}>
        <Button
          title='Register'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <View style={styles.button}>
        <Button title='Login' onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};
export default LandingScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden'
  },
});
