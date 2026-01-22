import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { openDB } from "./database";

let db: SQLite.SQLiteDatabase | null = null;
const DB_NAME = 'wallet_lite.db';


// FONCTION QUI RETOURNE LES STATS SELON UNE PERIODE (INCOME ,EXPENSE ET AMOUNT D'UNE PERIODE)
export const getStatsByPeriod = async (period: 'daily' | 'weekly' | 'monthly') => {
  if(Platform.OS === "web"){
    return "NO SQl in WEB";
  }
  
  const syntax = `
    SELECT 
           SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS total_income,
           SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS total_expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        WHERE T.date >= date('now', 'start of ${period}')`;

    const db = await openDB();
    const result = await db.getAllAsync(syntax);
    const balance = result[0].total_income - result[0].total_expense;

    return {
      total_income: result[0].total_income,
      total_expense: result[0].total_expense,
        balance: balance
    };
  

}


// fonction qui renvoie les donnes pour les graphiques
export const getChartData = async (period:  'weekly' | 'monthly') => {
    if(Platform.OS === "web"){
      return "NO SQl in WEB";
    }
    const db = await openDB();

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

// fonction qui recupere toutes les transactions avec total income , total expense et solde pour le tout (l'anne )
export  const fetchAllTransactionsdata = async () => {

     if(Platform.OS === "web"){
    return "NO SQl in WEB";
  }
  
  const syntax = `
    SELECT 
           SUM(CASE WHEN C.type = 'income' THEN T.amount ELSE 0 END) AS total_income,
           SUM(CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS total_expense
        FROM transactions T
        JOIN categories C ON T.category_id = C.id
        `;

    const db = await openDB();
    const result = await db.getAllAsync(syntax);
    const balance = result[0].total_income - result[0].total_expense;

    return {
        total_income: result[0].total_income,
        total_expense: result[0].total_expense,
        total_balance: balance
    }

}


export const QuickInfoData = async () => {

     if(Platform.OS === "web"){
    return "NO SQl in WEB";
  }
  
  const syntax = `
   SELECT 
  SUM(
    CASE WHEN C.type = 'expense'  AND (C.name = 'taxi' OR C.icon = 'taxi') THEN T.amount 
                      ELSE 0 END) AS total_taxi_expense,
  SUM(
    CASE WHEN C.type = 'expense' THEN T.amount ELSE 0 END) AS total_month_expense
   FROM transactions T
    JOIN categories C ON T.category_id = C.id
      WHERE date(T.date) >= date('now', 'start of month');

        `;

    const db = await openDB();
    const result = await db.getAllAsync(syntax);
    const total_taxi_expense = result[0].total_taxi_expense


    return {
        total_taxi_expense: total_taxi_expense,
        total_expense: result[0].total_month_expense,
       
    }

}



// fonction pour les simple donnes label iconname et amount


export const GetSimpleCardata = async (params: string) => {
  if (Platform.OS === "web") {
    return null;
  }

  const sql = `
    SELECT 
      C.name AS name,
      C.icon AS icon,
      COALESCE(SUM(T.amount), 0) AS total
    FROM transactions T
    JOIN categories C ON T.category_id = C.id
    WHERE C.name = ?
  `;
  const db = await openDB();
  const result = await db.getAllAsync(sql, [params]);

  if (result.length === 0) {
    return {
      name: params,
      icon: null,
      total: 0,
    };
  }

  return {
    name: result[0].name,
    icon: result[0].icon,
    total: result[0].total,
  };
};

