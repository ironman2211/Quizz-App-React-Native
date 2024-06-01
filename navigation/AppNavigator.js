import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQuizScreen from '../screens/CreateQuizScreen';
import EditQuizScreen from '../screens/EditQuizScreen';
import TakeQuizScreen from '../screens/TakeQuizScreen';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import ResultScreen from '../screens/ResultScreen';
import QuizList from '../screens/QuizList';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreateQuiz">
      <Stack.Screen name="QuizList" component={QuizList} />
      <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
      <Stack.Screen name="EditQuiz" component={EditQuizScreen} />
      <Stack.Screen name="TakeQuiz" component={TakeQuizScreen} />
      <Stack.Screen name="QuizDetail" component={QuizDetailScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
