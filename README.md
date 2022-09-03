# Auth Service

docker build -t lionel/auth .

## Modules

express validator : check req.body. Les retours d'erreurs ne sont pas standards, mais sous forme de []

express-async-errors : il y a juste à l'installer! Et permet de faire du async sur les routes (mais why ? -> A creuser)

supertest : pour faire des fausses requêtes sur notre app


## MEMO 
curl -d '{"email": "test", "password" : "coucsevre"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users/signup