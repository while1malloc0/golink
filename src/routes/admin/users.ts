import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";

export const get: RequestHandler = async () => {
  const db = new Database();
  const users = await db.user.findMany();
  return {
    status: 200,
    body: {
      users: users,
    },
  };
};
