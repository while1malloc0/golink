import db from "$lib/db";
import redirect from "$lib/redirect";
import type { RequestHandler } from "@sveltejs/kit";

// GET /:link
export const get: RequestHandler = async ({ params }) => {
  const linkName = params.link;
  const database = new db();
  const link = await database.link.findUnique({ where: { label: linkName } });
  if (!link) {
    return redirect("/404");
  }
  return redirect(link.destination);
};
