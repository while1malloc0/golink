import { parse } from "cookie";
import { getSession } from "$lib/session";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const injectCurrentUser: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get("cookie");
  if (cookieHeader) {
    const { session_id: sessionId } = parse(cookieHeader);
    if (sessionId) {
      const session = await getSession(sessionId);
      if (session) {
        event.locals.user = session.user;
      }
    }
  }
  return resolve(event);
};

const protectAdminRoutes: Handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  const user = event.locals.user;
  if (isAdminRoute(url) && !isAdminUser(user)) {
    return new Response(null, {
      status: 302,
      headers: { location: "/login" },
    });
  }
  return resolve(event);
};

const isAdminRoute = (url: URL) => {
  return url.pathname.startsWith("/admin/");
};

const isAdminUser = (user) => {
  return user?.authorizationTier === "Admin";
};

export const handle: Handle = sequence(injectCurrentUser, protectAdminRoutes);
