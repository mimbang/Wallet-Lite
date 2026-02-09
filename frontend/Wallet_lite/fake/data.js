export const transactionsData = 
// {
  // Jour:
   [
    { id: "1", title: "Taxi", amount: -15, category: "Transport" },
    { id: "2", title: "Déjeuner", amount: -12, category: "Food" },
    { id: "3", title: "Salaire", amount: 120, category: "Income" },
  ]
 
// };


export const summaryData = {
  Jour: { income: 120, expenses: 27, balance: 93 },
  Semaine: { income: 600, expenses: 125, balance: 475 },
  Mois: { income: 2400, expenses: 500, balance: 1900 },
};  

export const compareData = {
  Jour: {
    income: 120,
    expense: 40,
  },
  Semaine: {
    income: 600,
    expense: 280,
  },
  Mois: {
    income: 2400,
    expense: 1100,
  },
};

export const incomeTest =  [
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:13.931Z", "icon": "Food", "id": 245, "type": "income"},
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:14.043Z", "icon": "Food", "id": 246, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:33.780Z", "icon": "Food", "id": 247, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:33.894Z", "icon": "Food", "id": 248, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:47.668Z", "icon": "Food", "id": 249, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:05:47.773Z", "icon": "Food", "id": 250, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:06:07.732Z", "icon": "Food", "id": 251, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:06:07.840Z", "icon": "Food", "id": 252, "type": "income"}, 
  {"amount": 500, "category": "Food", "date": "2026-01-19T13:06:26.279Z", "icon": "Food", "id": 253, "type": "income"}
]



export const categories = [
  { id: 1, name: "Alimentation", type: "expense", icon: "restaurant" },
  { id: 2, name: "Transport", type: "expense", icon: "directions-car" },
  { id: 3, name: "Logement", type: "expense", icon: "home" },
  { id: 4, name: "Santé", type: "expense", icon: "local-hospital" },
  { id: 5, name: "Loisirs", type: "expense", icon: "sports-esports" },
  { id: 6, name: "Shopping", type: "expense", icon: "shopping-cart" },
  { id: 7, name: "Factures", type: "expense", icon: "receipt" },
  { id: 8, name: "Education", type: "expense", icon: "school" },
  { id: 9, name: "Voyages", type: "expense", icon: "flight" },
  { id: 10, name: "Cadeaux", type: "expense", icon: "card-giftcard" },
  { id: 11, name: "Animaux", type: "expense", icon: "pets" },
  { id: 12, name: "Investissements", type: "income", icon: "trending-up" },
  { id: 13, name: "Salaire", type: "income", icon: "attach-money" },
  { id: 14, name: "Dividendes", type: "income", icon: "payments" },
  { id: 15, name: "Remboursements", type: "income", icon: "money-off" },
  { id: 16, name: "Freelance", type: "income", icon: "work" },
  { id: 17, name: "Autres revenus", type: "income", icon: "more-horiz" },
  { id: 18, name: "Assurances", type: "expense", icon: "verified" },
  { id: 19, name: "Énergie", type: "expense", icon: "bolt" },
  { id: 20, name: "Internet / Télécom", type: "expense", icon: "wifi" },
  { id: 21, name: "Taxes", type: "expense", icon: "gavel" },
  { id: 22, name: "Autre dépense", type: "expense", icon: "more-horiz" },
];
