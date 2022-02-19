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
</script>

<Card>
  <table class="m-1 w-full">
    <thead class="tracking-wide text-md font-semibold text-left bg-gray-200">
      <tr>
        <th>Label</th>
        <th>Destination</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="text-left tracking-wide font-light text-sm">
        {#each tableData as link}
          <tr class="hover:bg-gray-50">
            {#if link.edit}
              <td><input class="tracking-wide m-0 font-light text-sm text-left rounded-md ring-1 ring-golink-green px-1 w-min" value={link.label}/></td>
              <td><input class="tracking-wide m-0 font-light text-sm text-left rounded-md ring-1 ring-golink-green px-1 w-full" value={link.destination}/></td>
              <td on:click={() => toggleEditState(link)}><Check/></td>
            {:else}
              <td>{link.label}</td>
              <td>{link.destination}</td>
              <td on:click={() => toggleEditState(link)}><Pencil/></td>
            {/if}
          </tr> 
        {/each}
    </tbody>
  </table>
</Card>