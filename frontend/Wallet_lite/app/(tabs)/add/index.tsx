import { TextType } from "@/constants/Color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import * as Notifications from 'expo-notifications';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import ListCat from "@/components/ListCAtegories";
import { MaterialIcons } from "@expo/vector-icons";
import { insertTransaction } from "@/services/database";
import InfoCard from "@/components/InfoCard";


export default function AddTransactionPage()  {



async function initNotifs() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const morningMsgs = [
    "Petit check de ton budget 💸",
    "Un coup d’œil sur tes comptes ? 👀",
  ];

  const eveningMsgs = [
    "Récap finances du jour 📊",
    "Tu as tout noté aujourd’hui ? 🌙",
  ];

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  await Notifications.scheduleNotificationAsync({
    content: { title: "Finances", body: rand(morningMsgs) },
    trigger: { hour: 9, minute: 0, repeats: true },
  });

  await Notifications.scheduleNotificationAsync({
    content: { title: "Finances", body: rand(eveningMsgs) },
    trigger: { hour: 21, minute: 0, repeats: true },
  });
}




    const router = useRouter();
    const [amount,setAmount] = useState("");
    const [description, setDescription]= useState('');
    const [categorieId, setCategorieId] = useState<number | null>(null);
    const [date, setDate] = useState<Date | null>(new Date()); // YYYY-MM-DD
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios"); // sur iOS, le picker reste ouvert
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

//   fonction pour transformer la date compatible avec sql 
const formatDateTimeForSQL = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};




    const HandleSubmit  = async() =>{
       if (!amount || !categorieId) {
              Alert.alert(
        "Erreur de validation",
        "Veuillez vérifier que vous avez bien rempli les champs et réessayez.");
       return;
    }

      const parsed = parseFloat(amount);
        if (isNaN(parsed)) {
        Alert.alert("Erreur", "Montant invalide");
        return;
    }
     try {
       const txData = {
                 amount: parsed,
                 category_id: categorieId,
                 date: date ? formatDateTimeForSQL(date) : null,
              description: description || "",
              };

        const res = await insertTransaction(txData);
        // insertTransaction returns string on web, otherwise undefined
        if (Platform.OS === "web" && typeof res === "string") {
            Alert.alert("Info", "SQLite non disponible sur le web");
        } else {
            Alert.alert("Succès", "Transaction ajoutée");
            console.log('====================================');
            console.log(txData);
            console.log('====================================');
            router.replace("/(tabs)/home");
        }
    } catch (err) {
        console.error(err);
        Alert.alert("Erreur", "Impossible d'ajouter la transaction");
    } finally {
        setLoading(false);
        setAmount("0")
        setCategorieId(1)
        setDescription("")
        
    }



        
    }
    return (
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={80}>


            <View style={styles.container} >
     
               <View style={styles.headerContain}>
                <View style={styles.angleContainer}>

  
                    <View >
                <Text style={styles.WelcomeText}>HI ,Welcome Back</Text>
                <Text> Enregistrer vos transactions de la journeee</Text>

                <InfoCard/>
                    </View>

                    <View>
                        <TouchableOpacity>
                        <MaterialIcons name='circle-notifications' size={40} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>


             <View style={styles.Formcontainer}>
            

            <Text style={TextType.primaire}> enter le montant </Text>

             <TextInput style={styles.inputEmail}
                        placeholder="Entrer le montant de la transaction"
                        value={amount}
                        onChangeText={setAmount}
                        autoCapitalize="none"
                        keyboardType = "numeric"
                      />
            <Text style={TextType.primaire}> enter la descripton </Text>
            <TextInput style={styles.inputEmail}
                    placeholder="Optionnel" value={description}
                     onChangeText={setDescription} autoCapitalize="none"
                     keyboardType="default"
                 />

                 <Text style={{color:"black",fontWeight:"bold",fontSize:16}} >Date (YYYY-MM-DD)</Text>
                <TouchableOpacity onPress={() => setShow(true)}>
            <TextInput style={styles.inputEmail}
                      placeholder="Choisir une date"
                      value={date ? date.toLocaleDateString() : ""}
                      editable={false} // empêche le clavier
                      
                    />
            </TouchableOpacity>

                       {show && (
                         <DateTimePicker 
                           value={date || new Date()}
                           mode="date"
                           display="default"
                           onChange={onChange}
                         />
                       )}

                <ListCat
                categorie_id={categorieId}
                onChange={setCategorieId}/>

                <View style={{flexDirection:"row"}}>

                    <TouchableOpacity style={[styles.ValidateButton,{backgroundColor:"red"}]} 
                                            onPress={()=>{setLoading(false); setAmount("0") ;setCategorieId(1) ;setDescription("")
                                                router.push("/(tabs)/home")}}>

                        <Text style={styles.ValidateButtonText}>annuler</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.ValidateButton}
                            onPress={HandleSubmit}>
                        <Text style={styles.ValidateButtonText}> Enregistrer</Text>
                    </TouchableOpacity>

                </View>


             </View>


            </View>

        </KeyboardAwareScrollView>

       
    )

}



const styles = StyleSheet.create({
      container: {
        flex: 1,
        // backgroundColor: '#049fffff',
        paddingVertical:40,
        backgroundColor:"white",
        height:"100%",  
    },
    Formcontainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:30,
        // margin:10,
       
    },  
    headerContain:{
    height: "auto",
    justifyContent: 'center',
    paddingVertical:30,
    backgroundColor:'#049fffff',
    
  },
  angleContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  width: "100%",



},

  WelcomeText:{
    fontSize:24,
    fontFamily:"sans-serif",
    fontWeight:"bold",
    color:"#000",
  }, 
   inputEmail: {
    // letter-spacing: -1px;
    // tracking-widest bg-gray-100 rounded-lg text-base py-2 px-1 mb-5 mx-5
    backgroundColor:"#f3f4f6",color: "#000",borderRadius: 8,
    marginBottom: 20, marginHorizontal:20 ,
    width: "80%", fontSize: 16,
    lineHeight:24, paddingHorizontal:4,
    letterSpacing: 2, paddingVertical:8,
    
  },
  ValidateButton: {  
    // className='bg-[#fac25a] py-2 rounded-md mx-10 mt-10 mb-3'
    backgroundColor: "#1500ffff", 
    paddingTop: 8 ,paddingBottom: 8, /* 8px */
    marginLeft:40, marginRight:40,
    marginTop:40,
    justifyContent:"center",
    borderRadius: 6,
    // paddingVertical: 10,
    paddingHorizontal: 20,
  },

  ValidateButtonText: {
    // className='text-center font-semibold text-gray-100 text-lg'
    textAlign:"center",
    color: "#f3f4f6",
    fontSize: 20,lineHeight:28,
    fontWeight: "600",
  },

})