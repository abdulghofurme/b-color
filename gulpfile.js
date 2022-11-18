const gulp = require("gulp");
const file = require("gulp-file");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const colors = {
  surface: {
    main: "#FFFFFF",
    light: "#FFFFFF",
    dark: "#F5F5F5",
  },
  onsurface: {
    "high-emphasis": "rgba(0, 0, 0, .87)",
    "medium-emphasis": "rgba(0, 0, 0, .6)",
    disabled: "rgba(0, 0, 0, .38)",
  },
  onprimary: {
    "high-emphasis": "rgba(255, 255, 255, 1)",
    "medium-emphasis": "rgba(255, 255, 255, .74)",
    disabled: "rgba(255, 255, 255, .38)",
  },
  primary: {
    default: "#82C341",
    900: "#266914",
    800: "#4B8B26",
    700: "#5F9F2F",
    600: "#73B339",
    500: "#82C341",
    400: "#95CC5E",
    300: "#A8D57C",
    200: "#C1E1A2",
    100: "#DAEDC6",
    "050": "#F0F8E8",
  },
  secondary: {
    default: "#4C2A86",
    900: "#4C2A86",
    800: "#693398",
    700: "#7938A1",
    600: "#8B3EAA",
    500: "#9943B1",
    400: "#A85ABD",
    300: "#B776CA",
    200: "#CC9CDA",
    100: "#E0C3E8",
    "050": "#F2E7F5",
  },
  magenta: {
    default: "#77245a",
    "050": "#f4e8f0",
    100: "#edd5e5",
    200: "#e2b5d3",
    300: "#d494be",
    400: "#cd85b5",
    500: "#c073a5",
    600: "#a6568b",
    700: "#8c4373",
    800: "#77325f",
    900: "#62224c",
  },
  violet: {
    default: "#8772b0",
    "050": "#e0dbeb",
    100: "#d0c8e0",
    200: "#c2b7d7",
    300: "#afa2ca",
    400: "#9e8ebd",
    500: "#8772b0",
    600: "#725e9c",
    700: "#5a4781",
    800: "#453367",
    900: "#33264d",
  },
  navy: {
    default: "#345064",
    "050": "#e0e8ee",
    100: "#cadae6",
    200: "#b0c8d9",
    300: "#9bbad1",
    400: "#82a7c2",
    500: "#6d98b6",
    600: "#537b97",
    700: "#45667e",
    800: "#345064",
    900: "#2c4455",
  },
  blue: {
    default: "#a3c4c7",
    "050": "#e2edee",
    100: "#d3e4e6",
    200: "#bfd7d9",
    300: "#abc9cc",
    400: "#a3c4c7",
    500: "#98bbbe",
    600: "#77a2a6",
    700: "#5c8f94",
    800: "#4d7b80",
    900: "#446a6e",
  },
  teal: {
    default: "#3e6b5c",
    "050": "#e4ebe8",
    100: "#d3e0dc",
    200: "#c1d6cf",
    300: "#a9c7bd",
    400: "#97b8ad",
    500: "#88b3a4",
    600: "#6b998a",
    700: "#538071",
    800: "#426b5e",
    900: "#34594d",
  },
  green: {
    default: "#789764",
    "050": "#e2ebdd",
    100: "#cedbc5",
    200: "#b8cca9",
    300: "#a6bf95",
    400: "#90ad7d",
    500: "#789764",
    600: "#668054",
    700: "#566b47",
    800: "#445639",
    900: "#3e4d34",
  },
  olive: {
    default: "#5f6240",
    "050": "#daddbc",
    100: "#cdd1a5",
    200: "#bdc18d",
    300: "#aeb379",
    400: "#9ea36a",
    500: "#939762",
    600: "#74774d",
    700: "#5f6240",
    800: "#515336",
    900: "#484a30",
  },
  yellow: {
    default: "#cc9f29",
    "050": "#f0d490",
    100: "#e6c267",
    200: "#d9ad41",
    300: "#cc9f29",
    400: "#bf921d",
    500: "#ad8b33",
    600: "#997b2c",
    700: "#806624",
    800: "#66521e",
    900: "#59471a",
  },
  orange: {
    default: "#cc8339",
    "050": "#f6dec5",
    100: "#f2c79b",
    200: "#f0b478",
    300: "#eba45e",
    400: "#e69849",
    500: "#cc8339",
    600: "#bf7326",
    700: "#ab621a",
    800: "#995612",
    900: "#80470f",
  },
  red: {
    default: "#a7482a",
    "050": "#f0b9a8",
    100: "#e9a38c",
    200: "#e28366",
    300: "#d66d4b",
    400: "#c25b3a",
    500: "#a7482a",
    600: "#8e381c",
    700: "#7d2e15",
    800: "#6d2812",
    900: "#5c220f",
  },
  brown: {
    default: "#7a6c40",
    "050": "#f1ede3",
    100: "#e8e2d1",
    200: "#ded4b6",
    300: "#d4c598",
    400: "#c7b581",
    500: "#c7b581",
    600: "#ad9c68",
    700: "#948351",
    800: "#7a6c40",
    900: "#665931",
  },
  "black-cool": {
    default: "#252b2c",
    "050": "#f2f5f5",
    100: "#e4eaeb",
    200: "#d7e0e0",
    300: "#cbd5d6",
    400: "#bdc6c7",
    500: "#4f5859",
    600: "#434c4d",
    700: "#383f40",
    800: "#313738",
    900: "#252b2c",
  },
  "black-warm": {
    default: "#2c2b2b",
    "050": "#f5f5f5",
    100: "#e6e4e3",
    200: "#d9d7d7",
    300: "#cccaca",
    400: "#b8b6b6",
    500: "#595958",
    600: "#4d4b4b",
    700: "#403f3e",
    800: "#333232",
    900: "#2c2b2b",
  },
};

