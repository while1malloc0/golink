<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  export let links;
</script>

<div class="bg-white p-3 rounded-md shadow-lg">
  <table class="m-1 w-full">
    <thead class="tracking-wide text-md font-semibold text-left bg-gray-200">
      <tr>
        <th>Label</th>
        <th>Destination</th>
      </tr>
    </thead>
    <tbody class="text-left tracking-wide font-light text-sm">
      {#each links as link}
        <tr class="hover:bg-gray-50">
          <td>{link.label}</td>
          <td>{link.destination}</td>
        </tr> 
      {/each}
    </tbody>
  </table>
</div>