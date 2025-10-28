import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { badRequest, ok } from '../utils/http.js';
import bcrypt from 'bcrypt';

function signToken(user) {
    return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES || '7d' }
    );
}

export async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(res, errors.array());

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return badRequest(res, 'Email ya registrado');

    const user = new User({ name, email, passwordHash: 'tmp' });
    await user.setPassword(password);
    await user.save();

    const token = signToken(user);
    return ok(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return badRequest(res, errors.array());

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
    return badRequest(res, 'Credenciales inválidas');
    }
    const token = signToken(user);
    return ok(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function me(req, res) {
    const user = await User.findById(req.user.id).select('-passwordHash');
    return ok(res, user);
}

export const register = async (req,res,next)=>{
    try{
    const {name,email,password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(409).json({message:'Email ya registrado'});
    const hash = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hash});
    res.status(201).json({id:user._id, name:user.name, email:user.email});
    }catch(e){ next(e); }
};

export const login = async (req,res,next)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user) return res.status(401).json({message:'Credenciales inválidas'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(401).json({message:'Credenciales inválidas'});
    const token = jwt.sign({sub:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'1d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
    }catch(e){ next(e); }
};

export const me = async (req,res)=> res.json(req.user);