<script lang="ts">
  export let link;

  export let label = link?.label;
  export let destination = link?.destination;

  const onSubmit = async (e) => {
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
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" id="label" bind:value={label}/>
  <input type="text" id="destination" bind:value={destination}/>
  <button type="submit">Submit</button>
</form>
