<script lang="ts">
    import '../forms.css'
	import { enhance } from '$app/forms';
    export let data;

    $: user = data.user

</script>

<main>
	<div class="nav-container">
		<nav class="logo">
			<img src="/logo2.png" alt="">
			<p>ContactsApp</p>
		</nav>
        
		<nav class="add-user">
			<div class="nav-item"><a href="/">My Contacts</a></div>
			<div class="nav-item"></div>
			<div class="nav-item"></div>
		</nav>

		<nav class="add-user">
			{#if user}
			<form use:enhance method="post" action="?/logOut">
				<button class="logout">Log out</button>
			</form>
			{/if}

			{#if !user}
			<div class="nav-item"><a href="/register">Register</a></div>
			<div class="nav-item"><a href="/login">Login</a></div>
			{/if}

		</nav>

	</div>
	<slot />
</main>

<style>
    * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
     }

	 .logo{
		font-size: larger;
		font-weight: 600;
		color: white;
		display: flex;
		align-items: center;
	 }

	 .add-user{
		font-size: larger;
		/* font-weight: 600; */
		color: white;
		display: flex;
		align-items: center;
	 }
	 img{
		
		height: 50px;
		width: 50px;
	 }
	main {
		max-width: 100%;
        height: 100vh;
	

	}

	.nav-container{
		display: flex;
		flex-direction: none;
		justify-content: space-between;
		margin-bottom: 5rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9); /* Example box shadow */
		padding: 1rem;
		width: 100%;
		z-index: 10;
	}

	.nav-item{
		margin-right: 1rem;
		cursor: pointer;
	}
	.logout{
		padding: 1rem;
	}
	
</style>
