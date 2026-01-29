import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import React from 'react';
// import { styles } from './style';

type PeriodSelectorProps = {
  period: "day" | "week" | "month";
  onChange: (p: "day" | "week" | "month") => void;
};

export default function PeriodSelector ( {period, onChange }: PeriodSelectorProps)  {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    return (
        <View style={styles.container}>

          <View >
            <View style={styles.periodSelector}>
                {["day" ,"week" ,"month"].map((p) => (
                    <TouchableOpacity
                        style={[
                            styles.periodButton,TextType.secondaire,
                            p === period && styles.periodButtonActive,
                        ]}
                        key={p}
                        onPress={() => onChange(p)}
                    >
                        <Text style={TextType.secondaire}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
                
           
            </View>

          </View>
          <View style={{height: 2, backgroundColor: '#000000ff', width: "100%", marginVertical: 10}} />
        </View>
    );
}


import { StyleSheet } from "react-native";
import { TextType } from '@/constants/Color';

export const styles = StyleSheet.create({
    container: {
      
        backgroundColor: '#ffffffff',
        width:1500,
        height:"auto",
        alignItems:"center",

    },
   
    periodSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        
    },
    periodButton: {
        paddingHorizontal: 40,
        color: '#666',
        
    },
    periodButtonActive: {
        color: '#007AFF',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        fontSize:18,
        backgroundColor:"#007AFF",
        
    },
});