import { users } from '../models/users.js';

export const authenticate = async (req, res, next) => {
    const username = req.headers['x-username'];
    const password = req.headers['x-password'];

    if (!username || !password) {
        return res.status(401).json({ error: 'Username and password are required' });
    }

    const user = await users.findOne({ username, password }).lean();
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.user = user;
    return next();
};
