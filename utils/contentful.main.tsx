import * as contentful from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

/*
 * https://contentful.github.io/contentful.js/contentful/7.15.1/
 */
export const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
});
