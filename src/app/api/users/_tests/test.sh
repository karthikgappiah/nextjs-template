# Sends a GET request to /users to fetch all users.
curl -s http://localhost:3000/api/users | jq

# Sends a POST request to /users to create a user.
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"new.user@email.com","password":"password"}' | jq

# Sends a PATCH request to /users/:id to update a user.
# Edit the user's ID before curling the endpoint.
curl -s -X PATCH http://localhost:3000/api/users/3 \
  -H "Content-Type: application/json" \
  -d '{"password":"passphrase"}' | jq

# Sends a DELETE request to /users/:id to delete a user.
# Edit the user's ID before curling the endpoint.
curl -s -X DELETE http://localhost:3000/api/users/3 | jq