import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";

export const get: RequestHandler = async () => {
  const db = new Database();
  const links = await db.link.findMany();
  return {
    body: {
      links,
    },
  };
};

export const post: RequestHandler = async ({ params }) => {
  // TODO: actually create a link
  return {
    status: 201,
  };
};
