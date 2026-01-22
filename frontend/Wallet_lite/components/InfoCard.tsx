import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import ProcessCard from "./ProgressCard";
import { incomeTest } from "@/fake/data";
import {  initDB } from "@/services/database";
import { Transaction } from "@/app/(tabs)/home";
import { fetchAllTransactionsdata } from "@/services/transacation";

export default function InfoCard() {
  const [income,setIncome] = useState<number>(0)
  const [expense,setExpense] = useState<number>(0)
  const [balance,setBalance] = useState<number>(0)
  const [savingPercent,setSavingPercent] = useState<number>(0)


 useEffect(() => {
  async function load() {
    const data = await fetchAllTransactionsdata();

    if (typeof data !== "string") {
      const incomeValue = data.total_income;
      const expenseValue = data.total_expense;
      const balanceValue = data.total_balance;

      setIncome(incomeValue);
      setExpense(expenseValue);
      setBalance(balanceValue);

      let percent = 0;
      if (incomeValue > 0) {
        percent = Math.round(
          ((incomeValue - expenseValue) / incomeValue) * 100
        );
      }

      setSavingPercent(percent);

    }
  }

  load();
}, []);



 



  // const income

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
