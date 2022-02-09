<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  export let links;
</script>

<table>
  <thead>
    <tr>
      <th>Label</th>
      <th>Destination</th>
    </tr>
  </thead>
  <tbody>
    {#each links as link}
      <tr>
        <td>{link.label}</td>
        <td>{link.destination}</td>
      </tr> 
    {/each}
  </tbody>
</table>
