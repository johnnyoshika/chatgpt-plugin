Sample ChatGPT plugin: https://platform.openai.com/docs/plugins/examples

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

Open [http://localhost:3000](http://localhost:3000).

## Install ChatGPT Plugin

From [ChatGPT's UI](https://chat.openai.com/chat):

- Choose the `Plugins [ALPHA]` model
- Open `Plugin store`
- Open `Develop your own plugin`
- In domain, enter `localhost:3000`, then click `Find manifest file`
