import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";

export const get: RequestHandler = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      status: 401,
      body: {
        errors: {
          message: "You must be logged in to access this resource",
        },
      },
    };
  }
  const db = new Database();
  const links =
    (await db.link.findMany({ where: { ownerEmail: user.email } })) || [];
  return {
    status: 200,
    body: {
      links,
    },
  };
};

export const post: RequestHandler = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      status: 401,
      body: {
        errors: {
          message: "You must be logged in to create a link",
        },
      },
    };
  }

  const db = new Database();
  const { link } = await request.json();
  let created;
  try {
    created = await db.link.create({
      data: {
        destination: link.destination,
        label: link.label,
        ownerEmail: user.email,
      },
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
