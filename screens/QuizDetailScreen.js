import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const QuizDetailScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDocRef = doc(collection(db, 'quizzes'), quizId);
        const quizDocSnapshot = await getDoc(quizDocRef);
        if (quizDocSnapshot.exists()) {
          setQuiz(quizDocSnapshot.data());
        } else {
          console.log('Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
  
    // Fetch quiz only if quizId is provided
    if (quizId) {
      fetchQuiz();
    } else {
      // Reset quiz state if quizId is null or undefined
      setQuiz(null);
    }
  }, [quizId]);

  if (!quiz) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quiz.quizName}</Text>
      <Text style={styles.description}>{quiz.description}</Text>
      <Text style={styles.detail}>Points: {quiz.points}</Text>
      <Text style={styles.detail}>Time Limit: {quiz.timeLimit} minutes</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit Quiz" onPress={() => navigation.navigate('EditQuiz', { quizId })} />
        <Button title="Take Quiz" onPress={() => navigation.navigate('TakeQuiz', { quizId })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default QuizDetailScreen;
