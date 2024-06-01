// screens/TakeQuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { collection ,getDocs} from 'firebase/firestore';

import { db } from '../firebase';

const TakeQuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollectionRef = collection(db, 'quizzes', quizId, 'questions');
        const questionsSnapshot = await getDocs(questionsCollectionRef); // Fetch documents
        
        setQuestions(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    
    fetchQuestions();
  }, [quizId]);
  
  
  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { score, total: questions.length });
    }
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Button
            title={option}
            onPress={() => setSelectedOption(index)}
            color={selectedOption === index ? 'blue' : 'gray'}
          />
        </View>
      ))}
      <Button title="Next" onPress={handleNextQuestion} disabled={selectedOption === null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 10,
  },
});

export default TakeQuizScreen;
