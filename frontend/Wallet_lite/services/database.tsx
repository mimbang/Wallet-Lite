import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let db: SQLite.SQLiteDatabase | null = null;
const DB_NAME = 'wallet_lite.db';

// 1️⃣ Ouvrir la base
export const openDB = () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  if (!db) {
    db = SQLite.openDatabaseSync("wallet_lite.db");
  }
  return db;
};


export const initDB = async () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL,
  category_id INTEGER,
  date TEXT,
  description TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

`
  );
};

export async function deleteDatabase() {
  try {
    // Méthode officielle (SDK 49+)
    if (SQLite.deleteDatabaseAsync) {
      await SQLite.deleteDatabaseAsync(DB_NAME);
    }
    console.log('✅ Base de données supprimée');
  } catch (error) {
    console.error('❌ Erreur suppression DB', error);
  }
}

export const insertCategory = async (name:string, icon:string,type:string ) => {
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();
  await db.runAsync(
    `INSERT INTO categories (name, icon, type)
     VALUES (?, ?, ?);`,
    [name, icon,type]
  );
};
export const FetchCategory = async () => {
  if (Platform.OS === "web"){
     return " NO SQL IN WEB"
  }

  const db = await openDB();
  const result = await db.getAllAsync(
    `SELECT * FROM categories `)
        return {
            result:result
          }

}

export const insertTransaction = async (txData) => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();
  const { amount,  category_id,  date, description } = txData;

  await db.runAsync(
    `INSERT INTO transactions (amount, category_id,  date ,description)
     VALUES (?, ?, ? ,?);`,
    [amount,  category_id, date, description || " "]
  );
};

// data and transaction 
export const fetchAllTransactions = async () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();

  const result = await db.getAllAsync(
    `SELECT 
           SUM(income) AS total_income
           SUM(expense) AS total_expense
        FROM transactions
        WHERE type = 'income'`
  );
  return {
    total_income: result[0].total_income,
    total_expense: result[0].total_expense
  };
}

export const fetchTransactions = async () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();

  const result = await db.getAllAsync(
    `SELECT * FROM transactions ORDER BY date DESC`
  );

  return result;
};

export const fetchDayTransactions = async () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"
  }
  const db = await openDB();
  const  result = await db.getAllAsync(
    `SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE date >= date('now', 'start of day')`
  );
  return result;  
}


export const fetchWeekTransactions = async () => {
  
  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();
  const result = await db.getAllAsync(
    `SELECT  
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE date >= date('now', '-7 day')`
  );
  return result;
}

export const fetchMonthTransactions = async () => {

  if(Platform.OS === "web"){
    return "NO SQl in WEB"

  }
  const db = await openDB();
  const result = await db.getAllAsync(
    `SELECT * 
     SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
     SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
    FROM transactions where date >= date('now', '-1 month') ORDER BY date DESC  `
  );
  return result;
}


