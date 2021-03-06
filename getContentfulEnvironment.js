const contentful = require("contentful-management");

module.exports = () => {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
  });

  return client
    .getSpace("wvvgfatl7raf")
    .then((space) => space.getEnvironment("master"));
};
