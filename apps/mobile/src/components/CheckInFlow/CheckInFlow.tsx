import React, { useState, useRef } from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';
import { Questions } from './Questions';
import { Summary } from './Summary';
import { QUESTIONS } from './constants';
import { COLORS } from '../../styles/theme';

interface CheckInFlowProps {
  onClose: () => void;
}

export const CheckInFlow: React.FC<CheckInFlowProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(6));
  const [showSummary, setShowSummary] = useState(false);
  
  const backgroundColorAnim = useRef(new Animated.Value(6)).current;
  const questionPositionAnim = useRef(new Animated.Value(0)).current;
  const summaryAnimValue = useRef(new Animated.Value(0)).current;

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [1, 5, 9],
    outputRange: currentQuestion === 3 
      ? [COLORS.PRIMARY, COLORS.WARNING, COLORS.DANGER]
      : [COLORS.DANGER, COLORS.WARNING, COLORS.PRIMARY],
  });

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      questionPositionAnim.setValue(0);
      const prevValue = answers[prevQuestion];
      backgroundColorAnim.setValue(prevValue);
    }
  };

  const handleValueSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleConfirm = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      questionPositionAnim.setValue(0);
      const nextValue = answers[nextQuestion];
      backgroundColorAnim.setValue(nextValue);
    } else {
      setShowSummary(true);
      Animated.timing(summaryAnimValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleEdit = () => {
    const lastQuestion = QUESTIONS.length - 1;
    setShowSummary(false);
    setCurrentQuestion(lastQuestion);
    questionPositionAnim.setValue(0);
    summaryAnimValue.setValue(0);
    backgroundColorAnim.setValue(answers[lastQuestion]);
  };

  if (showSummary) {
    return (
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <SafeAreaView style={styles.safeArea}>
          <Summary
            answers={answers}
            onClose={onClose}
            onEdit={handleEdit}
            animationValue={summaryAnimValue}
          />
        </SafeAreaView>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <Questions
          currentQuestion={currentQuestion}
          selectedValue={answers[currentQuestion]}
          onValueSelect={handleValueSelect}
          onConfirm={handleConfirm}
          onBack={handleBack}
          onClose={onClose}
          backgroundColorAnim={backgroundColorAnim}
          questionPositionAnim={questionPositionAnim}
        />
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
}); 