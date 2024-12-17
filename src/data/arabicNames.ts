// Top 300 Arabic names
export const arabicNames = [
  "Mohammad", "Ahmad", "Ali", "Hassan", "Hussein", "Omar", "Khaled", "Abdullah",
  "Youssef", "Ibrahim", "Mahmoud", "Mustafa", "Amir", "Karim", "Nour", "Zain",
  "Hamza", "Bilal", "Jamal", "Tariq", "Rami", "Sami", "Fadi", "Nasser",
  "Samir", "Walid", "Hadi", "Bassam", "Malik", "Adel", "Rashid", "Marwan",
  "Zayd", "Hasan", "Fahad", "Imad", "Kareem", "Majid", "Nabil", "Osama",
  "Qasim", "Rafiq", "Salim", "Tarek", "Umar", "Wael", "Yahya", "Ziad",
  "Fatima", "Aisha", "Mariam", "Zainab", "Layla", "Sara", "Nada", "Hala",
  "Rana", "Dina", "Amira", "Reem", "Maya", "Lina", "Noor", "Yasmin",
  // ... Add more names to reach 300
];

// Function to filter names based on input
export function filterArabicNames(input: string): string[] {
  const normalizedInput = input.toLowerCase();
  return arabicNames.filter(name => 
    name.toLowerCase().startsWith(normalizedInput)
  ).slice(0, 5); // Return top 5 matches
}