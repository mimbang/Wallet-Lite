// import { useAuth } from "@/Context/AuthContext";
import { auth, db } from "@/firebase/config";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import React from "react";


const backImage = require("@/assets/background/background_home.png");

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const { setUser } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur inscrit avec l'UID :", userCredential.user.email,);

    //   setUser(userCredential.user);       // met à jour le contexte
      Alert.alert("bienvenue",JSON.stringify(userCredential.user.email),[
        {
          // Ajouter un bouton de bienveneue
          text: "bienvenue",
      // router.push("/(tabs)/home");  
          // onPress: () => router.push("/(tabs)/home"),
          style: "cancel"
        },
      ]);      // navigation après inscription
     try {
            await setDoc(doc(db, "Users", userCredential.user.uid), {
              UserId: userCredential.user.uid,
              email: userCredential.user.email!,
              username: userCredential.user.email!.split("@")[0],
            });
            console.log("J'ajoute un utilisateur dans Firestore...");
            Alert.alert("history", userCredential.user.email?.split("@")[0]);
            console.log("Ajout fait !");
            // Alert.alert("Ajout fait !");
          } catch (error: any) {
             console.log("Erreur1", error.message);
      }

    } catch (error: any) {
      Alert.alert("Erreur2", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid extraScrollHeight={80}>
      <Image source={backImage} style={styles.backgroundImage} />
      <View>
        <Text style={styles.title}>S'inscrire</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputEmail}
            placeholder="Entrer votre Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputPassword}
            placeholder="Entrer votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("./login")}>
              <Text style={styles.registerLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
