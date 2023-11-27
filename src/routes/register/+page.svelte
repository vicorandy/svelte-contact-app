<script lang="ts">
    import { enhance } from '$app/forms';
    export let form;
    
    </script>
    
    <svelte:head>
        <title>Register</title>
    </svelte:head>
    

    <p class="validation">{form?.error ?? ''}</p>
    <form use:enhance method="post" action="?/registerUser">
        <div class="forminput">
        <p >Username</p>
        <input id="name" name="username" value={form?.username ?? ''}  />
        </div>

        <div class="forminput">
            <p >Email</p>
            <input id="email" name="email" value={form?.email ?? ''}  />
        </div>
        
        <div class="forminput">
        <p >Password</p>
        <input id="password" name="password" value={form?.password ?? ''}/>
        </div>
        <button type="submit"  class="submit-btn">Register</button>
    </form>   
    
    <style>
    
    form{
       border: 1px solid black;
       border-radius: 12px;
       padding: 5rem;
       background-color: rgb(31, 32, 31);
       width: 60%;
       margin: 0 auto;
    }
    p{
        font-size: 20px;
        font-weight: 600;
        color: white;
    }
    .validation{
        color: red;
        text-align: center;
    }
    .forminput{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 2rem;
        align-items: center;
    }
    
    input{
        width: 80%;
        height: 3rem;
        border-radius: 12px;
        border: 2px solid grey;
        margin-left: 2rem;
    
    }
    .submit-btn{
    
        margin: 0 auto;
        border-radius:12px ;
    }
    
    </style>
