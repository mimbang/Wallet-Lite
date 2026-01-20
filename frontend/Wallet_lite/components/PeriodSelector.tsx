import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import React from 'react';
// import { styles } from './style';

export default function PeriodSelector ()  {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    return (
        <View style={styles.container}>

          <View >
            <View style={styles.periodSelector}>
                {['semaine', 'mois', 'année'].map((period) => (
                    <Text
                        key={period}
                        style={[
                            styles.periodButton,TextType.secondaire,
                            selectedPeriod === period && styles.periodButtonActive,
                        ]}
                        onPress={() => setSelectedPeriod(period)}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Text>
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
        borderBottomColor: '#007AFF',
    },
});