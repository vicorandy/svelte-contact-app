import { fail ,json,redirect} from '@sveltejs/kit'
type inputData = {
 email:any;
 password:any;
}

interface Locals {
  user?: {
    name: string;
  };
}

const validateInput = function (input:inputData) :
{success:false,error:string} | {success:true,data:inputData}
{
 if(!input.email){
  return{
    success:false,
    error:'Please enter Your Email'
  }
 }

if(!input.password){
  return{
    success:false,
    error:'Please enter a password'
  }
}
 return{
  success:true,
  data:input
 }
}
export const actions ={
    async loginUser (event){
      const formData = await event.request.formData()
      const loginDetails = {
        email : (formData.get('email')) as string,
        password : (formData.get('password')) as string
      }

      const validation =validateInput(loginDetails)
  
      if(!validation.success){
        return fail(400,{
          error:validation.error,
          ...loginDetails
        })
      }

      const usersData:any = event.cookies.get('users') ?? []   
      const  users = usersData[0]? JSON.parse(usersData) :[]      
      const existingUser =users.find((user:any)=>user?.email===loginDetails.email )
    
      if(!existingUser){
        return fail(404,{
          error:'this email address has not yet been registered, click the register button to register',
          ...loginDetails
        })
      }

      if(existingUser && existingUser.password !== loginDetails.password){
         return fail(400,{
          error:'The password you entered is not correct',
          ...loginDetails
         })
      }
      
      if(existingUser && existingUser.password === loginDetails.password){
        event.cookies.set('loggedInUser',JSON.stringify(existingUser),{path:'/'})
        throw  redirect(303,'/')
      }
    }


}