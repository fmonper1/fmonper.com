const NextI18Next = require("next-i18next").default;
const path = require("path");

module.exports = new NextI18Next({
  localeStructure: "{{lng}}/{{ns}}",
  defaultLanguage: "en",
  otherLanguages: ["es"],
  localePath: path.resolve("./public/static/locale"),
});
