const bcrypt = require('bcryptjs');
const users = []; // Mock database (Replace with DB in production)

// Signup function
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store user
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error in signup', error: error.message });
  }
};
