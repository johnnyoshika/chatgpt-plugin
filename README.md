Proof-of-concept ChatGPT plugin for instructors who use EXAMIND.

Also in here is leftover todo app that uses SQLite. Ignore all that stuff, as it's unrelated to the ChatGPT plugin.

Built on top of NEXT.js 13's App Router (beta): https://beta.nextjs.org/docs

## Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open Swagger docs to test all API endpoints that ChatGPT will use: [http://localhost:3000/api-doc](http://localhost:3000/api-doc).

View OpenAPI specification that ChatGPT will use: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

## examind-web

Run [examind-web](https://github.com/examind-ai/examind-web) locally

## Install ChatGPT Plugin

From [ChatGPT's UI](https://chat.openai.com/chat):

- Choose the `Plugins [ALPHA]` model
- Open `Plugin store`
- Open `Develop your own plugin`
- In domain, enter `localhost:3000`, then click `Find manifest file`

## Prompt for ChatGPT

After installing plugin, use these prompts in ChatGPT UI:

> My instructor email is de@email.com. Show my active assessments in EXAMIND.

Wait for response

> Show stats for {assessment title}

Wait for response

> Use table format

Wait for response

> Which students took that assessment?

Wait for response

> Who scored the highest?

Wait for response

> Show me question by question breakdown for {student}

Wait for response

> {question} score looks wrong. Adjust points to 5.

Wait for response

> Now 100.

Wait for response

> Now which student scored the highest?

Wait for response
