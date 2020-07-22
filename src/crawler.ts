import axios from "axios";
import * as cheerio from "cheerio";
import Page, { Content } from "./schemas/Page";
import { Field, ArgsType } from "type-graphql";

export async function getContentFromPage(url: string): Promise<Page> {
  const urlObj = new URL(url);
  const baseUrl = urlObj.protocol + "//" + urlObj.hostname;
  const content = new Content();
  try {
    const result = await axios.get(url);
    if (result.status === 200) {
      const html = result.data;
      content.links.push(
        ...collectInternalLinks(html).reduce<string[]>((acc: string[], current: string) => {
          acc.push(baseUrl + current);
          return acc;
        }, []),
      );
    }
  } catch (error) {
    return { url, error: error.message, content: { links: [] } };
  }
  return { url, content };
}

@ArgsType()
export class CrawlOptions {
  @Field(type => Boolean)
  onePage = false;
}

export async function TestCrawl(startUrl: string, options: CrawlOptions = { onePage: false }): Promise<Page[]> {
  const Visited: Page[] = [];
  const urlsLeft: string[] = [startUrl];
  while (urlsLeft.length > 0) {
    const url = urlsLeft.pop()!;
    if (Visited.find(page => page.url === url)) continue;
    const page = await getContentFromPage(url);
    Visited.push(page);
    if (options.onePage) continue;
    urlsLeft.push(...page.content.links);
  }
  return Visited;
}

export function collectInternalLinks(html: string): string[] {
  const $ = cheerio.load(html);
  const allRelativeLinks: string[] = [];
  const relativeLinks = $("a[href^='/']");
  relativeLinks.each((index, element) => {
    const link: string | undefined = $(element).attr("href");
    link && allRelativeLinks.push(link);
  });
  return allRelativeLinks;
}
