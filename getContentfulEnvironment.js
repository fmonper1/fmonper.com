const contentful = require("contentful-management");

module.exports = () => {
  const client = contentful.createClient({
    accessToken: "CFPAT-6uOECNDMmE0PJ9WSAeAnd5fIio9EPHPBJmklNRyLULY",
  });

  return client
    .getSpace("wvvgfatl7raf")
    .then((space) => space.getEnvironment("master"));
};
