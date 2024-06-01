import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuizForm from '../components/QuizForm';

const CreateQuizScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <QuizForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CreateQuizScreen;
