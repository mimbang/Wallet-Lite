// import { useAuth } from "@/Context/AuthContext";
import { auth } from "@/firebase/config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import React from "react";

//  const backImage = require("@/assets/background/background_sign_in.jpg");
const backImage = require("@/assets/background/background_home.png");

export default function Login() {
  const [username, setUsername] = useState("");
  const [userEMail, setUserEmail] = useState("");
  const [Isloading, setIsLoading] = useState(false);
  const[Imageurl,setImageUrl]=useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const { setUser } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true)
    if (!email || !password) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    if (Isloading){
      return <ActivityIndicator color={"red"} size={"large"} />
    }

    try {
      setIsLoading(true)
        
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   setUser(userCredential.user);       // met à jour le contexte
      console.log("Utilisateur inscrit avec l'UID :", userCredential.user.email,);
      Alert.alert("bienvenue",JSON.stringify(userCredential.user.email));   
        // navigation après login
      router.push("../(tabs)/home");
     ;// router.push("./(tabs)/home/index");
      
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
      console.warn("erreur",error);
      setIsLoading(false)
      
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid extraScrollHeight={80}>
      <Image source={backImage} style={styles.backgroundImage} />
      <View>
        <Text style={styles.title}>Se Connecter</Text>
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
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Nouveau ici ?</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.registerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
