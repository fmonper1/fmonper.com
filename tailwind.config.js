module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    rotate: {
      "-23": "-23deg",
      23: "23deg",
      180: "180deg",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#14213d",
          main: "#14213d",
          light: "#1b2e55",
        },
        secondary: {
          DEFAULT: "#fca311",
          main: "#fca311",
          light: "#fcbf49",
        },
        background: {
          DEFAULT: "#e6e6e6",
          main: "#e6e6e6",
        },
        text: {
          DEFAULT: "#2d2d2d",
          primary: "#2d2d2d",
          secondary: "#5f5f5f",
        },
        backgroundOpacity: {
          10: "0.1",
          20: "0.2",
          95: "0.95",
        },
        theme: {
          black: "000000",
          blue: "14213d",
          orange: "fca311",
          platinum: "e5e5e5",
          white: "ffffff",
        },
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
    padding: ["responsive", "first", "hover", "focus", "last"],
    display: ["responsive", "hover", "focus", "group-hover"],
    background: ["responsive", "hover", "focus", "group-hover"],
    translate: ["responsive", "active", "hover", "focus", "group-hover"],
    transform: ["responsive", "active", "hover", "focus", "group-hover"],
    scale: ["responsive", "active", "hover", "focus", "group-hover"],
  },
};
