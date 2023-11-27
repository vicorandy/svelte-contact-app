export const load =(event)=>{
    let loggedInUserData = event.cookies.get('loggedInUser')
   const loggedInUser  = loggedInUserData?  JSON.parse(loggedInUserData) : false

   return{
    user:loggedInUser
   }
}

