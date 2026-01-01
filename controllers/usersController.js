import { users } from '../models/users.js';

export const getProfile = async (req, res) => {
    const profile = await users.findById(req.user._id).lean();
    if (!profile) return res.status(404).json({ error: 'not_found' });

    return res.status(200).json({ username: profile.username, encryptedMessagesCount: profile.encryptedMessagesCount || 0 });
};
