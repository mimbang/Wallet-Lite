import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet,ScrollView,Image } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Color, TextType } from "@/constants/Color";
import { GetSmallTransac } from "@/services/transacation";



type Props = {
  period: "day" | "week" | "month";
};
const not_foundImg = require("@/assets/background/notfound.png")

export default function TransactionsList({ period }: Props) {


  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await GetSmallTransac(period);
      setTransactions(data);
    }

    load();
  }, [period]); 



  if (transactions.length === 0) {
    return (
      <View style={{  justifyContent: "center", alignItems: "center" }}>
        <Text style={TextType.secondaire}>No transactions found. IN {period}</Text>
        <Image source={not_foundImg}/>
      </View>
    );
  }
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      
        <View style={styles.row}>
          <View>
            <MaterialIcons style={{margin:20,}}
            name={ item.category ||"attach-money" }
            size={30}
            color="#3498db"
          />
    
          </View> 
          
          <View style={styles.textContainer}>
            <Text style={{fontSize:18,fontWeight:"bold"}}>{item.title} </Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>

            <View style={{width: 2,height: "80%",backgroundColor: "#000000ff",}}/>

              <Text style={{fontWeight:"bold"}}> {period}</Text>


            <View style={{width: 2,height: "80%",backgroundColor: "#000000ff",margin:30,}}/>
            <View style={{marginRight:30}}>

            <Text style={[styles.amount ,item.amount < 0 ? styles.negative :styles.positive,]}>
             {item.amount}</Text>
            </View>


        </View>

      )}
    />
  );
}


export function TransactionItem (item:any){




  return(

    <View style={styles.row}>
          <MaterialIcons style={{margin:20,}}
            name={
              item.category === "Transport"
                ? "local-taxi"
                : item.category === "Food"
                ? "restaurant"
                : "attach-money"
            }
            size={30}
            color="#3498db"
            />
          {/* <AntDesign name="money-collect" size={24} color="black" /> */}
          {/* <MaterialIcons name="health-and-safety" size={24} color="black" /> */}
          {/* <MaterialIcons name="emoji-transportation" size={24} color="black" /> */}

          <View style={styles.textContainer}>
            <Text style={TextType.Titre}>{item.title} </Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>

            <View style={{width: 2,height: "80%",backgroundColor: "#000000ff",margin:10,}}/>

              <Text style={{fontWeight:"bold"}}> CATEGORY</Text>


            <View style={{width: 2,height: "80%",backgroundColor: "#000000ff",margin:30,}}/>
    
          <Text
            style={[
              styles.amount,
              { color: item.amount < 0 ? "#e74c3c" : "#2ecc71" },
            ]}
            >
            {item.amount} €
          </Text>
        </View>
)
}



const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent:"space-between",
    height:"auto",
    width:"100%",
    alignItems: "center",
    // paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderColor: Color.main,
  },
  textContainer: {
    // flex: 1,
    // marginLeft: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color:"#0add30ff",
  },
 
  category: {
    fontSize: 14,
    color: "#e50404ff",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },
  positive :{
    color:"#16a34a"
  },
  negative:{
    color:"red",
  },
});
