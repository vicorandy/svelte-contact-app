import { fail ,json,redirect} from '@sveltejs/kit'

type Contact ={
    id?:string;
    name:string;
    number:string;
    email?:string;
    birthday?:string;
    userEmail?:string;
}

const validateInputData= function  (input:Contact) :
{success:false,error:string} | {success:true,data:Omit<Contact,'id'>}

{

if(!input.name){
    return {
        success:false,
        error:'Please enter a name'
    }
}

if(!input.number){
    return{
        success:false,
        error:'Enter a phone number for your contact'
    }
}

return{
    success:true,
    data:input
}

}

export const actions ={
    async editContact(event){
       const userData:any = event.cookies.get('loggedInUser')
       const user =userData? JSON.parse(userData) : {}

       const formData = await event.request.formData()

       const inputData:Contact ={
         name:(formData.get('name')) as string,
         number:(formData.get('number'))as string,
         birthday:(formData.get('birthday')) as string,
         email:(formData.get('email')) as string,
       }

       const validation = validateInputData(inputData)

       if(!validation.success){
        return fail(400,{
            error:validation.error,
            ...inputData
        })
       }

       const contactsData:any = event.cookies.get('contacts') ?? []
       let  contacts = contactsData[0]? JSON.parse(contactsData) :[]  
       const selectedContact = contacts.find((item:any)=>item.id===event.params.id)

       contacts = contacts.filter((item:any)=>item.id!==event.params.id)
       const duplicateContact = contacts.find((item:any)=>{
        if(item.userEmail === user.email && item.name === inputData.name) return item 
       })

       if(duplicateContact){
        return fail(400,{
            error:`you already have a contact saved as ${inputData.name} `,
            ...inputData
        })
       }

       const contact:Contact ={
        ...inputData,
        id:selectedContact.id,
        userEmail: user.email
     }

    contacts =[...contacts,contact]
    event.cookies.delete('contacts')
    event.cookies.set('contacts',JSON.stringify(contacts),{path:'/'}) 
    throw redirect(303,'/')


    },
    async deleteContact (event){
       const {id} =event.params
       const contactsData:any = event.cookies.get('contacts') ?? []
       let  contacts = contactsData[0]? JSON.parse(contactsData) :[]  
       contacts = contacts.filter((item:any)=>item.id!==id)

       event.cookies.set('contacts',contacts,{path:'/'})
       throw redirect(303,'/')

    }
}

export const load=(event)=>{
   const {id} = event.params
   
   const contactsData:any = event.cookies.get('contacts') ?? []   
   const  contacts = contactsData[0]? JSON.parse(contactsData) :[]   
   const contact = contacts.find((cnt:any)=>cnt.id === id)
   if(!contact){
    throw redirect(303,'/')
   }
   return{
     contact
   }
}


