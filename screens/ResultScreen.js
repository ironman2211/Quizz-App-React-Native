import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your Score: {score} / {total}</Text>
      <Button title="Back to Quizzes" onPress={() => navigation.navigate('QuizList')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ResultScreen;
