# NestJS - 100 Days (By Sir.Lwin Maung Maung)

This repository contains my notes and projects from the "100 Days of NestJS" course by Sir Lwin Maung Maung. The course covers various aspects of NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Daily Notes

### Day 1 : Pilot

```bash
# Install NestJS CLI globally
$ npm i -g @nestjs/cli

# Create a new NestJS project
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
# Development mode with watch mode
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

### Day 2 : Request, Response & Http

#### Create a controller using the CLI

```bash
# a CRUD controller with built-in validation
$ nest g resource [name]

# a controller without built-in
$ nest g controller [name]
```

Resource - [cats resource](./tester/src/cats-resource/)

- In Resource, all requirements ([dto](./tester/src/cats-resource/dto/), [entities](./tester/src/cats-resource/entities/), [controller](./tester/src/cats-resource/cats-resource.controller.ts)(with [testing](./tester/src/cats-resource/cats-resource.controller.spec.ts)), [module](./tester/src/cats-resource/cats-resource.module.ts) and [service](./tester/src/cats-resource/cats-resource.service.ts)(with [testing](./tester/src/cats-resource/cats-resource.service.spec.ts))) are already created.

Controller - [cats controller](./tester/src/cats/)

- In Controller, only [controller](./tester/src/cats/cats.controller.ts) and its [testing](./tester/src/cats/cats.controller.spec.ts) include. Other requirements setup manually.

***Learn more about Controllers***

- [Controllers - NestJS Documentation](https://docs.nestjs.com/controllers)

Controllers are responsible for handling incoming requests and sending responses back to the client.
They define routes and map them to specific handler methods.
Each controller is decorated with the `@Controller()` decorator, which can optionally take a route prefix as an argument.
Handler methods within controllers are decorated with HTTP method decorators such as `@Get()`, `@Post()`, `@Put()`, `@Delete()`, etc., to specify the type of request they handle.

In [cats controller](./tester/src/cats/cats.controller.ts/) -

```typescript
import { Controller } from '@nestjs/common';

@Controller('cats')
export class CatsController {}
```

In the above example, the `CatsController` is decorated with `@Controller('cats')`, which means that all routes defined within this controller will be prefixed with `/cats`.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

In this example, the `findAll` method is decorated with `@Get()`, indicating that it handles GET requests to the `/cats` route. When a client sends a GET request to `/cats`, the `findAll` method will be invoked, returning the string 'This action returns all cats'.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

In the above test file, we are using NestJS's testing utilities to create a testing module that includes the `CatsController`. The `beforeEach` block sets up the testing environment before each test case runs. The test case checks if the controller is defined.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of cats', () => {
    expect(controller.findAll()).toBe('This action returns all cats');
  });
});
```

In this updated test file, we have added a new test case that checks if the `findAll` method of the `CatsController` returns the expected string 'This action returns all cats'. This ensures that the controller's functionality is working as intended.

```typescript
  @Get('breed')
  findBreeds(): string {
    return "This action returns all cats' breeds";
  }
```

In this example, we have added another handler method `findBreeds` decorated with `@Get('breed')`. This method will handle GET requests to the `/cats/breed` route and return the string "This action returns all cats' breeds".

```typescript
  it("should return a list of cats' breed", () => {
    expect(controller.findBreeds()).toBe(
      "This action returns all cats' breeds",
    );
  });
```

In this test case, we are checking if the `findBreeds` method of the `CatsController` returns the expected string "This action returns all cats' breeds". This ensures that the new functionality added to the controller is also working as intended.

Nest uses two different options for manipulating responses:

1. Standard (recommended)

    - When a handler returns a JS object or array, it's auto-serialized to JSON.
    - For primitives like string, number, or boolean, just the value is sent without serialization.
    - This keeps response handling straightforward: return the value, Nest handles the rest.
    - Default status codes: 200 for most requests, 201 for POST.
    - To customize status, use the `@HttpCode(...)` decorator on the handler (refer to Status codes section).

