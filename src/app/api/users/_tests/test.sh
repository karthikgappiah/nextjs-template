curl -s http://localhost:3000/api/users | jq

curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"secret"}' | jq

curl -s -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"password":"newpassword"}' | jq

curl -s -X DELETE http://localhost:3000/api/users/2 | jq