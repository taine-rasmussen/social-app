import jwt from 'jsonwebtoken';

export const verifyToken = (req,  res, next) => {
  try{
    let token = req.header("Authorization");

    if(!token) return res.status(403).send("Access denied")

  } catch (err){
    res.status(500).json({ error: err.message })
  }
};