import jwt from 'jsonwebtoken';
import { users } from '../config/database.js';

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = users.find(u => u.email === email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // For demo purposes, we'll accept the default passwords without hashing
      const isValidPassword = 
        (email === 'admin@example.com' && password === 'admin123') ||
        (email === 'manager@example.com' && password === 'manager123') ||
        (email === 'user@example.com' && password === 'user123');
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = users.find(u => u.id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}