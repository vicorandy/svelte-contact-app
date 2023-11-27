import { fail ,json,redirect} from '@sveltejs/kit'
type inputData = {
 username:any;
 password:any;
 email:any;
}

interface Locals {
  user?: {
    name: string;
  };
}

const validateInput = function (input:inputData) :
{success:false,error:string} | {success:true,data:inputData}
{
 if(!input.username){
  return{
    success:false,
    error:'Please enter Your user name'
  }
 }

if(!input.email){
    return{
        success:false,
        error:'please enter your email'
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
    async registerUser (event){
      const formData = await event.request.formData()
      const registerDetails = {
        username : (formData.get('username')) as string,
        password : (formData.get('password')) as string,
        email:(formData.get('email')) as string
      }

      const validation =validateInput(registerDetails)
  
      if(!validation.success){
        return fail(400,{
          error:validation.error,
          ...registerDetails
        })
      }
    
    const usersData:any = event.cookies.get('users') ?? []   
    let users = usersData[0]? JSON.parse(usersData) :[]

    const oldUser = users.find((user:inputData)=>user.email === registerDetails.email)
    if(oldUser){
        return fail(400,{
            error:'this emial is already registered',
            ...registerDetails
        })
    }

    users=JSON.stringify([...users,registerDetails])
    event.cookies.set('users',users)
    event.cookies.set('loggedInUser',JSON.stringify(registerDetails),{path:'/'})
    throw  redirect(303,'/')
    }
}