import { eq } from "drizzle-orm";
import db from "@/database";
import { Users } from "@/database/schema";

// PATCH requests to /users/:id update users.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { password } = await request.json();

  const [updatedUser] = await db
    .update(Users)
    .set({ password })
    .where(eq(Users.id, Number(id)))
    .returning();

  if (!updatedUser) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(updatedUser);
}

// DELETE requests to /users/:id delete users.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [deletedUser] = await db
    .delete(Users)
    .where(eq(Users.id, Number(id)))
    .returning({ deletedId: Users.id });

  if (!deletedUser) {
    return Response.json({ error: "User not found!" }, { status: 404 });
  }

  return Response.json({ message: "User deleted!", id: deletedUser.deletedId });
}
