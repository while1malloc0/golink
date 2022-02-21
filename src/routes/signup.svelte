<script lang="ts">
  export let errors: { email?: string, password?: string };
  export let email: string;
  export let password: string;

  const onSubmit = async () => {
    let res = await fetch("/api/signup.json", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });
    if (res.status === 201) {
      window.location.href = "/";
    } else {
      let json = await res.json();
      errors = json.errors;
    }
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <!-- TODO validate these client side -->
  <input name="email" bind:value={email} placeholder="email"/>
  {#if errors?.email}
    <p class="error">{errors.email}</p>
  {/if}
  <input name="password" bind:value={password} type="password" placeholder="password"/>
  {#if errors?.password}
    <p class="error">{errors.password}</p>
  {/if}
  <button type="submit">Submit</button>
</form>