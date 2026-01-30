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
import { useRouter } from "expo-router";

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

export default function SignupScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Error", "Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return;
    }

    // Handle signup logic here
    console.log("Signing up with:", { name, email, password });
    
    // Show success message
    Alert.alert(
      "Success!",
      "Your account has been created successfully.",
      [
        {
          text: "Continue",
          onPress: () => {
            // Navigate to home or verification screen
            // router.replace("/(tabs)/home");
            // For now, go back to login
            router.push("/login");
          }
        }
      ]
    );
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log("Google signup pressed");
  };

  const handleLoginPress = () => {
    router.push("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                {LANGUAGES.find(lang => lang.value === selectedLanguage)?.label || "English"}
              </Text>
              <Text style={[styles.dropdownArrow, { color: theme.icon }]}>▼</Text>
            </TouchableOpacity>
            
            {showLanguageDropdown && (
              <View style={[styles.dropdown, { backgroundColor: theme.card, borderColor: theme.icon }]}>
                {LANGUAGES.map((language) => (
                  <TouchableOpacity
                    key={language.value}
                    style={[styles.dropdownItem, { borderBottomColor: theme.icon }]}
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
              Create Account 🚀
            </Text>
            <Text style={[styles.subHeader, { color: theme.icon }]}>
              Join our community today
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor={theme.icon + "80"}
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    backgroundColor: theme.card,
                    borderColor: theme.icon + "40",
                  },
                ]}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Email Address</Text>
              <TextInput
                placeholder="john@example.com"
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
                autoComplete="email"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={theme.icon + "80"}
                  secureTextEntry={!showPassword}
                  style={[
                    styles.passwordInput,
                    {
                      color: theme.text,
                      backgroundColor: theme.card,
                      borderColor: theme.icon + "40",
                    },
                  ]}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={{ color: theme.icon }}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
              {password.length > 0 && password.length < 6 && (
                <Text style={[styles.errorText, { color: "#FF3B30" }]}>
                  Password must be at least 6 characters
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Confirm Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={theme.icon + "80"}
                  secureTextEntry={!showConfirmPassword}
                  style={[
                    styles.passwordInput,
                    {
                      color: theme.text,
                      backgroundColor: theme.card,
                      borderColor: theme.icon + "40",
                    },
                  ]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={toggleConfirmPasswordVisibility}
                >
                  <Text style={{ color: theme.icon }}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <Text style={[styles.errorText, { color: "#FF3B30" }]}>
                  Passwords do not match
                </Text>
              )}
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              activeOpacity={0.7}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              <View style={[styles.checkbox, { borderColor: acceptTerms ? theme.tint : theme.icon }]}>
                {acceptTerms && (
                  <View style={[styles.checkboxInner, { backgroundColor: theme.tint }]} />
                )}
              </View>
              <Text style={[styles.termsText, { color: theme.icon }]}>
                I agree to the{" "}
                <Text style={[styles.termsLink, { color: theme.tint }]}>Terms of Service</Text>{" "}
                and{" "}
                <Text style={[styles.termsLink, { color: theme.tint }]}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.button, { 
                backgroundColor: acceptTerms ? theme.tint : theme.icon + "40",
              }]}
              onPress={handleSignup}
              disabled={!acceptTerms}
            >
              <Text style={[styles.buttonText, { 
                color: acceptTerms ? "#fff" : theme.icon + "80" 
              }]}>
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: theme.icon + "40" }]} />
              <Text style={[styles.dividerText, { color: theme.icon }]}>or sign up with</Text>
              <View style={[styles.divider, { backgroundColor: theme.icon + "40" }]} />
            </View>

            {/* Google Sign Up */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.googleButton, { borderColor: theme.icon + "40" }]}
              onPress={handleGoogleSignup}
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
              Already have an account?{" "}
              <TouchableOpacity onPress={handleLoginPress}>
                <Text style={[styles.link, { color: theme.tint }]}>Login</Text>
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
    marginBottom: 16,
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
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: FontSize.body,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 0,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  errorText: {
    fontSize: FontSize.caption,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: FontWeight.medium,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  termsText: {
    fontSize: FontSize.caption,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: FontWeight.semiBold,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
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