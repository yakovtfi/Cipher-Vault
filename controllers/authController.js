import { users } from '../models/users.js';

export const registerUser = async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) 
        return res.status(400).json({ error: 'missing fields' });

    try {
        const existing = await users.findOne({ username }).lean();
        if (existing) 
            return res.status(409).json({ error: 'username exists' });

        const created = await users.create({ username, password });
        return res.status(201).json({ id: created._id.toString(), username: created.username });
    } catch (error) {

        return res.status(500).json({ error: 'register_failed', details: error.message });
    }
};
