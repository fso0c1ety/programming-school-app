import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Quiz from '../../components/Quiz';
import { useTheme } from '../../context/ThemeContext';

const lessons: Record<string, { title: string; content: string; theory: string }[]> = {
  python: [
    { 
      title: 'Variables & Data Types', 
      content: 'x = 5  # Integer\ny = "hello"  # String\nz = 3.14  # Float\nis_active = True  # Boolean',
      theory: 'Variables store data. Python is dynamically typed - no need to declare types. Use descriptive names like user_age instead of x.'
    },
    { 
      title: 'Control Flow', 
      content: 'if x > 0:\n    print("Positive")\nelif x < 0:\n    print("Negative")\nelse:\n    print("Zero")',
      theory: 'Control flow directs program execution. if/elif/else makes decisions. Indentation matters in Python - it defines code blocks.'
    },
    { 
      title: 'Functions', 
      content: 'def add(a, b):\n    """Add two numbers"""\n    return a + b\n\nresult = add(5, 3)',
      theory: 'Functions encapsulate reusable code. Use def to define, return to give back values. Docstrings document what functions do.'
    },
    { 
      title: 'Loops', 
      content: 'for i in range(5):\n    print(i)\n\nwhile x < 10:\n    x += 1',
      theory: 'Loops repeat code. for iterates over sequences. while repeats while a condition is true. Use break to exit, continue to skip.'
    },
    { 
      title: 'Lists & Dictionaries', 
      content: 'fruits = ["apple", "banana"]\nfruits.append("cherry")\n\nperson = {"name": "John", "age": 30}',
      theory: 'Lists store ordered collections. Dictionaries store key-value pairs. Both are mutable and can grow dynamically.'
    },
  ],
  javascript: [
    { 
      title: 'Variables & Data Types', 
      content: 'let x = 5;  // Number\nconst y = "hello";  // String\nlet z = true;  // Boolean\nlet arr = [1, 2, 3];  // Array',
      theory: 'Use let for variables that change, const for constants. JavaScript has dynamic typing. Modern code prefers const/let over var.'
    },
    { 
      title: 'Control Flow', 
      content: 'if (x > 0) {\n  console.log("Positive");\n} else if (x < 0) {\n  console.log("Negative");\n} else {\n  console.log("Zero");\n}',
      theory: 'if/else directs execution based on conditions. Use === for strict equality (checks type and value). Curly braces define blocks.'
    },
    { 
      title: 'Functions', 
      content: 'function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;',
      theory: 'Functions are first-class objects in JS. Arrow functions (=>) provide concise syntax. Functions can be assigned to variables.'
    },
    { 
      title: 'Loops', 
      content: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\nwhile (x < 10) {\n  x++;\n}',
      theory: 'for loops have init, condition, increment. while checks condition first. Use forEach, map for arrays in modern code.'
    },
    { 
      title: 'Objects & Arrays', 
      content: 'const person = {\n  name: "John",\n  age: 30\n};\n\nconst nums = [1, 2, 3];\nnums.push(4);',
      theory: 'Objects store key-value pairs. Arrays store ordered lists. Both are reference types. Use spread operator (...) to copy.'
    },
  ],
  java: [
    { 
      title: 'Variables & Data Types', 
      content: 'int x = 5;\nString y = "hello";\ndouble z = 3.14;\nboolean isActive = true;',
      theory: 'Java is statically typed - declare types explicitly. Primitive types (int, double, boolean) vs reference types (String, objects).'
    },
    { 
      title: 'Control Flow', 
      content: 'if (x > 0) {\n  System.out.println("Positive");\n} else if (x < 0) {\n  System.out.println("Negative");\n} else {\n  System.out.println("Zero");\n}',
      theory: 'if/else controls flow. Use == for primitives, .equals() for objects. Switch statements handle multiple cases efficiently.'
    },
    { 
      title: 'Methods', 
      content: 'public static int add(int a, int b) {\n  return a + b;\n}\n\npublic void greet(String name) {\n  System.out.println("Hello " + name);\n}',
      theory: 'Methods belong to classes. public/private control access. static methods belong to class, not instances. void means no return.'
    },
    { 
      title: 'Loops', 
      content: 'for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}\n\nwhile (x < 10) {\n  x++;\n}',
      theory: 'for loops iterate fixed times. while checks condition. Enhanced for-each: for (int num : array). Use break/continue.'
    },
    { 
      title: 'Arrays & Collections', 
      content: 'int[] numbers = {1, 2, 3};\nString[] names = new String[5];\n\nArrayList<String> list = new ArrayList<>();\nlist.add("item");',
      theory: 'Arrays have fixed size. ArrayList grows dynamically. Generics (<String>) ensure type safety. Use Collections for flexibility.'
    },
  ],
  cpp: [
    { 
      title: 'Variables & Data Types', 
      content: 'int x = 5;\nstd::string y = "hello";\ndouble z = 3.14;\nbool isActive = true;',
      theory: 'C++ is statically typed. Fundamental types: int, double, char, bool. Use std::string from <string> for text, not char arrays.'
    },
    { 
      title: 'Control Flow', 
      content: 'if (x > 0) {\n  std::cout << "Positive";\n} else if (x < 0) {\n  std::cout << "Negative";\n} else {\n  std::cout << "Zero";\n}',
      theory: 'if/else controls execution. Use == for comparison. Switch for multiple cases. Remember to #include <iostream> for cout.'
    },
    { 
      title: 'Functions', 
      content: 'int add(int a, int b) {\n  return a + b;\n}\n\nvoid greet(std::string name) {\n  std::cout << "Hello " << name;\n}',
      theory: 'Functions must declare return type. void means no return. Pass by value (copies) or by reference (&) for efficiency.'
    },
    { 
      title: 'Loops', 
      content: 'for (int i = 0; i < 5; i++) {\n  std::cout << i;\n}\n\nwhile (x < 10) {\n  x++;\n}',
      theory: 'for loops iterate. while checks condition. Range-based for: for (auto num : vec). Use break/continue to control flow.'
    },
    { 
      title: 'Pointers & Arrays', 
      content: 'int arr[5] = {1, 2, 3, 4, 5};\nint* ptr = &x;\n\nstd::vector<int> vec = {1, 2, 3};\nvec.push_back(4);',
      theory: 'Arrays are fixed-size. Pointers hold memory addresses. Vectors (dynamic arrays) grow/shrink. Use vectors over raw arrays.'
    },
  ],
};

