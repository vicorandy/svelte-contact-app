<script>
    export let data;
    import { enhance } from '$app/forms';
    export let form;

    $: contact = data.contact

</script>
<svelte:head>
    <title>{contact.name}</title>
</svelte:head>
    <p class="validation">{form?.error ?? ''}</p>
    
    <form class="main-form" use:enhance method="post" action="?/editContact">
        <div class="forminput">
        <p >Name</p>
        <input id="name" name="name" value={form?.name ?? contact.name}  />
        </div>
        
        <div class="forminput">
        <p > Number</p>
        <input id="number" type="number" name="number" value={form?.number ?? contact.number}  />
        </div>

        <div class="forminput">
            <p >Email</p>
            <input id="email" type="email" name="email" value={form?.email ?? contact.email}  />
        </div>
        
        <div class="forminput">
        <p >Birthday</p>
        <input id="birthday" type="date" name="birthday" value={form?.birthday ?? contact.birthday}/>
        </div>
        <div class="btn-container">
        <button type="submit"  class="submit-btn">Save contact</button>
        <form method="post" action="?/deleteContact">
        <button type="submit"  class="delete-btn">Delete contact</button>
        </form>
        </div>

    </form>
    
    <style>
    
    .main-form{
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
    .delete-btn{
        margin: 0 auto;
        background-color: red;
        border-radius:12px ;
        margin-left: 2rem;
    }
    .btn-container{
        display: flex;
        width:fit-content;
        margin: 0 auto;
    }
    </style>
