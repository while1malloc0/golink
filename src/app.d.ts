/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
  interface Locals {
    user: { email: string };
  }

  interface Platform {}

  interface Session {}

  interface Stuff {}
}
