import { Platform } from "react-native";
import { openDB } from "./database";


type Period = "day" | "week" | "month";

type ChartRow = {
  label: string;
  income: number;
  expense: number;
};




// fonction qui renvoie les donnes pour les graphiques
export const getChartData = async (period:  'weekly' | 'monthly') => {
    if(Platform.OS === "web"){
      return "NO SQl in WEB";
    }
    const db = openDB();

    let syntax = ` SELECT 
           SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS total_income,
           SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS total_expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        WHERE T.date >= date('now', 'start of ${period}')
        GROUP BY date(T.date)`;

    const result = await db.getAllAsync(syntax);

    return {
      total_income: result[0].total_income,
      total_expense: result[0].total_expense
    };
}


export const getChartData2 = async (period: Period): Promise<ChartRow[] | string> => {
  if (Platform.OS === 'web') {
    return 'NO SQL in WEB';
  }

  const db = openDB();
  let syntax = '';

  switch (period) {
    // 📅 7 derniers jours
    case 'week':
      syntax = `
        SELECT 
          strftime('%w', T.date) AS label,
          SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS income,
          SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        WHERE T.date >= date('now', '-6 days')
        GROUP BY label
        ORDER BY label;
      `;
      break;

    // 📆 4 dernières semaines
    case 'month':
      syntax = `
        SELECT 
          strftime('%W', T.date) AS label,
          SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS income,
          SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        WHERE T.date >= date('now', '-1 month')
        GROUP BY label
        ORDER BY label;
      `;
      break;

    // 📈 12 derniers mois
    case 'day':
      syntax = `
        SELECT 
          strftime('%m', T.date) AS label,
          SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS income,
          SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        WHERE T.date >= date('now', '-1 year')
        GROUP BY label
        ORDER BY label;
      `;
      break;
  }

  const result = await db.getAllAsync<ChartRow>(syntax);

  return result.map((item: { label: any; income: any; expense: any; }) => ({
    label: item.label,
    income: item.income ?? 0,
    expense: item.expense ?? 0,
  }));
};

export async function getChartStats(period) {
  let groupBy;
  let cmd;

  if (period === 'week') {
    groupBy = "DATE(t.date)";
    cmd = '-6 days';
  } else if (period === 'month') {
    groupBy = "strftime('%W', t.date)";
    cmd = '-1 month';
  } else if (period === 'year') {
    groupBy = "strftime('%m', t.date)";
    cmd = '-1 year';
  } else {
    throw new Error('Invalid period');
  }

  const db = openDB();

  const rows = await db.getAllAsync(`
    SELECT
      ${groupBy} AS label,
      SUM(CASE WHEN c.type = 'income' THEN t.amount ELSE 0 END) AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END) AS expense
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE t.date >= date('now', '${cmd}')
    GROUP BY label
    ORDER BY label
  `);

  return rows.map(r => ({
    label: r.label,
    income: r.income ?? 0,
    expense: r.expense ?? 0
  }));
}