2. Library-specific

    We can use the library-specific (e.g., Express) response object by injecting it with the `@Res()` decorator in the method handler signature (e.g., `findAll(@Res() response)`). This allows using native response handling methods, like `response.status(200).send()` for Express.

    ````typescript
    import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
    import { Request, Response } from 'express';

    @Controller('cats')
    export class CatsController {
        @Get('test-request-object')
        testRequestObject(@Req() request: Request): string {
            return `This action tests request object: method=${request.method}, url=${request.url}`;
        }

        @Get('test-request-response-object')
        testRequestObject(@Req() req: Request, @Res() res: Response) {
            res.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            message: `This action tests request object: method=${req.method}, url=${req.url}`,
            });
        }
    }
    ```

    In this example, we have added a new handler method `testRequestObject` decorated with `@Get('test-request-object')`. This method injects the native Express `Request` object using the `@Req()` decorator. When a client sends a GET request to `/cats/test-request-object`, the method will be invoked, and you can use the `request` object to access request details.
    In the second method `testRequestObject`, we inject both the `Request` and `Response` objects. This allows us to use the native Express response handling methods to send a custom response back to the client.


```typescript
  import { Post } from '@nestjs/common';

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
```

In this example, we have added a new handler method `create` decorated with `@Post()`. This method will handle POST requests to the `/cats` route and return the string 'This action adds a new cat'.

```typescript
  it('should create a new cat', () => {
    expect(controller.create()).toBe('This action adds a new cat');
  });
```

In this test case, we are checking if the `create` method of the `CatsController` returns the expected string 'This action adds a new cat'. This ensures that the new functionality added to the controller is also working as intended.

```typescript
  // WARN [LegacyRouteConverter] Unsupported route path: "/cats/abcd/*". In previous versions, the symbols ?, *, and + were used to denote optional or repeating path parameters. The latest version of "path-to-regexp" now requires the use of named parameters. For example, instead of using a route like /users/* to capture all routes starting with "/users", you should use /users/*path. For more details, refer to the migration guide. Attempting to auto-convert...
  // Route wildcards
  @Get('abcd/*')
  findWildcard(): string {
    return 'This action handles wildcard routes';
  }
```

In this example, we have added a new handler method `findWildcard` decorated with `@Get('abcd/*')`. This method will handle GET requests to any route that does not match the previously defined routes within the `CatsController`. It returns the string 'This action handles wildcard routes'.

```typescript
  it('should handle wildcard routes', () => {
    expect(controller.findWildcard()).toBe(
      'This action handles wildcard routes',
    );
  });
```

In this test case, we are checking if the `findWildcard` method of the `CatsController` returns the expected string 'This action handles wildcard routes'. This ensures that the new functionality added to the controller is also working as intended.

```typescript
  import { Get, HttpCode } from '@nestjs/common';
  
  @Get('http-status')
  @HttpCode(404)
  getHttpStatus(): string {
    return 'This action returns a 404 status code';
  }
```

In this example, we have added a new handler method `getHttpStatus` decorated with `@Get('http-status')` and `@HttpCode(404)`. This method will handle GET requests to the `/cats/http-status` route and return the string 'This action returns a 404 status code'. The `@HttpCode(404)` decorator sets the HTTP response status code to 404 for this route.

```typescript
  it('should return a 404 status code', () => {
    expect(controller.getHttpStatus()).toBe(
      'This action returns a 404 status code',
    );
  });
```

In this test case, we are checking if the `getHttpStatus` method of the `CatsController` returns the expected string 'This action returns a 404 status code'. This ensures that the new functionality added to the controller is also working as intended.

```typescript
  import { Get, Header } from '@nestjs/common';

  @Get('response-header')
  @Header('Cache-Control', 'no-store')
  getResponseHeader(): string {
    return 'This action handles Cache Control as no-store with response header';
  }
```

In this example, we have added a new handler method `getResponseHeader` decorated with `@Get('response-header')` and `@Header('Cache-Control', 'no-store')`. This method will handle GET requests to the `/cats/response-header` route and return the string 'This action handles Cache Control as no-store with response header'. The `@Header('Cache-Control', 'no-store')` decorator sets the `Cache-Control` response header to `no-store` for this route.

```typescript
  it('should handle Cache Control as no-store with response header', () => {
    expect(controller.getResponseHeader()).toBe(
      'This action handles Cache Control as no-store with response header',
    );
  });
