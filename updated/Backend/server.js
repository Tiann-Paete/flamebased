const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Adjust the origin URL as per your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '', 
  database: 'nar\'s' 
});

// Route to handle user signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, address, contact, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into registered_users table
    const signupSql = `INSERT INTO registered_users (firstName, lastName, address, contact, email, password) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(signupSql, [firstName, lastName, address, contact, email, hashedPassword], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during signup' });
      }

      // Insert user data into user_login table
      const loginSql = `INSERT INTO user_login (user_firstname, user_lastname, contact, email) VALUES (?, ?, ?, ?)`;
      db.query(loginSql, [firstName, lastName, contact, email], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred during signup' });
        }
        return res.status(200).json({ message: 'Signup successful' });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
});



// Route to handle user signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const sql = `SELECT * FROM registered_users WHERE email = ?`;
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred during signin' });
      }

      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare hashed password
      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Set session and cookie for user
      req.session.user = result[0];
      res.cookie('user', result[0].firstName, { maxAge: 900000, httpOnly: true });
      
      return res.status(200).json({ success: true, message: 'Signin successful', firstName: result[0].firstName });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'An error occurred during signin' });
  }
});

// Route to handle user logout
app.get('/logout', (req, res) => {
  // Clear session and cookies for user
  req.session.destroy((err) => {
  if (err) {
    console.error(err);
     return res.status(500).json({ error: 'An error occurred during logout' });
    }
  res.clearCookie('user');
     return res.status(200).json({ success: true, message: 'Logout successful' });
    });
    });

// Route to fetch user information
app.get('/user', (req, res) => {
  if (req.session.user) {
    // If the user is logged in, return user data
    return res.status(200).json({
      success: true,
      firstName: req.session.user.firstname,
      // Add other user data fields as needed
    });
  } else {
    // If the user is not logged in, return an unauthorized error
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// Route to retrieve all users (for testing purposes)
app.get('/registered_users', (req, res) => {
  const sql = "SELECT * FROM registered_users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'An error occurred while fetching users' });
    return res.status(200).json(data);
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
