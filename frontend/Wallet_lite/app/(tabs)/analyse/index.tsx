import InfoCard from "@/components/InfoCard";
import { PeriodSelector2 } from "@/components/PeriodSelector";
import { getChartStats } from "@/services/stats";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import {BarChart} from 'react-native-chart-kit'
import StatsChart from "@/components/StatsComponents";


type Period = 'week' | 'month' | 'year';

type ChartRow = {
  label: string;
  income: number;
  expense: number;
};

export default function HomeScreen() {
  const screenWidth = 250 ;
  const [period, setPeriod] = useState<Period>("month");
  const [ChartData, setChartdata] = useState({
    labels: [],
    datasets: [
      { data: [] },
      { data: [] }
    ],
    legend: ["income", "expense"],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Getdata = async () => {
      try {
        setLoading(true);
        const data = await getChartStats(period);
        console.log("stats data", data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        // Garder les données vides au lieu de crasher
       
      } finally {
        setLoading(false);
      }
    };
    
    Getdata();
  }, [period]);

  const router = useRouter();

  // if (loading) {
  //   return <ActivityIndicator color={"black"} size={"large"} />;
  // }

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerContain}>
          <View style={styles.angleContainer}>
            <View>
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
          <PeriodSelector2 period={period} onChange={setPeriod}/>

          <StatsChart period={period}/>
        </View>
      </View>
    </ScrollView>
  );
}