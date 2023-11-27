<script lang="ts">
    import { enhance } from '$app/forms';
    export let form;

    
    </script>
    
    <svelte:head>
        <title>Register</title>
    </svelte:head>
    
    
    <p class="validation">{form?.error ?? ''}</p>
    
    <form use:enhance method="post" action="?/createContact">
        <div class="forminput">
        <p >Name</p>
        <input id="name" name="name" value={form?.name ?? ''}  />
        </div>
        
        <div class="forminput">
        <p > Number</p>
        <input id="number" type="number" name="number" value={form?.number ?? ''}  />
        </div>

        <div class="forminput">
            <p >Email</p>
            <input id="email" type="email" name="email" value={form?.email ?? ''}  />
        </div>
        
        <div class="forminput">
        <p >Birthday</p>
        <input id="birthday" type="date" name="birthday" value={form?.birthday ?? ''}/>
        </div>
        <button type="submit"  class="submit-btn">Create contact</button>

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
