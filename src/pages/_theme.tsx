import getSystem from "@/utils/get-system";
const OS = getSystem();

// default theme setting
export const defaultTheme = {
  primary_color: "#E86AAE",
  secondary_color: "#F7A3C3",
  primary_text: "#2A1A22",
  secondary_text: "#5C3B4B99",
  info_color: "#E86AAE",
  error_color: "#E94C6A",
  warning_color: "#F1B24A",
  success_color: "#2FBF8A",
  background_color: "#FFF4F7",
  font_family: `-apple-system, BlinkMacSystemFont,"Microsoft YaHei UI", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji"${
    OS === "windows" ? ", twemoji mozilla" : ""
  }`,
};

// dark mode
export const defaultDarkTheme = {
  ...defaultTheme,
  primary_color: "#8C5CFF",
  secondary_color: "#B07CFF",
  primary_text: "#F7F1FF",
  background_color: "#15111E",
  secondary_text: "#C7B6E699",
  info_color: "#8C5CFF",
  error_color: "#FF5B7F",
  warning_color: "#F2B84B",
  success_color: "#36D59A",
};
