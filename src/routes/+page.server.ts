import type { PageServerLoad } from './$types';

import { fail,redirect } from '@sveltejs/kit';

type Contact = {
	name: string;
	email?: string;
	phoneNumber: number;
	address?: string;
};

export const load =({cookies})=>{
   let loggedInUserData = cookies.get('loggedInUser')
   const loggedInUser  = loggedInUserData?  JSON.parse(loggedInUserData) : false
   if(!loggedInUser){
	throw redirect(303,"/login")
   }
   
   
   const contactsData:any = cookies.get('contacts') ?? []   
   let  contacts = contactsData[0]? JSON.parse(contactsData) :[]  

   contacts = contacts.filter((contact:any)=>contact.userEmail === loggedInUser.email)
   
   return{
	loggedInUser,
	contacts
   }
   
} 

export const actions ={
   async logOut(event){
      event.cookies.delete('loggedInUser')
   }
}



