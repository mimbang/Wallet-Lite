import { Platform } from "react-native";
import { openDB } from "./database";




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