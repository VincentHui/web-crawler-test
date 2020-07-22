import Page from "./schemas/Page";

export const pages: Page[] = [
  { url: "https://test1", content: { links: ["https://link1"] } },
  { url: "https://test2", content: { links: ["https://link2"] }, error: "test Error" },
];
