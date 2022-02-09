import { parse } from "cookie";
import { getSession } from "$lib/session";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const injectCurrentUser: Handle = async ({ event, resolve }) => {
  const { session_id: sessionId } = parse(event.request.headers.get("cookie"));

  if (sessionId) {
    const session = await getSession(sessionId);
    if (session) {
      event.locals.user = session.user;
    }
  }
  return resolve(event);
};

const protectAdminRoutes: Handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  if (
    url.pathname.startsWith("/admin/") &&
    (!event.locals.user || event.locals.user.authorizationTier !== "Admin")
  ) {
    const response = new Response(null, {
      status: 302,
      headers: { location: "/login" },
    });
    return response;
  }
  return resolve(event);
};

export const handle: Handle = sequence(injectCurrentUser, protectAdminRoutes);
