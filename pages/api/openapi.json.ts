import { withSwagger } from 'next-swagger-doc';

// Couldn't get this to work in 'app, so adding this to 'pages'
const swaggerHandler = withSwagger({
  apiFolder: '/app/api',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EXAMIND Assessment ChatGPT Plugin',
      description: `A plugin that allows an instructor to view information about active assessments, including statistics and student attempts and scores. If the instructor doesn't like the points given for a particular student and question, and adjustment can be posted. Always ask the instructor for their email before making queries.`,
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
