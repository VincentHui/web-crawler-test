import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import PageResolver from "./resolvers/PageResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PageResolver],
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}
// TestCrawl("https://www.iban.com/exchange-rates");
bootstrap();
