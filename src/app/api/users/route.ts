import db from "@/database";
import { Users } from "@/database/schema";

// GET requests to /users fetch all users.
export async function GET(_request: Request) {
  const users = await db.select().from(Users);
  return Response.json(users);
}

// POST requests to /users create new users.
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const [new_user] = await db
    .insert(Users)
    .values({ email, password })
    .returning();
  return Response.json(new_user, { status: 201 });
}
