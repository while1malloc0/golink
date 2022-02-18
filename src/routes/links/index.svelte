<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import Table from "$lib/components/Table.svelte";
  export let links;
  const columns = [
    {title: "Label", field: "label"},
    {title: "Destination", field: "destination"}
  ]
</script>

<Card>
  <Table columns={columns} items={links}/>
</Card>