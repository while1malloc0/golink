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

export const post: RequestHandler = async ({ request }) => {
  const db = new Database();
  const { link } = await request.json();
  let created;
  try {
    created = await db.link.create({
      data: { destination: link.destination, label: link.label },
    });
  } catch (e) {
    const errors: { label?: string } = {};
    if (e.meta.target.includes("label")) {
      errors.label = "A link already exists with this label";
    }
    return {
      status: 500,
      body: {
        errors: errors,
      },
    };
  }
  return {
    status: 201,
    body: {
      link: created,
    },
  };
};
