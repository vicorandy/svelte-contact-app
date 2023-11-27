<script lang="ts">
    export let data;
    $: user = data.loggedInUser
    $: contacts = data.contacts

    export async function preload() {
    // Return the data to be passed to the layout
    return {
      user
    };
  }

</script>

<h1 style="color: aliceblue;">welcome back , {user.username}</h1>
<section>
{#if contacts.length>0}
<h1 class="center">Contact list</h1>    
{/if}

{#if contacts.length===0}
<h1 class="center">You dont have any saved contacts</h1>
{/if}
<div class="btn">
<button><a  class="black" href="/add_contact">Add contact</a></button>
</div>

{#each contacts as contact }
<a href={`/contacts/${contact.id}`}>
<div class="contact">
    <div class="left">
    <div class="avatar">{contact.name[0]}</div>
    <div class="contact-content">
    <div class="name">{contact.name}</div>
    <div class="email">{contact.email}</div>
    </div>
    </div>
    <div>
       <button>Edit</button>
    </div>
</div>    
</a>
{/each}



</section>


<style>
    section{
        color: white;
        width: 70%;
        margin: auto;
        padding: 2rem;

    }
    .contact{
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9); /* Example box shadow */
        padding: 1rem;
        width: 70%;
        margin: 0 auto;
        border-radius: 12px;
        margin-bottom: 1rem;
        background-color: #303132;
        justify-content: space-between;
    }
    .contact:hover{
       border: 1px solid gold;
       cursor: pointer;
    }
    .left{
        display: flex;
    }

    .name{
        font-size:x-large;
        font-weight: 500;
    }
    .center{
        text-align: center;
        margin-bottom: 1rem;
    }

    .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3d5369; /* You can customize the background color */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    color: #ffffff; /* You can customize the text color */
    margin-right: 1rem;
  }
  .btn{
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 1rem;

  }
  a{
    color:white;
  }
  .black{
    color: black;
  }
</style>