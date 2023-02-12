import User from '../Models/User';

// Read
export const getuser = async (req, res) => {
  try{
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(200);
  } catch(err) {
    res.status(404).json({ message: err.message});
  }
};