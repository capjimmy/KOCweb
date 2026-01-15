/* Supabase Configuration */
const SUPABASE_URL = 'https://rurnsbtzdglmjpftwzfi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxjmpMoJbRAJouMG6aIwjw_FFFcfOjZ';

let supabase;

if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabaseClient = supabase;
    };
    document.head.appendChild(script);
}

const SupabaseDB = {
    async insertInquiry(data) {
        if (!supabase) return { error: 'Supabase not initialized' };
        return await supabase.from('inquiries').insert([{
            ...data,
            created_at: new Date().toISOString()
        }]);
    },
    async insertReservation(data) {
        if (!supabase) return { error: 'Supabase not initialized' };
        return await supabase.from('reservations').insert([{
            ...data,
            created_at: new Date().toISOString()
        }]);
    }
};

window.SupabaseDB = SupabaseDB;
