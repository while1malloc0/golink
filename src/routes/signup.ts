import type { RequestHandler } from "@sveltejs/kit";
import database from "$lib/db";

export const get: RequestHandler = async () => {
  return {
    status: 200,
  };
};

export async function post({ request }: { request: Request }) {
  const { email } = await request.json();
  if (!email) {
    return {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        errors: {
          email: "Email is required",
        },
      },
    };
  }

  const db = new database();
  const invitation = await db.invite.findUnique({
    where: { email: email.toString() },
  });

  if (!invitation) {
    return {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        errors: {
          email: `Invitation not found for email: ${email.toString()}`,
        },
      },
    };
  }

  // TODO: create user in DB

  return {
    status: 201,
    body: {},
  };
}
