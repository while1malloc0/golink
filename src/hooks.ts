import { parse } from "cookie";
import { getSession } from "$lib/currentUser";

export const handle = async ({ event, resolve }) => {
  const { session_id: sessionId } = parse(event.request.headers.get("cookie"));
  if (sessionId) {
    const session = await getSession(sessionId);
    if (session) {
      event.locals.user = { email: session.email };
    }
  }
  return await resolve(event);
};
