import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
    } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
    } 
}

export function requireAdmin(req, res, next) {
    if (req.user?.role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden' });
    next();
}
