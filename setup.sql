CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER,
  productName TEXT,
  size TEXT,
  fullName TEXT,
  phone TEXT,
  city TEXT,
  price REAL,
  date TEXT
);
