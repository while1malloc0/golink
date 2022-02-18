<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import Table from "$lib/components/Table.svelte";
  import Pencil from "$lib/icons/Pencil.svelte";
  export let links;

  const tableData = links.map((link) => {
    return {label: link.label, destination: link.destination, edit: Pencil}
  });
  const columns = [
    {title: "Label", field: "label"},
    {title: "Destination", field: "destination"},
    {title: "", field: "edit"},
  ]
</script>

<Card>
  <Table columns={columns} items={tableData}/>
</Card>