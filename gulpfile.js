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
            CSS += `\t--${blockProperty}--${elementProperty}: ${element}\n`;
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
            CSS += `.b-color-text__${blockProperty} {\n\tcolor: var(--${blockProperty};\n}\n`;
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
            CSS += `.b-color-bg__${blockProperty} {\n\tcolor: var(--${blockProperty});\n}\n`;
          } else {
            const variableName = `${blockProperty}--${elementProperty}`;
            CSS += `.b-color-bg__${variableName} {\n\tcolor: var(--${variableName});\n}\n`;
          }
        }
      }
    }
  }

  generateFiles(CSS, "background", finish);
});
