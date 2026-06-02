# Learnings
- Since both api, client lie in the same repository we call this a monorepo.
Frontend(/web) ; Backend(/api) in one Github rep with two seperate deploys.

**Why did we choose Monorepo instead of two seperate repos?**
- Because for a solo porject like this, a monorepo simplifies things - One git clone, one README, shared types etc.

**Deployment pipelines (Netlify + Railway)**

When we push to Github > 
1. Netlify auto-deploys forntend
2. Railway auto-deploys backend
- We have Github-triggered automatic deploys on both Netlify and Railway. When we push to main, Netlify rebuilds the React app and serves it from their CDN, and Railway rebuilds the NestJS service and runs it.
- The frontend gets the backend URL through environment variable.
- *localhost:3000* for dev Railway URL for production. This seperation gives us the plus point to swap hosts based on the environment without changing the code.

**Environment Variables**
1. .env.local for React+Vite
2. .env for Prisma CLI
3. Railway's variable system for production
4. @nestjs/config for NestJS runtime.
NestJS at runtime doesnot read env variables directly so I had to install this package for handling env variables.

@nestjs/config is the official package for managing environment variables and application configurations in the NestJS framework. It provides a robust, type-safe way to load .env files and access their values throughout your application using dependency injection.


## Week-1

#### 1. CORS:
- Browsers have one rule. 
- Javascript loaded from website A cannot read responses from website B, unless website B explicitly says "I'm okay with website A reading any responses."
- Why this rule exists ? Imagine you are logged into your bank at mybank.com in one tab. In another tab, you visit evilsite.com. Without this rule, evilsite's Javascript could secretly make request to https://mybank.com/transfer-money
  And because you are logged in, your browser would send bank cokkies along.
  The bank server, seeing the cookies, would think YOU requested the transfer. Disaster.

- So browsers refuse to let JS on one origin read responses from another origin, by default.
- In our project http://localhost:5173/ , http://localhost:3000/ are two different origins.
- What does **app.enableCors()** does ? When your backend recieves a request, it adds a special header to its response: Access-Control-Allow-Origin: * . That header is the backend's way of saying "I'm fine being called by javascript from any website."

#### 2. Cookies:
- A cookie is a small piece of text the browser stores on behalf of a website. 
- Once stored, the browser automatically sends it back with every future request on that website.
- Concrete example:
    - You log into mybank.com. The bank's server verifies your password and sends back a response that includes something like : Set-Cookie: session_id=abc123xyz.
    - Your browser saves that cookie in its storage, tagged with "this belongs to mybank.com."
    - Five minutes later, you click on "View account balance." The browser makes a request to mybank.com/balance and automatically attaches Cookie: session_id=abc123xyz to the request.
    - The bank's server sees the cookie, looks up "abc123xyz" in its database, finds "this is Nikhitha's session," and shows you your balance.

- That's it. Cookies are the browser's way of remembering "I'm logged in" between page loads, without the user having to type their password every time.
- Why cookies exist: HTTP is stateless. *Every request is independent*. Without cookies, the server would have no way to know that two requests are from the same logged-in user. Cookies are the persistent thread that ties requests together.

- Things to know about cookies:
    - They're sent automatically by the browser. You don't have to do anything in JavaScript to send them; the browser handles it.
    - They're scoped to a domain. A cookie set by mybank.com only gets sent to mybank.com, never to other sites
    - They can hold session IDs (most common), preferences, tracking data, etc.
    - They have a max size of ~4KB each. Tiny.

**app.enableCors() with no arguments allows requests from any origin. That means any website's JavaScript, in anyone's browser, can call your backend and get a response.**
1. Restrict CORS to only allow your frontend.
```js
app.enableCors({
  origin: 'https://prep-tarcker-project.netlify.app'
})
```
Now only your Netlify frontend (in someone's browser) can call your backend. evilsite.com calls would get blocked by the browser before they even reach you.

*But this only stops browser-based attacks. Anyone with curl can still hit your backend, because CORS doesn't apply outside browsers.*

2. Add authentication : There are two common approaches for auth -- Cookies, JWT Tokens stored in local storage.

- CORS = browser-level defense (stops malicious websites)
- Auth (JWT) = universal defense (stops anyone without credentials)


## Week-2

#### 1. Prisma:
- Prisma is an ORM for Node.js + Typescript.
- ORM stands for Object Relational Mapper.
- Object part is JS/TS object.
- Relational part is the SQL database(Postgres,MySQL).
- Mapper is the bridge that translates between them.
- W/O ORM we need to use raw SQL queries.
- With ORM easier to write queries which are easier to understand.
- Works well with NestJS.

**Prisma Client Vs Prisma Service?**
- PrismaClient is the library's class. The actual database client.
- PrismaService is the wrapper class we wrote - extends PrismaClient, adds @Injectable() for NestJS dependency injection. Uses onModuleInit to call $connect() once at startup instead of on every request.
- The wrapper class(PrismaService) gives one shared client across the app, Therefore single connection pool.
- W/O this wrapper class, every service that needs database access would require `new PrismaClient()`, opening multiple connection pools.

## Week-3

#### 1. Post request in api:
- We use @Post() decorator for writing post requests.
- In NestJS it is standard practice to use @Post() without an explicit sub-path like "/create".
- To Create a single record in Prisma we use `prisma.application.create({pass-the-data})`. Here `application` is our table name.
- Special decorators like @IsString() are used to validate the types in dto file.
- And if u observe in dto file, id, status, createdAt, updateAt are not given since they have default values and will be generated by prisma itself.
- To use these @IsString() decorators we need class-validator, class-transform.
- To read these @IsString() decorators, we need ValidationPipe. In main.ts: 
```js
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
```
- With this `useGlobalPipes` every request is checked before it reaches your controller.
- class-validator provides validation decorators such as @IsString() and @IsEmail().
- class-transformer converts plain request objects into DTO instances and performs type transformations.
- ValidationPipe uses both packages to validate and transform incoming requests before they reach the controller.

#### 2. Lifting state up:
- Issue: When a new application is added, POST request happens, Row is saved in DB. Until unless we refresh the page the new list of applications won't be seen(The list of appn's are in Parent component). And using `e.preventDefault()` is correct because without it the page reloads and the state is destroyed.
- Fix : On a new application added we need to tell the parent to re-fetch the list again so the new row appears, without any refresh being required.[Ref - onAdded in AddApplicationForm.tsx]
- This is called **Lifting State Up**
- React Docs Reference : If two components need to communicate, find the closest common ancestor

#### 3. Updating a table in prisma:
- Task: To add a new column 'status' in application table
- Updated the `model Application` in `schema.prisma` file with source column and run the below command
``` js 
npx prisma migrate dev --name {migration_file_name}
```
- Changes will be updated in the application table.
- Instead of running the above command every time, created one script "migrate" in api's package.json, Where the name of the migration will be prompted by the Terminal itself.