```

In this test case, we are checking if the `getResponseHeader` method of the `CatsController` returns the expected string 'This action handles Cache Control as no-store with response header'. This ensures that the new functionality added to the controller is also working as intended.

```typescript
  import { Get, Redirect, Query } from '@nestjs/common';

  @Get('redirect-to-nestjs')
  @Redirect('https://nestjs.com', 301)
  getDocs(@Query('version') version: any) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
```

In this example, we have added a new handler method `getDocs` decorated with `@Get('redirect-to-nestjs')` and `@Redirect('https://nestjs.com', 301)`. This method will handle GET requests to the `/cats/redirect-to-nestjs` route. By default, it redirects the client to 'https://nestjs.com' with a 301 status code. However, if a query parameter `version` is provided with the value '5', it redirects to 'https://docs.nestjs.com/v5/' instead.

```typescript
  it('should redirect to NestJS website', () => {
    const redirectResult = controller.getDocs(undefined);
    expect(redirectResult).toEqual({ url: 'https://nestjs.com' });

    const redirectResultV5 = controller.getDocs('5');
    expect(redirectResultV5).toEqual({ url: 'https://docs.nestjs.com/v5/' });
  });
```

In this test case, we are checking if the `getDocs` method of the `CatsController` behaves as expected. When called without any parameters, it should return an object with the URL 'https://nestjs.com'. When called with the parameter '5', it should return an object with the URL 'https://docs.nestjs.com/v5/'. This ensures that the redirection functionality added to the controller is working as intended.

```typescript
  import { Get, Param } from '@nestjs/common';

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
```

In this example, we have added a new handler method `findOne` decorated with `@Get(':id')`. This method will handle GET requests to the `/cats/:id` route, where `:id` is a dynamic parameter representing the ID of a cat. The method retrieves the value of the `id` parameter using the `@Param('id')` decorator and returns a string that includes the cat's ID.

```typescript
  it('should return a cat by id', () => {
    const catId = '123';
    expect(controller.findOne(catId)).toBe(`This action returns a #${catId} cat`);
  });
```

In this test case, we are checking if the `findOne` method of the `CatsController` returns the expected string when provided with a specific cat ID. We use the cat ID '123' in this example, and the test verifies that the method returns the string 'This action returns a #123 cat'. This ensures that the dynamic parameter functionality added to the controller is working as intended.

```typescript
  import { Get } from '@nestjs/common';
  import { Observable, of } from 'rxjs';

  @Get()
  async asynchronous(): Promise<any[]> {
    return await Promise.resolve([]);
  }

  @Get()
  observableStreams(): Observable<any[]> {
    return of([]);
  }
```

In this example, we have added two new handler methods: `asynchronous` and `observableStreams`.
The `asynchronous` method is decorated with `@Get()` and returns a Promise that resolves to an empty array. This method demonstrates how to handle asynchronous operations in a controller.
The `observableStreams` method is also decorated with `@Get()` and returns an Observable that emits an empty array. This method demonstrates how to work with observable streams in a controller.

```typescript
  it('should return an empty array asynchronously', async () => {
    const result = await controller.asynchronous();
    expect(result).toEqual([]);
  });

  it('should return an empty array as an observable stream', (done) => {
    const observable = controller.observableStreams();
    observable.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });
```

In these test cases, we are checking the functionality of the `asynchronous` and `observableStreams` methods of the `CatsController`.
The first test case verifies that the `asynchronous` method returns an empty array when awaited.
The second test case verifies that the `observableStreams` method emits an empty array when subscribed to. The `done` callback is used to signal the completion of the asynchronous test.

```typescript
  import { Post, Body } from '@nestjs/common';
  import { CreateCatDto } from './dto/create-cat.dto';

  @Post()
  requestPayloads(@Body() CreateCatDto: CreateCatDto) {
    return `This action adds a new cat by ${JSON.stringify(CreateCatDto)}`;
  }
