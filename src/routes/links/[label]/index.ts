import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";

export const put: RequestHandler = async ({ params, request }) => {
  const { label } = params;
  const body = await request.json();
  const db = new Database();
  const link = await db.link.findUnique({ where: { label } });
  link.label = body.label;
  link.destination = body.destination;

  const updated = await db.link.update({
    data: { label: link.label, destination: link.destination },
    where: { id: link.id },
  });

  return {
    status: 200,
    body: {
      updated,
    },
  };
};
