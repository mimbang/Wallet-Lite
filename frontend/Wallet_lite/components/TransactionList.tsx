import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Color, TextType } from "@/constants/Color";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No transactions found.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
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
    borderBottomWidth: 1,
    borderColor: Color.main,
  },
  textContainer: {
    flex: 1,
    marginLeft: "auto",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color:"#000000ff",
  },
  category: {
    fontSize: 14,
    color: "#000000ff",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
