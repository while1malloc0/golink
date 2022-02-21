<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import Pencil from "$lib/icons/Pencil.svelte";
  import Check from "$lib/icons/Check.svelte";
  export let links;

  const tableData = links.map((link) => {
    return {...link, edit: false}
  });

  const toggleEditState = (link) => {
    const idx = tableData.findIndex((l) => l.label === link.label);
    if (idx > -1) {
      tableData[idx].edit = !tableData[idx].edit;
    }
  }

  const saveLink = async (link) => {
    const resp = await fetch(`/links/${link.label}`,
      { method: "PUT", body: JSON.stringify(link) }
    );
    if (resp.ok) {
      toggleEditState(link);
    } else {
      const parsed = await resp.json();
      console.log(parsed.errors);
    }
  }
</script>

<Card>
  <div role="columnheader">
    <div class="grid grid-cols-3 text-left font-semibold tracking-wide">
      <div class="px-1">Label</div>
      <div class="px-1">Destination</div>
    </div>
  </div>
  <div>
    {#each tableData as link}
      <div class="grid grid-cols-3 text-left text-sm font-light tracking-wide {!link.edit && "hover:bg-gray-100 hover:rounded-sm"}">
        {#if link.edit}
          <div><input class="rounded-sm px-1 ring-golink-green ring-2 font-light tracking-wide" bind:value={link.label}/></div>
          <div class="col-span-2"><input class="font-light px-1 w-full ring-golink-green ring-2 rounded-sm tracking-wide" bind:value={link.destination}/></div>
          <div class="col-start-4 ml-1" on:click={() => saveLink(link)}><Check/></div>
        {:else}
          <div class="px-1">{link.label}</div>
          <div class="col-span-2 px-1">{link.destination}</div>
          <div class="col-start-4 ml-1" on:click={() => toggleEditState(link)}><Pencil /></div>
        {/if}
      </div>
    {/each}
  </div>
</Card>