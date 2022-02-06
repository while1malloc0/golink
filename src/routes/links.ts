import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/db";

export const get: RequestHandler = async () => {
  const database = new db();
  const links = await database.link.findMany();
  return {
    body: {
      links,
    },
  };
};
