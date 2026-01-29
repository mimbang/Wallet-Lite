import React, { use, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoCard from '@/components/InfoCard';
import SimpleCard, { TaxiCircle } from '@/components/IconCircle';
import PeriodSelector from '@/components/PeriodSelector';
import { BarChart } from "react-native-chart-kit";
import { useRouter } from 'expo-router';
import { compareData } from '@/fake/data';



type Period = "day" | "week" | "month";
const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [period, setPeriod] = useState<Period>("month");



    const router = useRouter();
    return (
        <ScrollView showsHorizontalScrollIndicator={false} >

        <View style={styles.container}>
            <View style={styles.headerContain}>
                <View style={styles.angleContainer}>

                    <View >
                <TouchableOpacity onPress={() => {router.push('/(tabs)/home')}}>
                    <MaterialIcons name='arrow-back' size={24} color={"white"}/>
                </TouchableOpacity>
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
              
                      <PeriodSelector period={period}
        onChange={setPeriod}/>
                      <View>
      {/* <BarChart style={{marginVertical: 18, borderRadius: 16,margin:20,padding:50,}}   
        data={{
          labels: ["Taxi", "Food", "Salaire"],
          datasets: [
            {
              data: [30, 120, 600],
            },
          ],
        }}
        width={screenWidth - 40}
        height={250}
        yAxisLabel="€"
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => "#3498db",
          labelColor: () => "#000",
        }}
        style={{
          borderRadius: 16,
        }}
      /> */}

            <BarChart
        data={{
          labels: ["Entrées", "Dépenses"],
          datasets: [
            {
              data: [compareData.Jour.expense,compareData.Jour.income],
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="€"
        fromZero
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 0.5) => `rgba(52, 152, 219, ${opacity})`,
          labelColor: () => "#000",
        }}
        style={{
          borderRadius: 16,
        }}
      />

    </View>
                
            </View>
           
        </View>

        </ScrollView>

    );
}

