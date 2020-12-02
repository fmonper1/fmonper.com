module.exports = {
  theme: {
    rotate: {
      "-23": "-23deg",
      23: "23deg",
      180: "180deg",
    },
    extend: {
      colors: {
        primary: {
          main: "#14213d",
          light: "#1b2e55",
        },
        secondary: {
          main: "#fca311",
          light: "#fcbf49",
        },
        background: {
          main: "#e6e6e6",
        },
        text: {
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
    padding: ["responsive", "first", "hover", "focus", "last"],
    display: ["responsive", "hover", "focus", "group-hover"],
  },
};
