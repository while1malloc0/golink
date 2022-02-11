<script lang="ts">
  export let link;

  export let label = link?.label;
  export let destination = link?.destination;
  export let success = false;

  const onSubmit = async (e) => {
    if (success) {
      success = !success;
      return
    }
    const resp = await fetch(`/links/${label}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        label: label,
        destination: destination,
      }),
    });
    if (resp.ok) {
      success = true;
    }
  }
</script>

<h1>Edit your link</h1>
<form on:submit|preventDefault={onSubmit}>
  <div class="golink-form">
    <input type="text" bind:value={label}/>
    <input type="text" bind:value={destination}/>
    <button type="submit">
      {#if success}
        Successfully updated your link
      {:else}
        Submit
      {/if}
    </button>
  </div>
</form>