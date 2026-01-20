import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

// 1️⃣ Ouvrir la base
export const openDB = () => {
  if (!db) {
    db = SQLite.openDatabaseSync("wallet_lite.db");
  }
  return db;
};


export const initDB = async () => {
  const db = await openDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      type TEXT,
      category TEXT,
      icon TEXT,
      date TEXT
    );

  `);
};


export const insertTransaction = async (txData) => {
  const db = await openDB();
  const { amount, type, category, icon, date } = txData;

  await db.runAsync(
    `INSERT INTO transactions (amount, type, category, icon, date)
     VALUES (?, ?, ?, ?, ?);`,
    [amount, type, category, icon, date]
  );
};


export const fetchTransactions = async () => {
  const db = await openDB();

  const result = await db.getAllAsync(
    `SELECT * FROM transactions ORDER BY date DESC`
  );

  return result;
};



export const fetchTransactionsIncome = async () => {
  const db = await openDB();

  const result = await db.getAllAsync(
    `SELECT * FROM transactions WHERE type = 'income' ORDER BY date DESC`
  );
  return result;
}



export const fetchTransactionsExpense = async () => {
  const db = await openDB();

  const result = await db.getAllAsync(
    `SELECT * FROM transactions WHERE type = 'expense' ORDER BY date DESC`
  );
  return result;
}

export const fetchWeekTransactions = async () => {
  const db = await openDB();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoISO = oneWeekAgo.toISOString();
  const result = await db.getAllAsync(
    `SELECT * FROM transactions WHERE date >= ? ORDER BY date DESC`,
    [oneWeekAgoISO]
  );
  return result;
}

export const fetchMonthTransactions = async () => {
  const db = await openDB();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const oneMonthAgoISO = oneMonthAgo.toISOString();
  const result = await db.getAllAsync(
    `SELECT * FROM transactions WHERE date >= ? ORDER BY date DESC`,
    [oneMonthAgoISO]
  );
  return result;
}


