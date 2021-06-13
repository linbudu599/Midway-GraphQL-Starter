# Midway-GraphQL-Starter

Enjoy Developing With **MidwayJS** & **GraphQL** !

**WIP!!!**

## Features

- Basic Power of [MidwayJS](https://www.yuque.com/midwayjs/midway_v2)
- TypeORM / Prisma
- SQLite3
- GraphQL + DataLoader
- Quick-Start Middlewares (**Koa Implementation**): `compress` / `helmet` / `logger` / `static` / ...

### GraphQL Related

- [x] [Apollo-Server](https://www.apollographql.com/docs/apollo-server/)
- [x] [TypeGraphQL](https://typegraphql.com/)
- [x] [Prisma 2](https://www.prisma.io/)
- [x] [Directives](src/directives/)
- [x] [AuthChecker](src/utils/authChecker.ts)
- [x] [Plugins](src/plugins/)
- [x] Extensions(**Deprecated Indeed**)
- [x] Scalars
- [ ] File Uploads
- [x] GraphQL Helper
  - [x] [GraphQL-Voyager](https://github.com/APIs-guru/graphql-voyager)
  - [x] [GraphQL-Tools](https://www.graphql-tools.com)
  - [x] [GraphDoc](https://github.com/2fd/graphdoc)
  - [x] [GraphQL-Code-Generator](https://github.com/dotansimha/graphql-code-generator) Generate TypeScript Type Definition From GraphQL Schema / Operations.
  - [x] [GenQL](https://github.com/remorses/genql) Type-Safe GraphQL Query Builder.
- [ ] Example GraphQL Query/Mutation.
- [x] DataLoader.

### Dev

- [x] [GitHub Actions](.github/workflows/server.yml)
- [x] [CommitLint](.commitlintrc.js)
- [x] Git Hooks
- [ ] Tests

## Quick Start

```bash
yarn

# if prisma is nor removed, run this command tp generate prisma client
yarn prisma

# Develop
yarn dev

# Start Server
yarn start

# Stop Server
yarn stop

# Make sure server is running at port 7001
# Commands below requires server to be active

# Generate TypeScript Type-Definition from GraphQL Schema
yarn codegen

# Generate and Serve docs
yarn docs

# Start GraphQL Voyager
yarn voyager
```

If you donot want `Prisma` in your application, just:

- Remove [prisma folder](src/prisma)
- Remove prisma related lines in [configuration.ts](src/configuration.ts)

  ```typescript
  import { PrismaClient } from './prisma/client';

  const client = new PrismaClient();

  // ContainerConfiguration Class Inside
  client.$connect();

  this.app.getApplicationContext().registerObject('prisma', client);

  await client.prismaSampleModel.create({
      data: {
        version: 2,
      },
    });

  client.$disconnect();
  ```

- Remove [PrismaSample ObjectType](src/graphql/prisma.type.ts)
- Remove [PrismaSample Resolver](src/resolvers/prisma.resolver.ts)

First time to try [Prisma](https://www.prisma.io/) ？ Just try:

- `yarn prisma`, which include:
  - `yarn prisma:generate`: Generate Prisma Client from [Prisma Schema](src/prisma/schema.prisma)
  - `yarn prisma:push`: Gnerate SQLite Database with latest schema.
