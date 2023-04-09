import { withSwagger } from 'next-swagger-doc';

// Couldn't get this to work in 'app, so adding this to 'pages'
const swaggerHandler = withSwagger({
  apiFolder: '/app/api',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO Plugin',
      description: `A plugin that allows the user to create and manage a TODO list using ChatGPT. If you do not know the user's username, ask them first before making queries to the plugin. Otherwise, use the username "global".`,
      version: '1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    // 'components' with empty object gets added automatically by withSwagger, override it with 'schemas'
    components: {
      schemas: {}, // ChatGPT complains if 'schemas' is missing from 'components'
    },
  },
});
export default swaggerHandler();