```

In this example, we have added a new handler method `requestPayloads` decorated with `@Post()`. This method will handle POST requests to the `/cats` route. It uses the `@Body()` decorator to extract the request payload and map it to an instance of the `CreateCatDto` class. The method then returns a string that includes the JSON representation of the `CreateCatDto` object.

```typescript
  it('should add a new cat with request payloads', () => {
    const createCatDto = { name: 'Whiskers', age: 3, breed: 'Siamese' };
    expect(controller.requestPayloads(createCatDto)).toBe(
      `This action adds a new cat by ${JSON.stringify(createCatDto)}`,
    );
  });
```

In this test case, we are checking if the `requestPayloads` method of the `CatsController` correctly processes the request payload and returns the expected string. We create a sample `createCatDto` object representing a new cat and verify that the method returns the string that includes the JSON representation of this object. This ensures that the request payload handling functionality added to the controller is working as intended.

```typescript
  import { Get, Query } from '@nestjs/common';

  @Get('query-parameters')
  queryParameter(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }
```

In this example, we have added a new handler method `queryParameter` decorated with `@Get('query-parameters')`. This method will handle GET requests to the `/cats/query-parameters` route. It uses the `@Query()` decorator to extract query parameters `age` and `breed` from the request URL. The method then returns a string that includes the values of these query parameters.

```typescript
  it('should return cats filtered by query parameters', () => {
    const age = 2;
    const breed = 'Persian';
    expect(controller.queryParameter(age, breed)).toBe(
      `This action returns all cats filtered by age: ${age} and breed: ${breed}`,
    );
  });
```

In this test case, we are checking if the `queryParameter` method of the `CatsController` correctly processes the query parameters and returns the expected string. We provide sample values for `age` and `breed`, and verify that the method returns the string that includes these values. This ensures that the query parameter handling functionality added to the controller is working as intended.

### Day 3 : Service, Interface & Modules

#### Create a service using the CLI

```bash
# a CRUD service with built-in validation
$ nest g resource [name]

# a service without built-in
$ nest g service [name]
```

Service - [cat service](./tester/src/cats/)

- In Service, only [service](./tester/src/cats/cats.service.ts) and its [testing](./tester/src/cats/cats.service.spec.ts) include. Other requirements setup manually.

***Learn more about Service***

- [Service - NestJS Documentation](https://docs.nestjs.com/providers#services)

Services are classes that encapsulate business logic and data access in a NestJS application. They are typically used to handle operations such as data retrieval, manipulation, and storage. Services are decorated with the `@Injectable()` decorator, which allows them to be injected into other components, such as controllers or other services.

In [cats service](./tester/src/cats/cats.service.ts/) -

Before update service, we need to create an cat interface. So,

```typescript
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

First, cats variable declare as private readonly with Cat[] type and empty array value.
And then, create 2 functions for create(push one cat to cats array) and findAll(return cats array).

***connect controller with service***

First, add cat service constructor into cat controller class

```typescript
constructor(private catsService: CatsService) {}
```

and then use service's function with ```this.catsService.[func_name]()```

```typescript
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // return []

  @Post()
    async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  } 
```

In this example, we are injecting the `CatsService` into the `CatsController` using the constructor. This allows the controller to access the methods defined in the service. The `findAll` method in the controller calls the `findAll` method from the service to retrieve all cats, while the `create` method calls the `create` method from the service to add a new cat.

***Dependency injection***

