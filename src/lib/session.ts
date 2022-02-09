import { v4 as uuid } from "uuid";

type User = { email: string; authorizationTier: string };

// Note: this is a bad way to do "real" sessions, but it works for single-server
// deployments
let sessions: {
  id: string;
  user: User;
}[] = [];

export const createSession = async (user: User) => {
  const session = {
    id: uuid(),
    user: user,
  };
  sessions.push(session);
  return session;
};

export const getSession = async (id: string) => {
  const session = sessions.find((s) => s.id === id);
  if (!session) {
    return null;
  }
  return session;
};

export const removeSession = async (id: string) => {
  const session = sessions.find((s) => s.id === id);
  if (!session) {
    return new Error("session not found");
  }
  sessions = sessions.filter((s) => s.id !== id);
  return null;
};
