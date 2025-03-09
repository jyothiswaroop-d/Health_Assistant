const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json()); // Parse JSON request bodies (double inclusion, optional)

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Swaroop2006', // Replace with your MySQL password
  database: 'Tables_in_webthon', // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// -------------------- USER ROUTES --------------------

// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ success: false, message: 'Error signing up' });
    }
    res.status(201).json({ success: true, message: 'Signup successful' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username or email
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(query, [username, username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = results[0];

    // Compare the entered password with the hashed password
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid password' });
    }
  });
});

// profile//


// Route to handle form submission
app.post('/submit', (req, res) => {
    const { full_name, age, weight, gender, bp_status, breathing_problem, diabetes_status, weight_goal } = req.body;

    if (!full_name || !gender || !weight_goal) {
        return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO user_profile (full_name, age, weight, gender, bp_status, breathing_problem, diabetes_status, weight_goal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        age = VALUES(age),
        weight = VALUES(weight),
        gender = VALUES(gender),
        bp_status = VALUES(bp_status),
        breathing_problem = VALUES(breathing_problem),
        diabetes_status = VALUES(diabetes_status),
        weight_goal = VALUES(weight_goal)
    `;

    db.query(query, [full_name, age, weight, gender, bp_status, breathing_problem, diabetes_status, weight_goal], (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ success: false, message: 'Error updating profile' });
        }

        res.status(200).json({ success: true, message: 'Profile updated successfully!' });
    });
});
//Streak

// Track Login and Update Streak
app.post('/api/login', (req, res) => {
  const username = req.body.username;

  // Check for user's last login date
  const query = `SELECT MAX(login_time) AS last_login FROM login_logs WHERE username = ?`;
  db.query(query, [username], (err, result) => {
      if (err) throw err;

      const lastLogin = result[0]?.last_login;
      const today = new Date().toISOString().slice(0, 10);

      // Calculate streak logic
      let streak = 1;
      if (lastLogin) {
          const diff = (new Date(today) - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
          streak = diff === 1 ? streak + 1 : 1; // Increment or reset streak
      }

      // Insert new login and respond with streak
      const insertQuery = `INSERT INTO login_logs (username, login_time) VALUES (?, ?)`;
      db.query(insertQuery, [username, today], (err) => {
          if (err) throw err;
          res.json({ message: 'Login recorded', streak });
      });
  });
});



// -------------------- SERVER LISTENING --------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
