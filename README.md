# Fuel Quote API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF2D00?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

API para gerenciamento de cotações de combustíveis com relatórios avançados.

## 📦 Pré-requisitos

- Docker 25.3+
- Docker Compose 2.24+
- Node.js 20.11+

## 🚀 Instalação Rápida

1. Clone o repositório:
    ```bash
    git clone https://github.com/igordmouraa/fuel-quote-api.git
    cd fuel-quote-api
    ```

2. Crie o arquivo de configuração a partir do `.env.example`:
    ```bash
    .env
    ```

3. Inicie os containers:
    ```bash
    docker-compose up -d --build
    ```

## ⚠️ Atenção: Quebra de Linha (LF)
Para evitar erros em sistemas Unix/Linux (especialmente ao rodar scripts no Docker, como entrypoint.sh), certifique-se de que todos os arquivos shell (.sh) e o próprio Dockerfile utilizem quebras de linha no formato LF (Line Feed), e não CRLF (Carriage Return + Line Feed).

> No VS Code, você pode alterar isso facilmente clicando no canto inferior direito onde aparece "CRLF" e selecionando "LF".

## 🌐 Acesso à API

- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)

## 🧪 Testes Automatizados

- Rodar todos os testes de integração:
    ```bash
    docker-compose run --rm test-runner
    ```

## 🐳 Comandos Docker

| Comando                        | Descrição                                      |
|---------------------------------|------------------------------------------------|
| `docker-compose up -d`          | Inicia todos os serviços em segundo plano.    |
| `docker-compose stop`           | Para os serviços sem removê-los.              |
| `docker-compose down -v`        | Remove containers, redes e volumes.           |
| `docker-compose logs -f api`    | Monitora os logs da API em tempo real.        |

## 📂 Estrutura do Projeto

Abaixo está a estrutura principal do projeto:

```bash
fuel-quote-api/
├── src/
│   ├── app.controller.ts           
│   ├── app.module.ts               
│   ├── database/
│   │   └── database.module.ts   
│   ├── gas-station/
│   │   ├── dto/
│   │   │   ├── create-gas-station.dto.ts 
│   │   │   └── update-gas-station.dto.ts 
│   │   ├── entities/
│   │   │   └── gas-station.entity.ts 
│   │   ├── test/
│   │   │   └── gas-station.e2e-spec.ts
│   │   ├── gas-station.controller.ts 
│   │   ├── gas-station.service.ts
│   │   └── gas-station.module.ts 
│   ├── quotation/
│   │   ├── dto/
│   │   │   ├── create-quotation.dto.ts
│   │   │   └── report.dto.ts
│   │   ├── entities/
│   │   │   └── quotation.entity.ts
│   │   ├── test/
│   │   │   ├── quotation.e2e-spec.ts
│   │   │   └── report.e2e-spec.ts 
│   │   ├── quotation.controller.ts  
│   │   ├── quotation.service.ts         
│   │   └── quotation.module.ts          
│   └── main.ts                        
├── test/                              
├── .env.example                       
├── docker-compose.yml                 
├── Dockerfile                         
├── package.json                       
└── README.md                          
```

## 🏆 Considerações Finais

Este projeto é de um desafio em backend, e segue boas práticas de desenvolvimento com NestJS, incluindo organização modular, uso de DTOs, entidades bem definidas e cobertura de testes unitários automatizados.

## 📄 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.