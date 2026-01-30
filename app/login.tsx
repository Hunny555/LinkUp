import { useRouter } from "expo-router"; // Import useRouter
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { FontSize, FontWeight, LineHeight } from "@/constants/typography";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Language options
const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
];

export default function LoginScreen() {
  const router = useRouter(); // Initialize router
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    // Handle login logic here
    console.log("Logging in with:", { email, password });
    // After successful login, navigate to home
    // router.replace("/(tabs)/home");
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login pressed");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    Alert.alert(
      "Forgot Password",
      "Password reset link will be sent to your email",
    );
  };

  const handleSignupPress = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoid, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Language Selector */}
          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={[styles.languageButton, { borderColor: theme.icon }]}
              onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <Text style={[styles.languageText, { color: theme.text }]}>
                {LANGUAGES.find((lang) => lang.value === selectedLanguage)
                  ?.label || "English"}
              </Text>
              <Text style={[styles.dropdownArrow, { color: theme.icon }]}>
                ▼
              </Text>
            </TouchableOpacity>

            {showLanguageDropdown && (
              <View
                style={[
                  styles.dropdown,
                  { backgroundColor: theme.card, borderColor: theme.icon },
                ]}
              >
                {LANGUAGES.map((language) => (
                  <TouchableOpacity
                    key={language.value}
                    style={[
                      styles.dropdownItem,
                      { borderBottomColor: theme.icon },
                    ]}
                    onPress={() => {
                      setSelectedLanguage(language.value);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownText, { color: theme.text }]}>
                      {language.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/Logos/LinkUp.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={[styles.header, { color: theme.text }]}>
              Welcome Back 👋
            </Text>
            <Text style={[styles.subHeader, { color: theme.icon }]}>
              Login to continue to your account
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={theme.icon + "80"}
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    backgroundColor: theme.card,
                    borderColor: theme.icon + "40",
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordHeader}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Password
                </Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={[styles.forgotPassword, { color: theme.tint }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={theme.icon + "80"}
                secureTextEntry
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    backgroundColor: theme.card,
                    borderColor: theme.icon + "40",
                  },
                ]}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.button, { backgroundColor: theme.tint }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View
                style={[styles.divider, { backgroundColor: theme.icon + "40" }]}
              />
              <Text style={[styles.dividerText, { color: theme.icon }]}>
                or continue with
              </Text>
              <View
                style={[styles.divider, { backgroundColor: theme.icon + "40" }]}
              />
            </View>

            {/* Google Login */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.googleButton, { borderColor: theme.icon + "40" }]}
              onPress={handleGoogleLogin}
            >
              <Image
                source={require("@/assets/Icons/google.png")}
                style={styles.googleIcon}
              />
              <Text style={[styles.googleButtonText, { color: theme.text }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, { color: theme.icon }]}>
              Don't have an account?{" "}
              <TouchableOpacity onPress={handleSignupPress}>
                <Text style={[styles.link, { color: theme.tint }]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  languageContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
    zIndex: 10,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 120,
    justifyContent: "space-between",
  },
  languageText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.medium,
  },
  dropdownArrow: {
    fontSize: 10,
    marginLeft: 8,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 140,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  dropdownText: {
    fontSize: FontSize.body,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  headerContainer: {
    marginBottom: 32,
  },
  header: {
    fontSize: FontSize.header,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.header,
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: FontSize.subHeader,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.subHeader,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: FontSize.body,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.medium,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.button,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.medium,
    marginHorizontal: 16,
  },
  googleButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: FontSize.body,
    textAlign: "center",
  },
  link: {
    fontWeight: FontWeight.semiBold,
  },
});
