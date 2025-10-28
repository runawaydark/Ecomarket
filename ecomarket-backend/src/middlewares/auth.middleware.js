// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async (req,res,next)=>{
    try{
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if(!token) return res.status(401).json({message:'No autorizado'});
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if(!user) return res.status(401).json({message:'No autorizado'});
    req.user = user;
    next();
    }catch(e){ return res.status(401).json({message:'Token inválido'}); }
};

export const onlyAdmin = (req,res,next)=>{
    if(req.user?.role !== 'admin') return res.status(403).json({message:'Requiere rol admin'});
    next();
};
