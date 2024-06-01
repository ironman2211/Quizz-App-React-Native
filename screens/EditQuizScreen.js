// screens/EditQuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, doc, updateDoc, getDoc, getDocs ,setDoc} from 'firebase/firestore';
import { db } from '../firebase';

const EditQuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Fetch quiz details
        const quizDocRef = doc(collection(db, 'quizzes'), quizId);
        const quizDocSnapshot = await getDoc(quizDocRef);
        const quizData = quizDocSnapshot.data();
        setQuiz(quizData);
        setQuizName(quizData.quizName);
        setDescription(quizData.description);
        setPoints(quizData.points);
        setTimeLimit(quizData.timeLimit);
        
        // Fetch questions for the quiz
        const questionsCollectionRef = collection(quizDocRef, 'questions');
        const questionsSnapshot = await getDocs(questionsCollectionRef);
        setQuestions(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
      setQuizName('');
      setDescription('');
      setPoints('');
      setTimeLimit('');
      setQuestions([]);
    }
  }, [quizId]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: null }]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSave = async () => {
    try {
      // Update quiz details
      const quizDocRef = doc(collection(db, 'quizzes'), quizId);
      await updateDoc(quizDocRef, {
        quizName,
        description,
        points,
        timeLimit,
      });
  
      // Delete all existing questions for the quiz
      const questionsCollectionRef = collection(quizDocRef, 'questions');
      const snapshot = await getDocs(questionsCollectionRef);
      snapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });
  
      // Add or update questions
      questions.forEach(async (question) => {
        const newQuestionRef = doc(questionsCollectionRef);
        await setDoc(newQuestionRef, question);
      });
  
      // Alert and navigate after successful update
      Alert.alert('Quiz updated successfully');
      navigation.navigate('QuizList');
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };
  

  if (!quiz) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Quiz Name</Text>
      <TextInput value={quizName} onChangeText={setQuizName} style={styles.input} />
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={styles.input} />
      <Text>Points</Text>
      <TextInput value={points} onChangeText={setPoints} style={styles.input} />
      <Text>Time Limit</Text>
      <TextInput value={timeLimit} onChangeText={setTimeLimit} style={styles.input} />
      
      <FlatList
        data={questions}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            <TextInput
              value={item.question}
              onChangeText={(value) => handleQuestionChange(index, value)}
              placeholder="Question"
              style={styles.input}
            />
            {item.options.map((option, oIndex) => (
              <TextInput
                key={oIndex}
                value={option}
                onChangeText={(value) => handleOptionChange(index, oIndex, value)}
                placeholder={`Option ${oIndex + 1}`}
                style={styles.input}
              />
            ))}
            <Button title="Delete Question" onPress={() => handleDeleteQuestion(index)} />
          </View>
        )}
      />
      <Button title="Add Question" onPress={handleAddQuestion} />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export default EditQuizScreen;