export default function Course() {
  const { lang } = useLocalSearchParams();
  const { colors } = useTheme();
  const key = String(lang || 'python');
  const data = lessons[key] ?? lessons.python;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{key.toUpperCase()} Course</Text>
      <Text style={[styles.subtitle, { color: colors.textLight }]}>Master the fundamentals step by step</Text>
      {data.map((l, i) => (
        <View key={i} style={[styles.lesson, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.lessonTitle, { color: colors.primary }]}>📚 {l.title}</Text>
          <Text style={[styles.theory, { color: colors.text }]}>{l.theory}</Text>
          <View style={[styles.codeBox, { backgroundColor: colors.background }]}>
            <Text style={[styles.codeLabel, { color: colors.textLight }]}>Example Code:</Text>
            <Text style={[styles.code, { color: colors.text }]}>{l.content}</Text>
          </View>
        </View>
      ))}
      <Quiz lang={key} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 6, color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
  lesson: { marginBottom: 24, backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  lessonTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#6366f1' },
  theory: { fontSize: 15, color: '#4b5563', marginBottom: 12, lineHeight: 22 },
  codeBox: { backgroundColor: '#1f2937', padding: 14, borderRadius: 10, marginTop: 8 },
  codeLabel: { fontSize: 13, color: '#9ca3af', marginBottom: 6, fontWeight: '600' },
  code: { fontFamily: 'monospace', fontSize: 13, color: '#10b981', lineHeight: 20 },
});
