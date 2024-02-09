const THEME_SCRIPT = `
const localStorageTheme = localStorage.getItem("THEME");
const theme = localStorageTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (theme === 'dark') {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light")
}
`;

const GLOBAL_SCRIPT = THEME_SCRIPT;

export default GLOBAL_SCRIPT;
