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
            title: 'EXAMIND Assessment ChatGPT Plugin',
            description: `A plugin that allows an instructor to view information about active assessments, including statistics and student attempts and scores. If the instructor doesn't like the points given for a particular student and question, and adjustment can be posted. Always ask the instructor for their email before making queries.`,
            version: '1.0',
          },
        },
      })}
    />
  );
}

export default ApiDocPage;
