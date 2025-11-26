import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { colors } = useTheme();
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={[styles.logoBackground, { backgroundColor: colors.white }]}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Welcome Text */}
      <View style={styles.headerSection}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, { color: colors.textLight }]}>Sign in to continue learning</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            placeholder="your@email.com"
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
            placeholder="Enter your password"
            placeholderTextColor={colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={[styles.forgotPassword, { color: colors.primary }]}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button 
          title={isLoading ? "Signing in..." : "Sign In"}
          onPress={handleLogin}
          variant="primary"
          size="large"
          fullWidth
          loading={isLoading}
          style={{ marginTop: SIZES.base }}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textLight }]}>OR</Text>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>

      {/* Social Login */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Ionicons name="logo-apple" size={20} color={colors.text} />
          <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Ionicons name="logo-google" size={20} color={colors.text} />
          <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
        </TouchableOpacity>
      </View>

      {/* Register Link */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textLight }]}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={[styles.footerLink, { color: colors.primary }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xxxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xxxl,
  },
  logoBackground: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusXl,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  headerLogo: {
    width: 240,
    height: 80,
  },
  headerSection: {
    marginBottom: SIZES.xxxl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
  },
  form: {
    marginBottom: SIZES.xl,
  },
  inputContainer: {
    marginBottom: SIZES.lg,
  },
  label: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.md,
    fontSize: SIZES.body,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  forgotPassword: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: SIZES.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SIZES.base,
    color: COLORS.textLight,
    fontSize: SIZES.small,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: SIZES.base,
    marginBottom: SIZES.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SIZES.sm,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
  },
  footerLink: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
