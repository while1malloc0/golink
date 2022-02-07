<script lang="ts">
    export let email: string;
    export let password: string;
    export let errors: { email?: string, password?: string };

    const onSubmit = async () => {
        const resp = await fetch("/login", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (resp.status == 200) {
            window.location.href = "/";
        } else {
            const json = await resp.json();
            errors = json.errors;
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <input type="text" name="email" placeholder="email" bind:value={email}/>
    {#if errors?.email}
        <p class="error">{errors.email}</p>
    {/if}
        
    <input type="password" name="password" placeholder="password" bind:value={password}/>
    {#if errors?.password}
        <p class="error">{errors.password}</p>
    {/if}
    <button type="submit">Log In</button>
</form>