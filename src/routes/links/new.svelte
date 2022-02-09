<script lang="ts">
  export let label: string;
  export let destination: string;
  export let banner: string;
  export let errors;
  const onSubmit = async () => {
    const resp = await fetch("/links", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        label: label,
        destination: destination,
      }),
    });
    if (resp.status == 201) {
      banner = "Link created successfully";
      label = "";
      destination = "";
    } else {
      banner = "Error creating link";
      errors = (await resp.json()).errors;
    }
  }
</script>

<h1>Create a new link</h1>

{#if banner}
  <span>{banner}</span>  
{/if}

{#if errors}
  <span>{errors}</span>
{/if}

<form on:submit|preventDefault={onSubmit}>
  <input name="label" placeholder="example" bind:value={label} />
  <input name="destination" placeholder="https://example.org" bind:value={destination} />
  <button type="submit">Create</button>
</form>