import Swagger from 'swagger-client';

export default async function () {
  const client = await Swagger(process.env.SWAGGER_API_URL);
  return client.apis.app;
}
