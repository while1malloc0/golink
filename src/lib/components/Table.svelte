<script>
  export let items;
  export let columns;
</script>

<table class="m-1 w-full">
  <thead class="tracking-wide text-md font-semibold text-left bg-gray-200">
    <tr>
      {#each columns as column}
        <th>{column.title}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="text-left tracking-wide font-light text-sm">
    {#each items as item}
      <tr class="hover:bg-gray-50">
        {#each columns as column}
          <td>{item[column.field]}</td>
        {/each}
      </tr> 
    {/each}
  </tbody>
</table>