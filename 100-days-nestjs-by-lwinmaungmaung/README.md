# NestJS - 100 Days (By Sir.Lwin Maung Maung)

This repository contains my notes and projects from the "100 Days of NestJS" course by Sir Lwin Maung Maung. The course covers various aspects of NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Daily Notes

### Day 1 : Pilot

```bash
$ npm i -g @nestjs/cli
$ nest new <project-name>
```

```--strict``` flag for typescript support

```bash
$ cd tester
$ npm run start

> tester@0.0.1 start
> nest start
```

Open [http://localhost:3000/](http://localhost:3000/) in your browser to see the default NestJS welcome page.

```structure
src
|- app.controller.spec.ts   > The unit tests for the controller.
|- app.controller.ts        > A basic controller with a single route.
|- app.module.ts            > The root module of the application.
|- app.service.ts           > A basic service with a single method.
|- main.ts                  > The entry file of the application which uses the core function NestFactory to create a Nest application instance.
```

#### Platform

1. platform-express
2. platform-fastify

To watch for changes in your files, you can run the following command to start the application:

```bash
$ npm run start:dev
```

#### Linting and formatting

```bash
# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```

#### Testing

```bash
# Run unit tests
$ npm run test
# Run end-to-end tests
$ npm run test:e2e
# Run test with watch mode
$ npm run test:watch
# Generate code coverage
$ npm run test:cov
```