/**
 *
 * @param {String} CSS
 * @param {String} fileExtension
 * @param {Function} callback
 */
async function generateFiles(CSS, fileName, callback) {
  await file(`${fileName}.css`, CSS)
    .pipe(gulp.dest("src"))
    .pipe(gulp.dest("dist"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename(`${fileName}.min.css`))
    .pipe(gulp.dest("dist"));

  callback();
}

gulp.task("generate:css-var-color", async function (finish) {
  let CSS = ":root {\n";
  for (const blockProperty in colors) {
    if (Object.hasOwnProperty.call(colors, blockProperty)) {
      const block = colors[blockProperty];

      for (const elementProperty in block) {
        if (Object.hasOwnProperty.call(block, elementProperty)) {
          const element = block[elementProperty];

          if (elementProperty === "default") {
            CSS += `\t--${blockProperty}: ${element};\n`;
          } else {
            CSS += `\t--${blockProperty}--${elementProperty}: ${element};\n`;
          }
        }
      }
    }
  }
  CSS += "}";

  generateFiles(CSS, "variables", finish);
});

gulp.task("generate:css-text-color", async function (finish) {
  let CSS = "";
  for (const blockProperty in colors) {
    if (Object.hasOwnProperty.call(colors, blockProperty)) {
      const block = colors[blockProperty];

      for (const elementProperty in block) {
        if (Object.hasOwnProperty.call(block, elementProperty)) {
          if (elementProperty === "default") {
            CSS += `.b-color-text__${blockProperty} {\n\tcolor: var(--${blockProperty});\n}\n`;
          } else {
            const variableName = `${blockProperty}--${elementProperty}`;
            CSS += `.b-color-text__${variableName} {\n\tcolor: var(--${variableName});\n}\n`;
          }
        }
      }
    }
  }

  generateFiles(CSS, "text", finish);
});

gulp.task("generate:css-bg-color", async function (finish) {
  let CSS = "";
  for (const blockProperty in colors) {
    if (Object.hasOwnProperty.call(colors, blockProperty)) {
      const block = colors[blockProperty];

      for (const elementProperty in block) {
        if (Object.hasOwnProperty.call(block, elementProperty)) {
          const element = block[elementProperty];

          if (elementProperty === "default") {
            CSS += `.b-color-bg__${blockProperty} {\n\tbackground-color: var(--${blockProperty});\n}\n`;
          } else {
            const variableName = `${blockProperty}--${elementProperty}`;
            CSS += `.b-color-bg__${variableName} {\n\tbackground-color: var(--${variableName});\n}\n`;
          }
        }
      }
    }
  }

  generateFiles(CSS, "background", finish);
});
