<script lang="ts">
  export let label: string;
  export let destination: string;
  export let buttonText: string;
  export let errors;
  let buttonClasses;

  const onSubmit = async () => {
    errors = {};
    buttonText = "Saving...";
    buttonClasses = "loading";

    const resp = await fetch("/links", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        link: {
          label: label,
          destination: destination,
        },
      }),
    });
    if (resp.status == 201) {
      buttonText = "Link created successfully";
      buttonClasses = "success";
      label = "";
      destination = "";
    } else {
      buttonText = "Error creating link";
      errors = (await resp.json()).errors;
    }

    setTimeout(() => {
      buttonText = "Submit";
      buttonClasses = "";
    }, 4000);
  }
</script>

<h1>Create a new link</h1>

<form on:submit|preventDefault={onSubmit}>
  <div class="golink-form">
    {#if errors?.label}
      <span>{errors.label}</span>
    {/if}
    <input name="label" placeholder="example" bind:value={label} />
    <input name="destination" placeholder="https://example.org" bind:value={destination} class="" />
    <button type="submit" id="submit" class="{buttonClasses}">
      {#if buttonText}
        {buttonText}
      {:else}
        Submit
      {/if}
    </button>
  </div>
</form>