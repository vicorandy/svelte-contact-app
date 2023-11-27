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
    async createContact(event){
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

       
       const oldContact =contacts.find((cnt:any)=>{
         if(cnt.userEmail === user.email && cnt.name === inputData.name) return cnt     
       })

       if(oldContact){
        return fail(400,{
            error:`you already have a contact saved as ${inputData.name} `,
            ...inputData
        })
       }

       
       const contact:Contact ={
           ...inputData,
           id: crypto.randomUUID(),
           userEmail: user.email
       }
       
       contacts = [...contacts,contact]
       event.cookies.set('contacts',JSON.stringify(contacts),{path:'/'})

       throw redirect(303,'/')
       
    },
}