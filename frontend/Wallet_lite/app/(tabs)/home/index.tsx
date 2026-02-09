import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoCard from '@/components/InfoCard';
import SimpleCard, { SimpleCardTest, TaxiCircle } from '@/components/IconCircle';
import PeriodSelector from '@/components/PeriodSelector';
import TransactionsList from '@/components/TransactionList';
import { transactionsData } from '@/fake/data';
import { deleteDatabase, fetchAllTransactions, FetchCategory, fetchTransactions,  initDB, insertCategory, insertTransaction } from '@/services/database';
import { getChartData, GetSimpleCardata, GetSmallTransac, QuickInfoData } from '@/services/transacation';


export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
  icon: string;
  type: 'income' | 'expense';
  date: string;
};

type Period = "day" | "week" | "month";


// 
export default function HomeScreen() { 
    const [Transactions, setTransactions] = useState<Transaction[]>([]);
    console.log("debit de la finction ");
    const [taxiPercent,setTaxiPercent] = useState<number>(0);
    const [taxiPrice,setTaxiPrice] = useState<number>(0);
    const [card, setCard] = useState<{
  name: string;
  icon: string | null;
  total: number;
} | null>(null);
    const [card2, setCard2] = useState<{
  name: string;
  icon: string | null;
  total: number;
} | null>(null);

const [period, setPeriod] = useState<Period>("month");


// const period = useState<"Day"||"Month"|| "Year">("Day")

    useEffect(() => {

      const load = async () =>{
        const QuickData = await QuickInfoData();
        // console.log("data quickinfo",QuickData)
        if (typeof QuickData !== "string"){
          // setTaxiPrice()
          const TaxiValue = QuickData.total_taxi_expense;
          const expense_value = QuickData.total_expense;
          setTaxiPrice(TaxiValue);
          const PercentValue = Math.round(
          ((TaxiValue / expense_value ) * 100 ) );
          setTaxiPercent(PercentValue)
          

        }

        const SimpleData = await GetSimpleCardata("Internet");
        const SimpleData2 = await GetSimpleCardata("Shopping");
        const Simpledatavalue = SimpleData
        setCard(Simpledatavalue)  
        setCard2(SimpleData2) 
        
        const data = await GetSmallTransac(period)
        setTransactions(data)
        
        
        
      }
      
      load();
    } ,
    
    [])

    const dr = async() =>{
      const test = await FetchCategory();;
    console.log("test des transac",test)
    }
    // dr
  //   useEffect(() => {
  //   async function init() {
  //     // ⚠️ uniquement en dev
  //    try {
  //      await deleteDatabase();
  //     console.log('====================================');
  //     console.log("DATBASE DELETE SUCCESSFULLY");
  //     console.log('====================================');
  //     await initDB();
  //     console.log("INITIALISE OK");
      
  //    } catch (error) {
  //     console.log("eRRO:", error);
      
  //    }

  //   }

  //   init();
  // }, []);

 const add = async () => {
  // name: "naname: "Transport", type: "expense", icon: "directions-car"
      // await insertCategory("Logement", "home", "expense");
      // await insertCategory("INvestissements", "trending-up", "income");
      // await insertCategory("Salaire", "attach-money", "income");
      // await insertCategory("Autre", "more-horiz", "expense");
      // await insertCategory("Santé", "local-hospital", "expense");
      // await insertCategory("Loisirs", "sports-esports", "expense");
      // await insertCategory("Remboursements", "money-off", "income");
      await insertCategory("Transport", "directions-car", "expense");
      

      // await insertTransaction({
    //     amount: 50,
    //     category_id: 1,
    //     date: new Date(),
    //     description:"Achat déjeuner"

    //   });
    //   await insertTransaction({
    //     amount: 500,
    //     category_id: 3,
    //     date: new Date(),
    //     description:"Salaire du mois"
    //   });
    //   await insertTransaction({
    //     amount: 30,
    //     category_id: 2,
    //     date: new Date(),
    //     description:"Achat vêtements"
    //   });
    //   console.log("insertion reussie");
    }

    // useEffect(() => {
    //   add();
    // }, []);






    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{height:"auto"}} >

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
                    <TaxiCircle percentage={taxiPercent} amount={taxiPrice}/>
                  </View>

                  <View style={{width: 2,height: "100%",backgroundColor: "#000000ff",}}/>

                  <View style={{flexDirection:"column"}}>

                   <View >
                    {/* <SimpleCard label="Food" amount={120} iconName="restaurant"/> */}
                    <SimpleCardTest {...card2} />
                   </View>
                   <View style={{ width: "100%", marginVertical: 5,height:2,backgroundColor: "#000000ff", }} />
                   <View >
                    <SimpleCardTest {...card} />
                    {/* <SimpleCard label="Shopping" amount={250} iconName="shopping-bag"/> */}
                   </View>  
                  </View>

                </View>
                <TouchableOpacity onPress={dr}>
                  <Text> test</Text>
                </TouchableOpacity>

               
                      <PeriodSelector  period={period}
        onChange={setPeriod}/>
                     <TransactionsList period={period} />
                

            </View>
           
        </View>

        </ScrollView>

    );
}

