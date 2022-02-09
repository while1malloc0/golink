import { parse } from "cookie";
import { getSession } from "$lib/currentUser";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { session_id: sessionId } = parse(event.request.headers.get("cookie"));
  const url = new URL(event.request.url);

  if (sessionId) {
    const session = await getSession(sessionId);
    if (session) {
      event.locals.user = session.user;
    }
  }

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

  return await resolve(event);
};
