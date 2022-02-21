import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    target: "#svelte",
  },
  vite: {
    ssr: {
      external: ["mock-aws-sdk", "aws-sdk", "nock"],
    },
  },
};

export default config;
