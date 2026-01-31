// GET requests to /users fetch all users.
export async function GET(_request: Request) {
  const users = [
    { id: 1, email: "karthikgappiah@clonecademy.com", password: "passphrase" },
    { id: 2, email: "aakashappiah@gmail.com", password: "password" },
  ];

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// POST requests to /users create new users.
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const new_user = { email, password };
  return new Response(JSON.stringify(new_user), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
