# web-crawler-test
A web crawler for a tech test. This app uses axios, cheerio, graphql-yoga and type-graphql to create a very simple web crawler under time constraints.

![preview](https://git-repo-img.s3.eu-west-2.amazonaws.com/Annotation+2020-08-07+165647.png)

Use `yarn install` to get the packages needed and than `yarn start` to get the graphql application running locally and navigate to localhost:4000 to start giving queries in the graphql playground like the following (be warned if `onePage` is set to false it will try to gather all links in the domain)

`
{
  crawl(url: "https://www.google.com", onePage: true) {
    url,
    content{
      links
    }
  }
}
`

Use `yann test` to run the tests and have a quick overview of the basic logic
