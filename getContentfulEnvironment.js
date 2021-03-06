const contentful = require("contentful-management");

module.exports = () => {
  console.log(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
  });

  return client
    .getSpace("wvvgfatl7raf")
    .then((space) => space.getEnvironment("master"));
};
