import type { RequestHandler } from "@sveltejs/kit";
import Database from "$lib/db";
import bcrypt from "bcrypt";
import { createSession } from "$lib/session";
import { serialize } from "cookie";

export const post: RequestHandler = async ({ request }) => {
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

  const user = await db.user.findUnique({ where: { email: email.toString() } });
  if (!user) {
    return {
      status: 401,
      body: {
        errors: {
          email: `User not found for email: ${email.toString()}`,
        },
      },
    };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return {
      status: 401,
      body: {
        errors: {
          password: "Invalid password",
        },
      },
    };
  }

  const { id } = await createSession({
    email: user.email,
    authorizationTier: user.authorization_tier,
  });

  return {
    status: 200,
    headers: {
      "Set-Cookie": serialize("session_id", id, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  };
};
