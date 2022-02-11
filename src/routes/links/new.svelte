<script lang="ts">
  export let label: string;
  export let destination: string;
  export let buttonText: string;
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
      buttonText = "Link created successfully";
      label = "";
      destination = "";
    } else {
      buttonText = "Error creating link";
      errors = (await resp.json()).errors;
    }
    setTimeout(() => {
      buttonText = "Submit";
    }, 5000);
  }
</script>

<h1>Create a new link</h1>

{#if errors}
  <span>{errors}</span>
{/if}

<form on:submit|preventDefault={onSubmit}>
  <div class="golink-form">
    <input name="label" placeholder="example" bind:value={label} />
    <input name="destination" placeholder="https://example.org" bind:value={destination} />
    <button type="submit">
      {#if buttonText}
        {buttonText}
      {:else}
        Submit
      {/if}
    </button>
  </div>
</form>