- Dependency Injection (DI) is a design pattern used to organize and share code across an application. - [Dependency injection in Angular](https://angular.dev/guide/di)
- Dependency Injection ဆိုရင် ပထမဆုံး စရှင်းရမှာ က dependency ပါ။ Dependency ဆိုတာ တခုက တခုအပေါ်မှာ မှီခိုနေတယ်၊ ဥပမာ ကားသည် အင်ဂျင်မပါပဲနဲ. အလုပ်လုပ်လို.မဖြစ်ဘူး၊ အဲ့တော့ကားသည် engine အပေါ် depends ဖြစ်နေတယ် dependency ရှိနေတယ်ပေါ့၊ - [Dependency injection by Sir Thet Khine](https://www.facebook.com/share/p/16pzJR9f9v/)

***Optional providers***

```typescript
import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

In this example, the `HttpService` class has a constructor that takes an optional dependency `httpClient`. The `@Optional()` decorator indicates that this dependency is not required for the service to function. If the dependency is not provided, it will be `undefined`. The `@Inject('HTTP_OPTIONS')` decorator specifies the token used to resolve the dependency from the NestJS dependency injection container.

***Property-based injection***

```typescript
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

In this example, the `HttpService` class uses property-based injection to inject the `httpClient` dependency. The `@Inject('HTTP_OPTIONS')` decorator is applied directly to the `httpClient` property, indicating that this property should be populated with the dependency resolved from the NestJS dependency injection container using the specified token. The `httpClient` property is marked as `private readonly`, meaning it can only be accessed within the class and cannot be modified after initialization.

***Difference between Constructor-based injection and Property-based injection***

- Constructor-based injection requires dependencies to be provided when the class is instantiated, while Property-based injection allows dependencies to be injected directly into class properties after instantiation.
- Constructor-based injection makes dependencies explicit in the class's constructor signature, while Property-based injection keeps dependencies hidden within the class properties.
- Constructor-based injection is generally preferred for mandatory dependencies, while Property-based injection can be useful for optional dependencies or when dealing with circular dependencies.

#### Create a module using the CLI

```bash
# a CRUD module with built-in validation
$ nest g resource [name]

# a module without built-in
$ nest g module [name]
```

Module - [cat module](./tester/src/cats/)

- In Module, only [module](./tester/src/cats/cats.module.ts). Other requirements setup manually.

***Learn more about Module***

- [Modules - NestJS Documentation](https://docs.nestjs.com/modules)

Modules are used to organize the application structure in NestJS. They group related components, such as controllers and providers (services), into cohesive units. Each module is defined using the `@Module()` decorator, which takes an object with properties like `imports`, `controllers`, `providers`, and `exports`.

In [cats module](./tester/src/cats/cats.module.ts/) -

```typescript
import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

In this example, the `CatsModule` is defined using the `@Module()` decorator. It imports the `CatsController` and `CatsService`, making them part of the module. The `providers` array registers the `CatsService` as a provider, allowing it to be injected into other components within the module. The `exports` array makes the `CatsService` available for use in other modules that import the `CatsModule`. The `@Global()` decorator indicates that this module is a global module, meaning its providers will be available across the entire application without needing to import the module explicitly in other modules.

***Importing Modules***
To use the `CatsModule` in the main application module (`AppModule`), you need to import it as follows:

```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

In this example, the `CatsModule` is imported into the `AppModule` using the `imports` array. This allows the components defined in the `CatsModule`, such as the `CatsController` and `CatsService`, to be used within the main application module.

### Day 4 : Middleware, Exception filters

***What is Middleware?***

- Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
- Middleware functions can perform the following tasks:
  - Execute any code.
  - Make changes to the request and the response objects.
  - End the request-response cycle.
  - Call the next middleware function in the stack.
  - If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

***Learn more about Middleware***

- [Middleware - NestJS Documentation](https://docs.nestjs.com/middleware)

In [logger middleware](./tester/src/logger.middleware.ts) -

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

In this example, we define a middleware class `LoggerMiddleware` that implements the `NestMiddleware` interface. The `use` method is called for each incoming request. It logs 'Request...' to the console and then calls `next()` to pass control to the next middleware function in the stack.

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats/', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats/{*cat_id}', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}
```

In this example, we configure the `LoggerMiddleware` to be applied to specific routes in the `AppModule`.
The first line applies the middleware to all routes under the 'cats' path.
The second line applies the middleware specifically to GET requests on the 'cats/' path. This ensures that the middleware is executed for requests matching these routes.
The third line applies the middleware to GET requests on any route that matches the pattern 'cats/{*cat_id}', allowing for dynamic cat IDs.
The fourth block demonstrates how to exclude the middleware from being applied to POST requests on the 'cats' path while still applying it to all other routes defined in the `CatsController`. This provides flexibility in controlling where the middleware is executed within the application.

***Global Middleware***

```typescript
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request... Method: ${req.method}, URL: ${req.originalUrl}`);
  next();
}
```

In this example, we define a global middleware function `LoggerMiddleware` that logs the HTTP method and URL of each incoming request. It takes the `req`, `res`, and `next` parameters, logs the request details to the console, and then calls `next()` to pass control to the next middleware function in the stack.

To apply middleware globally across the entire application, you can use the `app.use()` method in the `main.ts` file.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware); // Global Middleware
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err: any) => {
  console.error('Error during application bootstrap:', err);
});
```

In this example, the `LoggerMiddleware` is applied globally to all incoming requests in the application. By calling `app.use(LoggerMiddleware)`, every request will pass through the `LoggerMiddleware`, allowing it to log 'Request...' for each request before proceeding to the next middleware or route handler. This approach ensures that the middleware is consistently applied across all routes in the application.

***Exception Filters***

- Exception filters are used to handle exceptions thrown in your application. They provide a way to catch and process errors, allowing you to return custom responses to the client.

***Learn more about Exception Filters***

- [Exception Filters - NestJS Documentation](https://docs.nestjs.com/exception-filters)

```typescript
  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to fetch cats',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
