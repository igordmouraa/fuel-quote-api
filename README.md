## Comandos para rodar no docker - teste
 
```bash
docker-compose --env-file .env.development build --no-cache

docker-compose --env-file .env.development up -d

// Ver os logs
docker-compose logs -f api