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
          <td>
            <!-- we naively assume that if a field is a function, it's probably a Svelte component -->
            {#if typeof(item[column.field]) === "function" }
              <svelte:component this={item[column.field]}/>
            {:else}
              {item[column.field]}
            {/if}
          </td>
        {/each}
      </tr> 
    {/each}
  </tbody>
</table>