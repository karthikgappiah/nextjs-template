import { eq } from "drizzle-orm";
import db from "./index.ts";
import { Users as usersTable } from "./schema.ts";

async function main() {
  console.log("CREATE: creating user...");
  const user: typeof usersTable.$inferInsert = {
    email: "john.doe@email.com",
    password: "password",
  };

  await db.insert(usersTable).values(user);
  console.log("CREATED: user created!");

  console.log("FETCH: fetching all users...");
  const users = await db.select().from(usersTable);
  console.log("FETCHED:", users);

  console.log("UPDATE: updating user...");
  await db
    .update(usersTable)
    .set({
      password: "passphrase",
    })
    .where(eq(usersTable.email, user.email));
  console.log("UPDATED: user updated!");

  console.log("DELETE: deleting user...");
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("DELETED: user deleted!");
}

main(); // pnpm node --experimental-strip-types src/database/seed.ts
