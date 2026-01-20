import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoCard from '@/components/InfoCard';
import SimpleCard, { TaxiCircle } from '@/components/IconCircle';
import PeriodSelector from '@/components/PeriodSelector';
import TransactionsList from '@/components/TransactionList';
import { transactionsData } from '@/fake/data';
import { fetchTransactions, fetchTransactionsIncome, initDB, insertTransaction } from '@/services/database';


type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

export default function HomeScreen() { 
    const [Transactions, setTransactions] = useState<Transaction[]>([]);
    console.log("debit de la finction ");
    
    
    
    const setup = async () => {
      try {
        await initDB();
        const data = await fetchTransactions();
        setTransactions(data);
        console.log("📦 Transactions chargées :", data);
        console.log("taille ",Transactions.length)
      } catch (e) {
        console.error("❌ Error during setup:", e);
      }
    };
   useEffect(() => {
  })
  const load = async () => {
    const result = await fetchTransactionsIncome();
    console.log('====================================');
    setTransactions(result);
    console.log("Transactions Income :", Transactions);
    console.log('====================================');
  };
  // load();

  const addTransaction = async () => {
  const transaction = {
    amount: 500,
    type: "income",
    category: "Food",
    icon: "Food",
    date: new Date().toISOString(),
  };

  try {

    await insertTransaction(transaction);
  console.log('====================================');
  console.log('Transaction added successfully');
  console.log('====================================');
     
  } catch (error) {
    console.log('====================================');
    console.log("error", error);
    console.log('====================================');
    
  }


};

//   setup();
// addTransaction();








    return (
        <ScrollView showsHorizontalScrollIndicator={false} >

        <View style={styles.container}>
            <View style={styles.headerContain}>
                <View style={styles.angleContainer}>

  
                    <View >
                <Text style={styles.WelcomeText}>HI ,Welcome Back</Text>
                <Text>Good Morning</Text>
                    </View>

                    <View>
                        <TouchableOpacity>
                        <MaterialIcons name='circle-notifications' size={40} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                </View>


            <View style={styles.InfoContainer}>
                
                <InfoCard/>
            </View>
            </View>




            <View style={styles.formContainer}>
                <View style={styles.QuicklyInfoContainer}>
                    
                  <View>
                    <TaxiCircle percentage={75} amount={30}/>
                  </View>

                  <View style={{width: 2,height: "100%",backgroundColor: "#000000ff",}}/>

                  <View style={{flexDirection:"column"}}>

                   <View >
                    <SimpleCard label="Food" amount={120} iconName="restaurant"/>
                   </View>
                   <View style={{ width: "100%", marginVertical: 5,height:2,backgroundColor: "#000000ff", }} />
                   <View >
                    <SimpleCard label="Shopping" amount={250} iconName="shopping-bag"/>
                   </View>  
                  </View>

                </View>
               
                      <PeriodSelector/>
                     <TransactionsList transactions={transactionsData} />
                

            </View>
           
        </View>

        </ScrollView>

    );
}

