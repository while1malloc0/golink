import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";
import bcrypt from "bcrypt";

export const get: RequestHandler = async () => {
  return {
    status: 200,
  };
};

export const post: RequestHandler = async ({
  request,
}: {
  request: Request;
}) => {
  const { email, password } = await request.json();
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

  if (!password) {
    return {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        errors: {
          password: "Password is required",
        },
      },
    };
  }

  const db = new Database();
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

  const user = await db.user.findUnique({ where: { email: email.toString() } });
  console.log(user);
  if (user) {
    return {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        errors: {
          email: `User already exists with email: ${email.toString()}`,
        },
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await db.user.create({
    data: { email: email.toString(), password: hashedPassword },
  });

  return {
    status: 201,
    body: {
      email: created.email,
    },
  };
};
