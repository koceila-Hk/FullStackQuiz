import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://davlziybvxeqtfiyiegw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhdmx6aXlidnhlcXRmaXlpZWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1OTI4MjksImV4cCI6MjAyNTE2ODgyOX0.rFK393Oy5v3kmgmF0bh0KoE7D4pKjMcoVpQEVlv6JuY";
const supabase = createClient(supabaseUrl, supabaseKey);



    //  ======== get users ========== 

    async function getUsers() {
       let { data, error } = await supabase
       .from('users')
       .select()

       return { data, error }
    }
    //  ======== get user ========== 

    async function getUser(id) {
      let { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
    
      return {data, error}
    }

    // ========= add user ========== 

    async function addUser(info) {
        try {
            const { data, error } = await supabase
            .from('users')
            .insert(info)
            .select();

            return { data, error };
        } catch (error) {
            return { error: error.message };
        }
    }

    // Fonction pour ajouter un utilisateur suspect dans la base de données
    
async function addSuspectUser(user_id, action) {
    try {
        const { data, error } = await supabase
        .from('suspect')
        .insert([{ user_id: user_id, action }]);
        return { data, error };
    } catch (error) {
        return { error: error.message };
    }
}


//click droit

  async function click(){
    try {
        const  userId  = req.query.nom;
    
        let { data: users, error:errorName } = await supabase
      .from('users')
      .select("id")
      .eq('nom', userId)
    
        const nom=users[0].id
    
    
      
    const { data, error } = await supabase
    .from('suspect')
    .insert([
      { user_id: nom, action: 'click_droit' },
    ])
    .select()
  }catch (error) {
    return { error: error.message };
}
}

    // ====== export function =========
    
    export { getUsers, getUser, addUser, addSuspectUser,click};    
    