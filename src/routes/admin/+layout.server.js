// Server load — expose the signed-in user's email (if any) to admin pages.
export function load({ locals }) {
  return { user: locals.user };
}
