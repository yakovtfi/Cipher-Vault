import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.API_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Check NEXT_PUBLIC_SUPABASE_URL and API_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);



