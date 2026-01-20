import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import ProcessCard from "./ProgressCard";

export default function InfoCard() {
  const income = 120000;
  const expense = 78000;
  const savingPercent = Math.round(
    ((income - expense) / income) * 100
  );

  return (
    <View style={styles.card}>

      {/* Partie Entrée / Dépense */}
      <View style={styles.row}>

        <View style={styles.block}>
          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
          <MaterialIcons name="arrow-circle-up" size={25} color="#4CAF50" />
          <Text style={{color:"green"}}>Entrées</Text>

          </View>
          <View>
          <Text style={{ fontSize: 18,
    fontWeight: "bold",color:"green"}}>{income} FC</Text>
          </View>
        </View>

        <View style={styles.verticalBar} />

        <View style={styles.block}>

          <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
          <MaterialIcons name="arrow-circle-down" size={25} color="#F44336" />
          <Text style={{color:"red"}}>Dépenses</Text>
          </View>

          <View>
          <Text style={{ fontSize: 18,
    fontWeight: "bold",color:"red"}}>{expense} FC</Text>
          </View>
        </View>

      </View>

     {/* barre de progression */}
     <ProcessCard income={income} expense={expense}/>

      <Text style={styles.percent}>
        Épargne réalisée : {savingPercent} %
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "green",
    borderRadius: 20,
    padding: 20,
    // elevation: 4,
    width:"100%",
    borderWidth:0.5,
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  block: {
    // flexDirection:"row",
    alignItems: "center",
    flex: 1,
  },
  verticalBar: {
    width: 1,
    height: 60,
    backgroundColor: "#121212ff",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  percent: {
    textAlign: "center",
    // marginTop: 8,
    fontWeight: "bold",
    color:"white",
    fontSize:14,
  },
});
