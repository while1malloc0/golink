<svelte:head>
  <title>Links</title>
</svelte:head>

<script lang="ts">
  import Paper, { Title, Content } from '@smui/paper';
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  export let links;
</script>

<Paper>
  <Title>Links</Title>
  <Content>
    <DataTable style="max-width: 100%">
      <Head>
        <Row>
          <Cell>Label</Cell>
          <Cell>Destination</Cell>
        </Row>
      </Head>
      <Body>
        {#each links as link}
          <Row>
            <Cell>{link.label}</Cell>
            <Cell>{link.destination}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </Content>
</Paper>
