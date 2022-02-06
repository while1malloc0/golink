import db from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";

// GET /:link
export const get: RequestHandler = async ({ params }) => {
  const linkName = params.link;
  const database = new db();
  const link = await database.link.findUnique({ where: { label: linkName } });
  if (!link) {
    return {
      status: 302,
      headers: { Location: "/404" },
    };
  }

  return {
    status: 302,
    headers: { Location: link.destination },
  };
};
