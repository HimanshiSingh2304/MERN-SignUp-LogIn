import { Users } from "../Models/index.js";

export const getDashboardData = async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('name');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        name: user.name
      });
    } catch (error) {
      console.error('DASHBOARD ERROR:', error); 
      res.status(500).json({ message: 'Server error', error });
    }
  };