# Midway-GraphQL-Starter

Enjoy Developing With **MidwayJS** & **GraphQL** !

## Left Works

## Features

- Basic Power of [MidwayJS](https://www.yuque.com/midwayjs/midway_v2)
- TypeORM / Prisma2
- SQLite3
- GraphQL(TypeGraphQL + Apollo-Server)
- Quick-Start Middlewares (**Koa Implementation**): `compress` / `helmet` / `logger` / `static` / ...

### GraphQL Related

- [x] [Apollo-Server V3](https://www.apollographql.com/docs/apollo-server/)
- [x] [TypeGraphQL](https://typegraphql.com/)
- [x] [Prisma 2](https://www.prisma.io/)
- [x] [Custom Directives](src/directives/)
- [x] [Custom Plugins](src/plugins/)
- [x] Extensions(**Deprecated Indeed**)
- [x] Scalars
- [ ] File Uploads
- [x] GraphQL Helper
  - [x] [GraphQL-Voyager](https://github.com/APIs-guru/graphql-voyager) Represent any GraphQL API as an interactive graph.
  - [x] [GraphQL-Tools](https://www.graphql-tools.com) Build, mock, and stitch a GraphQL schema using the schema language
  - [x] [GraphDoc](https://github.com/2fd/graphdoc) Static page generator for documenting GraphQL Schema
  - [x] [GraphQL-Code-Generator](https://github.com/dotansimha/graphql-code-generator) Generate TypeScript Type Definition From GraphQL Schema / Operations.
- [x] Example GraphQL Query/Mutation.
- [x] DataLoader.

## Project Structure

```text
- dist                          ---------- built applications
- documentation                 ---------- generated documentations by GraphDoc
- logs                          ---------- application logs
- sample                        ---------- sample GraphQL queries/mutations
- src                           ---------- application source
  - config                      ---------- application config
  - controller                  ---------- application controllers
  - decorators                  ---------- custom decorators
  - directives                  ---------- custom GraphQL directives
  - dto                         ---------- data transfer objects
  - entities                    ---------- TypeORM entities
  - extensions                  ---------- GraphQL extensions
  - graphql                     ---------- GraphQL type definitions
  - interceptors                ---------- REST/GraphQL interceptors
  - middlewares                 ---------- middlewares
  - plugins                     ---------- Apollo-Server plugins
  - prisma                      ---------- Prisma
  - resolvers                   ---------- TypeGraphQL resolvers
  - scalars                     ---------- custom GraphQL scalars
  - services                    ---------- application services
  - utils                       ---------- utilities
- test                          ---------- integration test cases
- voyager                       ---------- GraphQL-Voyager html file
- typings                       ---------- generated typings
```

### Dev

- [x] [GitHub Actions](.github/workflows/server.yml)
- [x] [CommitLint](.commitlintrc.js)
- [x] Git Hooks
- [ ] Tests

## Quick Start

```bash
yarn

# If prisma is not removed, it's required to run this command before start
yarn prisma

# Develop
yarn dev

# Start Server
yarn start

# Stop Server
yarn stop

# Commands below requires server to be active at port 7001

# Generate TypeScript Type-Definition from GraphQL Schema
yarn codegen

# Generate and Serve docs
yarn docs

# Start GraphQL Voyager
yarn voyager
```

## Remove Prisma

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
