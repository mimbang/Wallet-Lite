import { BarChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getChartStats } from '@/services/stats';
import React from 'react';
// import { getChartStats } from '../services/chartStats';


type Period = 'week' | 'month' | 'year';
const screenWidth = Dimensions.get('window').width;

function formatForBarChart(data: any[]) {
  return {
    labels: data.map((item: { label: any; }) => item.label),
    datasets: [
      {
        data: data.map((item: { income: any; }) => item.income),
      },
      {
        data: data.map((item: { expense: any; }) => item.expense),
      },
    ],
    legend: ['Income', 'Expense'],
  };
}

export default function StatsChart({ period}) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function load() {
      const stats = await getChartStats(period);
      setData(formatForBarChart(stats));
    }

    load();
  }, [period]);

  if (!data) return null;

  return (
    <View>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        fromZero
        yAxisLabel=""
       
      />
    </View>
  );
}