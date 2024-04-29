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
            let { data, error } = await supabase
            .from('users')
            .insert(info)
            .select();

            return { data, error };
        } catch (error) {
            return { error: error.message };
        }
    }

    // ========== getName ========

    async function getName(name) {
        try {
            let { data, error } = await supabase
            .from('users')
            .select("id")
            .eq('nom', name)

            console.log('donnée: ',data);
            
            return {data , error};
        } catch (error) {
            return { error: error.message };
        }
    }


    // ========= addClicDroit =========

    async function addClicDroit(userId) {
        try {
            let { data, error } = await supabase
            .from('suspect')
            .insert([
             { user_id: userId, action: 'click_droit' },])

             return { data, error};
        } catch (error) {
            return { error: error.message };
        } 
    }

    // ========= addCtrl ==========

    async function addCtrl(userId) {
        try {
            let { data, error } = await supabase
            .from('suspect')
            .insert([
             { user_id: userId, action: 'ctrl-' },])

             return {data, error};
        } catch (error) {
            return {error: error.message};
        }
    }

    // ========== addAnswers =========

    async function addAnswers(userId, reponse, rep) {
        try {
            let { data, error } = await supabase
            .from('reponses')
            .insert([
            { user_id: userId, question1: reponse, question2: rep},])

            return {data, error};
        } catch (error) {
            return {error: error.message};
        }
    }

    // ========== addLeavePage ========

    async function addLeavePage(userId) {
        try {
            let { data, error } = await supabase
            .from('suspect')
            .insert([
            { user_id: userId, action: 'leave page' },])

            return {data, error};
        } catch (error) {
            return {error: error.message};
        }
    }


    // ========= addResizePage ========

    async function addResizePage(userId) {
        try {
            let { data, error } = await supabase
            .from('suspect')
            .insert([
            { user_id: userId, action: 'Resize page' },])

            return {data, error};
        } catch (error) {
            return {error: error.message};
        }
    }

    // ========= addBackRefreshPage =========

    async function addBackRefreshPage(userId) {
        try {
            let { data, error } = await supabase
            .from('suspect')
            .insert([
            { user_id: userId, action: 'back refresh page' },])

            return {data, error};
        } catch (error) {
            return {error: error.message};
        }
    }
    // ====== export function =========
    
    export { getUsers, getUser, addUser,  getName, addClicDroit, addCtrl, addAnswers, addLeavePage, addResizePage, addBackRefreshPage };    