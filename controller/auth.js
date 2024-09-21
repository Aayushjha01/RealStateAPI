import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

// Register User
export const register = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      // Check if all fields are provided
      if (!username || !email || !password) {
         return res.status(400).json({ message: 'All fields are required.' });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
         where: { email: email }
      });

      if (existingUser) {
         return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await prisma.user.create({
         data: {
            username,
            email,
            password: hashedPassword
         }
      });

      console.log(newUser);

      // Send success response
      return res.status(201).json({
         message: 'User registered successfully',
         user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
         }
      });
   } catch (error) {
      console.error('Error in user registration:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
   }
};
