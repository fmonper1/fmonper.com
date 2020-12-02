const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./resources/**/*.{scss}",
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "focus-within-pseudo-class": false,
      },
    }),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
