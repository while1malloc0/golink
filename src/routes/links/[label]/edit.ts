import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";
import redirect from "$lib/redirect";

export const get: RequestHandler = async ({ params }) => {
  const { label } = params;
  const db = new Database();
  const link = await db.link.findUnique({ where: { label } });
  if (!link) {
    return redirect("/404");
  }

  return {
    status: 200,
    body: {
      link,
    },
  };
};
