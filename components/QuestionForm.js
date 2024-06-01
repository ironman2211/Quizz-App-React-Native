import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { db } from "../firebase";

const QuestionForm = ({ quizId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    try {
      const questionsCollectionRef = collection(
        doc(db, "quizzes", quizId),
        "questions"
      );
      await addDoc(questionsCollectionRef, {
        question,
        options,
        correctOption,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Question</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />
      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Text>Option {index + 1}</Text>
          <TextInput
            value={option}
            onChangeText={(value) => handleOptionChange(index, value)}
            style={styles.input}
          />
        </View>
      ))}
      <Button title="Add Question" onPress={handleSubmit} />
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
  optionContainer: {
    marginBottom: 10,
  },
});

export default QuestionForm;
