<script lang="ts">
  export let users = [];
</script>

<h1>Users</h1>

<table>
  <thead>
    <tr>
      <td>Email</td>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.email}</td>
      </tr>
    {/each}
  </tbody>
</table>