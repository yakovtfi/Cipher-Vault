import { users } from '../models/users.js';

export const getProfile = async (req, res) => {
    const fresh = await users.findById(req.user._id).lean();
    if (!fresh) return res.status(404).json({ error: 'not_found' });

    return res.status(200).json({ username: fresh.username, encryptedMessagesCount: fresh.encryptedMessagesCount || 0 });
};
