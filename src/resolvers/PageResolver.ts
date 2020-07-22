import { Arg, Query, Resolver } from "type-graphql";
import { pages } from "../data";
import Page from "../schemas/Page";
import { TestCrawl } from "../crawler";

@Resolver(of => Page)
export default class {
  @Query(returns => Page, { nullable: true })
  getPage(@Arg("url") url: string): Page | undefined {
    return pages.find(page => page.url === url);
  }

  @Query(returns => [Page])
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  crawl(@Arg("url") url: string, @Arg("onePage") onePage: boolean = false): Promise<Page[]> {
    return TestCrawl(url, { onePage });
  }
}
