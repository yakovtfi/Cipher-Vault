import { users } from '../models/users.js';
import { encryptWithCipher, decryptWithCipher } from '../services/cipherService.js';
import { insertMessage, getMessageById, listMessagesByUsername } from '../dal/supabaseMessages.js';

export const encryptMessage = async (req, res) => {
    const { message, cipherType } = req.body || {};

    if (!message || !cipherType) 
        return res.status(400).json({ error: 'missing_fields' });

    const encrypted = encryptWithCipher(cipherType, message);

    if (!encrypted)
        return res.status(400).json({ error: 'unsupported_cipher' });

    const { data, error } = await insertMessage({
        username: req.user.username,
        cipherType,
        encryptedText: encrypted
    });

    if (error || !data) {
        console.error('Supabase insert failed', error);
        return res.status(500).json({ error: 'store_failed'});
    }

    await users.updateOne({ _id: req.user._id }, { $inc: { encryptedMessagesCount: 1 } });

    return res.status(201).json({
        id: data.id,
        cipherType: cipherType.toLowerCase(),
        encryptedText: data.encrypted_text
    });
};

export const decryptMessage = async (req, res) => {
    const { messageId } = req.body || {};
    if (!messageId) return res.status(400).json({ error: 'missing_fields' });

    const { data, error } = await getMessageById(messageId);
    if (error || !data) return res.status(404).json({ error: 'not_found' });
    if (data.username !== req.user.username) return res.status(404).json({ error: 'not_found' });

    const decrypted = decryptWithCipher(data.cipher_type, data.encrypted_text);
    if (!decrypted) {
        return res.status(200).json({ id: data.id, decryptedText: null, error: 'cannot_decrypt' });
    }

    return res.status(200).json({ id: data.id, decryptedText: decrypted });
};

export const listMessages = async (req, res) => {
    const { data, error } = await listMessagesByUsername(req.user.username);
    if (error || !data) return res.status(500).json({ error: 'fetch_failed' });

    const items = data.map((row) => ({
        id: row.id,
        cipherType: row.cipher_type.toLowerCase(),
        encryptedText: row.encrypted_text
    }));

    return res.status(200).json({ items });
};
