import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { Color, TextType } from "@/constants/Color";

export   function TaxiCircle({ percentage = 75, amount = 30 }) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={100}
        width={6}
        fill={percentage}
        tintColor={"#4caf50"}
        backgroundColor="#0008fcff"
      >
        {() => <MaterialIcons name="local-taxi" size={40} color={"#0000"} />}
      </AnimatedCircularProgress>
      <Text style={styles.amount}>{amount} €</Text>
    </View>
  );
}



type Props = {
    label: string;
    amount: number;
    iconName: string;
};

export default function SimpleCard({ label, amount, iconName }: Props) {
    return (
    <View style={[styles.container,{flexDirection:"column", }]}>
        <View style={{alignItems:"center",flexDirection:"row"}}>
           <MaterialIcons name={iconName} size={40} color="#2ecc71" />
            <Text style={[TextType.secondaire]}>{label}</Text>
        </View>
      <View>
      <Text style={styles.amount}>{amount} €</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", marginHorizontal: 10 },
    label: { marginTop: 4, fontSize: 14, fontWeight: "600" },
    amount: { marginTop: 8, fontWeight: "bold", fontSize: 16 },

});
