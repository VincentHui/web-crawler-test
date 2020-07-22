import "reflect-metadata";
import { collectInternalLinks, getContentFromPage } from "../crawler";

it("get link tests", async () => {
  const links = collectInternalLinks(`<a href=/contact> Contact </a>`);
  expect(links.length).toEqual(1);
  const MultipleLinks = collectInternalLinks(
    `<a href=/contact> Contact </a> <a href=/contact> Contact </a> <a href=/contact> Contact </a> <a href=/contact> Contact </a>`,
  );
  expect(MultipleLinks.length).toEqual(4);
  const EmptyLinks = collectInternalLinks(``);
  expect(EmptyLinks.length).toEqual(0);
});

it("get content from page tests", async () => {
  const url = `https://www.URL-THAT-IS-NOT-REAL.com`;
  const result = await getContentFromPage(url);
  expect(result).toHaveProperty("error");
  expect(result.url).toEqual(url);
  //need to replace this with mocked fixtures of html
  const googleUrl = `https://www.google.com`;
  const googleResult = await getContentFromPage(googleUrl);
  expect(googleResult).not.toHaveProperty("error");
  expect(googleResult).toHaveProperty("content");
  expect(googleResult.url).toEqual(googleUrl);
  expect(googleResult.content.links.length).toBeGreaterThan(0);
});
