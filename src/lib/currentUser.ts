import { v4 as uuid } from "uuid";

let sessions: {
  id: string;
  email: string;
}[] = [];

export const createSession = async (email: string) => {
  const session = {
    id: uuid(),
    email,
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
