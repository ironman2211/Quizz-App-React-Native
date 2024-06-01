import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, addDoc } from 'firebase/firestore';

const QuizForm = ({ navigation }) => {
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "quizzes"), {
        quizName,
        description,
        points,
        timeLimit,
      });
      console.log("Document written with ID: ", docRef.id);

      navigation.navigate("QuizList");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Quiz Name</Text>
      <TextInput
        value={quizName}
        onChangeText={setQuizName}
        style={styles.input}
      />
      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text>Points</Text>
      <TextInput value={points} onChangeText={setPoints} style={styles.input} />
      <Text>Time Limit</Text>
      <TextInput
        value={timeLimit}
        onChangeText={setTimeLimit}
        style={styles.input}
      />
      <Button title="Create Quiz" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default QuizForm;
