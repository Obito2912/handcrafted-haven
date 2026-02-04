import { auth } from '@/auth';

export async function getLoggedInInfo() {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  const loggedIn = !!userId;
  return { session, userId, loggedIn };
}