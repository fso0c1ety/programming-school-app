import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Q = { question: string; choices: string[]; answer: number };

const sample: Record<string, Q[]> = {
  python: [
    { question: 'What is the correct way to define a function?', choices: ['function add(a,b):', 'def add(a, b):', 'fn add(a,b)'], answer: 1 },
    { question: 'How do you create a variable in Python?', choices: ['var x = 5', 'x = 5', 'int x = 5'], answer: 1 },
    { question: 'Which keyword is used for loops?', choices: ['foreach', 'for', 'loop'], answer: 1 },
    { question: 'How do you write a comment?', choices: ['// comment', '# comment', '/* comment */'], answer: 1 },
    { question: 'Which data type holds True/False?', choices: ['boolean', 'bool', 'bit'], answer: 1 },
    { question: 'How to check if x equals 5?', choices: ['x == 5', 'x = 5', 'x === 5'], answer: 0 },
    { question: 'What creates a list in Python?', choices: ['[]', '{}', '()'], answer: 0 },
    { question: 'How to get user input?', choices: ['input()', 'read()', 'scan()'], answer: 0 },
  ],
  javascript: [
    { question: 'Declare a constant variable', choices: ['var x', 'let x', 'const x'], answer: 2 },
    { question: 'How to define a function?', choices: ['function myFunc() {}', 'def myFunc() {}', 'func myFunc() {}'], answer: 0 },
    { question: 'Which is a comparison operator?', choices: ['=', '==', '==='], answer: 2 },
    { question: 'How to write a single-line comment?', choices: ['# comment', '// comment', '/* comment */'], answer: 1 },
    { question: 'What creates an array?', choices: ['[]', '{}', '()'], answer: 0 },
    { question: 'How to log to console?', choices: ['print()', 'console.log()', 'System.out.println()'], answer: 1 },
    { question: 'Which loop runs at least once?', choices: ['for', 'while', 'do...while'], answer: 2 },
    { question: 'How to declare a variable that can change?', choices: ['const x', 'let x', 'var x'], answer: 1 },
  ],
  java: [
    { question: 'Primitive integer type?', choices: ['Integer', 'int', 'Num'], answer: 1 },
    { question: 'Main method signature?', choices: ['public static void main(String[] args)', 'void main()', 'static main()'], answer: 0 },
    { question: 'How to print to console?', choices: ['console.log()', 'System.out.println()', 'print()'], answer: 1 },
    { question: 'Which is a wrapper class?', choices: ['int', 'Integer', 'number'], answer: 1 },
    { question: 'How to declare a constant?', choices: ['const int x', 'final int x', 'static int x'], answer: 1 },
    { question: 'Which keyword creates a class?', choices: ['class', 'struct', 'object'], answer: 0 },
    { question: 'How to create an array?', choices: ['int[] arr', 'array int arr', 'int arr[]'], answer: 0 },
    { question: 'Which is the boolean type?', choices: ['bool', 'boolean', 'Boolean'], answer: 1 },
  ],
  cpp: [
    { question: 'Output to console?', choices: ['System.out', 'console.log', 'std::cout'], answer: 2 },
    { question: 'How to include standard I/O?', choices: ['#include <stdio.h>', '#include <iostream>', 'import iostream'], answer: 1 },
    { question: 'Main function return type?', choices: ['void', 'int', 'main'], answer: 1 },
    { question: 'Which declares a pointer?', choices: ['int* ptr', 'int ptr', 'pointer int ptr'], answer: 0 },
    { question: 'How to get user input?', choices: ['std::cin', 'scanf', 'input()'], answer: 0 },
    { question: 'Which is a loop?', choices: ['foreach', 'for', 'repeat'], answer: 1 },
    { question: 'How to declare a constant?', choices: ['const int x', 'final int x', 'static int x'], answer: 0 },
    { question: 'What ends a statement?', choices: [';', '.', ':'], answer: 0 },
  ],
};

export default function Quiz({ lang }: { lang: string }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const { colors } = useTheme();
  const questions = sample[lang] ?? sample.python;

  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem(`quiz:${lang}:score`);
      if (s) setScore(Number(s));
    })();
  }, [lang]);

  const onPick = async (choice: number) => {
    if (choice === questions[idx].answer) {
      const next = score + 1;
      setScore(next);
      await AsyncStorage.setItem(`quiz:${lang}:score`, String(next));
    }
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx(idx + 1);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <View style={[styles.box, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.completeTitle, { color: colors.text }]}>🎉 Quiz Complete!</Text>
        <View style={[styles.scoreCircle, { backgroundColor: colors.primary }]}>
          <Text style={styles.scorePercentage}>{pct}%</Text>
        </View>
        <Text style={[styles.scoreDetail, { color: colors.textLight }]}>Your score: {score}/{questions.length}</Text>
        <Text style={[styles.feedback, { color: colors.primary }]}>
          {pct === 100 ? '🌟 Perfect! You mastered this!' : 
           pct >= 75 ? '💪 Great job! Keep it up!' :
           pct >= 50 ? '👍 Good effort! Review and try again!' :
           '📚 Keep learning! Practice makes perfect!'}
        </Text>
      </View>
    );
  }

  const q = questions[idx];
  return (
    <View style={[styles.box, { backgroundColor: colors.cardBg }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Quiz - Question {idx + 1}/{questions.length}</Text>
      <Text style={[styles.question, { color: colors.text }]}>{q.question}</Text>
      {q.choices.map((c, i) => (
        <View key={i} style={{ marginVertical: 6 }}>
          <Button title={c} onPress={() => onPick(i)} color={colors.primary} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 20, padding: 20, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#6366f1' },
  question: { fontSize: 17, marginBottom: 16, color: '#1f2937', fontWeight: '500' },
  completeTitle: { fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#1f2937', marginBottom: 16 },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 16 },
  scorePercentage: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  scoreDetail: { fontSize: 18, textAlign: 'center', color: '#4b5563', marginBottom: 12 },
  feedback: { fontSize: 16, textAlign: 'center', color: '#6366f1', fontWeight: '600', marginTop: 8 },
});
