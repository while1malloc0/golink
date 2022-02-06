<script lang="ts">
  export let errors: { email?: string };
  export let email: string;

  const onSubmit = async () => {
    let res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
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
  <input name="email" bind:value={email}/>
  {#if errors?.email}
    <p class="error">{errors.email}</p>
  {/if}
  <button type="submit">Submit</button>
</form>