```

In this example, the `findAll` method in the `CatsController` attempts to retrieve all cats using the `catsService`. If an error occurs during this process, it catches the error and throws a new `HttpException`. The exception includes a custom error message 'Unable to fetch cats' and sets the HTTP status code to 500 (Internal Server Error). The original error is passed as the cause of the exception for further debugging if needed. This allows for graceful error handling and provides meaningful feedback to the client when an error occurs.

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('FORBIDDEN', HttpStatus.FORBIDDEN);
  }
}
```

In this example, we define a custom exception class `ForbiddenException` that extends the built-in `HttpException` class from NestJS. The constructor of the `ForbiddenException` class calls the parent constructor with a custom error message 'FORBIDDEN' and sets the HTTP status code to 403 (Forbidden). This custom exception can be thrown in the application whenever a forbidden access scenario occurs, providing a clear and consistent way to handle such errors.

```typescript
import { BadRequestException } from '@nestjs/common';
import { ForbiddenException } from 'src/forbidden.exception';

  @Get('breed')
  findBreeds(): string {
    throw new ForbiddenException;
    throw new BadRequestException('Bad Request Exception', {
      cause: new Error(),
      description: 'Bad Request',
    });
    return "This action returns all cats' breeds";
  }
```

In this example, the `findBreeds` method in the `CatsController` demonstrates how to throw custom exceptions. It first throws a `ForbiddenException`, which we defined earlier, indicating that access to this route is forbidden. Following that, it throws a `BadRequestException`, which is a built-in exception in NestJS. The `BadRequestException` includes a custom error message 'Bad Request', along with additional options such as the cause of the error and a description. This allows for clear and specific error handling within the controller method, providing meaningful feedback to the client when an error occurs.

- In [exception filter](./tester/src/http-exception.filter.ts) -

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

In this example, we define a custom exception filter `HttpExceptionsFilter` that implements the `ExceptionFilter` interface. The `@Catch(HttpException)` decorator indicates that this filter will handle exceptions of type `HttpException`. The `catch` method is called whenever an `HttpException` is thrown in the application. It retrieves the HTTP context using `host.switchToHttp()`, extracts the response and request objects, and gets the status code from the exception. Finally, it sends a JSON response to the client with the status code, current timestamp, and request URL. This custom exception filter allows for consistent error handling and provides meaningful feedback to the client when an HTTP exception occurs.

```typescript
import { Get, UseFilters } from '@nestjs/common';
import { HttpExceptionsFilter } from 'src/http-exception.filter';
import { ForbiddenException } from 'src/forbidden.exception';

  @Get('breed')
  @UseFilters(HttpExceptionsFilter)
  findBreeds(): string {
    throw new ForbiddenException;
    return "This action returns all cats' breeds";
  }
```

In this example, the `findBreeds` method in the `CatsController` is decorated with the `@UseFilters(HttpExceptionsFilter)` decorator. This indicates that the `HttpExceptionsFilter` will be applied to this specific route. When the `findBreeds` method is called, it throws a `ForbiddenException`, which will be caught by the `HttpExceptionsFilter`. The filter will then handle the exception and send a JSON response to the client with the appropriate status code, timestamp, and request URL. This allows for consistent error handling for exceptions thrown within this route.

