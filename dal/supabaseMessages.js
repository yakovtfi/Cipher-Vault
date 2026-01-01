import { supabase } from '../config/supabaseData.js';

export const insertMessage = async ({ username, cipherType, encryptedText }) => {
    return supabase
        .from('messages')
        .insert([{ username, cipher_type: cipherType.toUpperCase(), encrypted_text: encryptedText }])
        .select()
        .limit(1)
        .single();
};

export const getMessageById = async (id) => {
    return supabase
        .from('messages')
        .select('id, username, cipher_type, encrypted_text')
        .eq('id', id)
        .single();
};

export const listMessagesByUsername = async (username) => {
    return supabase
        .from('messages')
        .select('id, cipher_type, encrypted_text')
        .eq('username', username)
        .order('inserted_at', { ascending: false });
};
