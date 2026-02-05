import { BarChart } from 'react-native-chart-kit';
import { Dimensions, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getChartStats } from '@/services/stats';
import React from 'react';
import fillMissingPeriods from '@/services/dates';
// import { getChartStats } from '../services/chartStats';


type Period = 'week' | 'month' | 'year';
const screenWidth = Dimensions.get('window').width;

const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

function formatLabel(label, period) {
  if (period === 'week') {
    const d = new Date(label);
    return dayNames[d.getDay()];
  }

  if (period === 'month') {
    return `S${Number(label)}`;
  }

  if (period === 'year') {
    const months = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
      'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ];
    return months[Number(label) - 1];
  }

  return label;
}


export default function StatsChart({ period}) {
  const [data, setData] = useState<ChartData>({
  labels: [],
  datasets: [],
});


   useEffect(() => {
  async function load() {
    const stats = await getChartStats(period); // labels SQL bruts

    const fullData = fillMissingPeriods(stats, period); // merge avec slots complets

    console.log('chart data', fullData);
   const chartData = {
  labels: fullData.map(d => d.label),
  datasets: [
    { data: fullData.map(d => d.income), color: (opacity = 1) => `rgba(0,200,0,${opacity})`, label: 'Income' },
    { data: fullData.map(d => d.expense), color: (opacity = 1) => `rgba(200,0,0,${opacity})`, label: 'Expense' },
  ]
};

      setData(chartData);

}

  load();
}, [period]);



  if (!data) return null;

  return (
    <View>
     {data && data.labels.length > 0 ? (
  <BarChart
    data={data}
    width={screenWidth - 32}
    height={220}
    fromZero
    yAxisLabel=""
    yAxisSuffix=""
    chartConfig={{
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    showBarTops
    withInnerLines={false}
        style={{
          margin: 10,
          padding:10,
          marginHorizontal:-10,
          // borderRadius: 8,
          height:"auto",
          width:"100%"
        }}
        horizontalLabelRotation={-30} // tourne légèrement les labels pour respirer
  />
) : (
  <Text>hello</Text>
)}

      
    </View>
  );
}