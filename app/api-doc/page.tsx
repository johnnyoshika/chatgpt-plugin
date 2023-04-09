import { createSwaggerSpec } from 'next-swagger-doc';
import ReactSwagger from './ReactSwagger';

async function ApiDocPage() {
  return (
    <ReactSwagger
      spec={createSwaggerSpec({
        apiFolder: '/app/api',
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'TODO Plugin',
            description: `A plugin that allows the user to create and manage a TODO list using ChatGPT. If you do not know the user's username, ask them first before making queries to the plugin. Otherwise, use the username "global".`,
            version: '1.0',
          },
        },
      })}
    />
  );
}

export default ApiDocPage;
