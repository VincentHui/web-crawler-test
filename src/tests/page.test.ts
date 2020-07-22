import "reflect-metadata";
import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import Maybe from "graphql/tsutils/Maybe";
import PageResolver from "../resolvers/PageResolver";

const createSchema = () =>
  buildSchema({
    resolvers: [PageResolver],
  });
interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}
const graphCall = async ({ source, variableValues }: Options) =>
  graphql({
    schema: await createSchema(),
    source,
    variableValues,
  });

const queryAll = `   
{
  crawl(url: "https://www.URL-THAT-IS-NOT-REAL.com", onePage: false) {
    error
  }
}
`;

it("get url that doesn't exist", async () => {
  const response = await graphCall({
    source: queryAll,
  });
  expect(response.data).toMatchObject({
    crawl: [
      {
        error: "getaddrinfo ENOTFOUND www.url-that-is-not-real.com www.url-that-is-not-real.com:443",
      },
    ],
  });
});

const googleQuery = `
{
  crawl(url: "https://www.google.com", onePage: true) {
    url,
    content{
      links
    }
  }
}
`;
it("google url one page", async () => {
  const response = await graphCall({
    source: googleQuery,
  });
  expect(response.data!.crawl.length).toEqual(1);
  expect(response.data!.crawl[0]).toHaveProperty("url");
  expect(response.data!.crawl[0]).toHaveProperty("content");
  expect(response.data!.crawl[0].content.links.length).toBeGreaterThan(1);
});