```typescript
@Controller()
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

In this example, the `CatsController` class is decorated with the `@UseFilters(new HttpExceptionFilter())` decorator. This indicates that the `HttpExceptionFilter` will be applied to all routes within the `CatsController`. Any exceptions thrown in the controller's methods will be caught by the `HttpExceptionFilter`, allowing for consistent error handling across all routes in the controller. This approach ensures that any HTTP exceptions are processed uniformly, providing meaningful feedback to the client when errors occur.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

In this example, the `HttpExceptionFilter` is applied globally to the entire application using the `app.useGlobalFilters()` method. This means that any exceptions thrown in any controller or service within the application will be caught by the `HttpExceptionFilter`. This approach ensures consistent error handling across the entire application, providing meaningful feedback to the client whenever an HTTP exception occurs.

***Catch Everything Filter***

```typescript
import { HttpAdapterHost } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
```

This filter catches all exceptions in your NestJS application. It uses the `HttpAdapterHost` to access the underlying HTTP adapter, determines the status code, and sends a consistent error response with status, timestamp, and request path.

#### Day 5 : Pipes

***What is Pipe?***

- Pipes operate on the arguments being processed by a controller route handler. They have two typical use cases: transformation and validation.

***Learn more about Pipes***

- [Pipes - NestJS Documentation](https://docs.nestjs.com/pipes)

```typescript
  @Get('cat_id/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    @Query('id', ParseIntPipe)
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
```

In this example, the `findOne` method in the `CatsController` uses the `ParseIntPipe` to validate and transform the `id` parameter from both the route parameter and query parameter. The `ParseIntPipe` converts the incoming string value to an integer. If the conversion fails, it throws an exception with a status code of 406 (Not Acceptable) as specified in the options. This ensures that the `id` parameter is always a valid integer before being passed to the service method for further processing.

***Custom pipes***

- [custom pipe - validate cat age](./tester/src/Validation/validation.pipe.ts)

```typescript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return value;
  }
}
```

In this example, we define a custom pipe `ValidationPipe` that implements the `PipeTransform` interface. The `transform` method is called whenever the pipe is applied to a route handler parameter. It takes the incoming `value` and `metadata` as arguments. In this basic implementation, the method simply returns the original value without any transformation or validation. However, you can extend this method to include custom validation logic or data transformation as needed for your application.

```typescript
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue: any = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation Failed');
    }
  }
}
```

In this example, we define a custom pipe `ZodValidationPipe` that implements the `PipeTransform` interface. The constructor takes a `ZodSchema` as an argument, which is used for validation. The `transform` method attempts to parse the incoming `value` using the provided schema. If the parsing is successful, it returns the parsed value. If the parsing fails, it throws a `BadRequestException` with the message 'Validation Failed'. This pipe can be used to validate incoming data against a defined schema before it reaches the route handler.

##### Day 6 : Guards

***What is Guard?***

- Guards are used to determine whether a request should be handled by the route handler or not. They are typically used for authentication and authorization purposes.

***Learn more about Guards***

- [Guards - NestJS Documentation](https://docs.nestjs.com/guards)

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

In this example, we define a custom guard `AuthGuard` that implements the `CanActivate` interface. The `canActivate` method is called for each incoming request to determine whether the request should be allowed to proceed to the route handler. It retrieves the request object from the execution context and calls a hypothetical `validateRequest` function to perform authentication or authorization checks. The method returns a boolean value, a Promise that resolves to a boolean, or an Observable that emits a boolean, indicating whether the request is allowed or denied.

***Using Guards in Controllers***

```typescript
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```

In this example, the `CatsController` class is decorated with the `@UseGuards(RolesGuard)` decorator. This indicates that the `RolesGuard` will be applied to all routes within the `CatsController`. Any incoming requests to the controller's methods will first pass through the `RolesGuard`, which will determine whether the request should be allowed to proceed based on the defined authorization logic. This approach ensures that access control is consistently enforced across all routes in the controller.

### Day 7 : Interceptors

***What is Interceptor?***

- Interceptors are used to intercept and modify the request and response objects. They can be used for logging, caching, transforming data, and more.

***Learn more about Interceptors***

- [Interceptors - NestJS Documentation](https://docs.nestjs.com/interceptors)

```typescript
