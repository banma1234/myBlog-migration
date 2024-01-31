const THEME_SCRIPT = `
const localStorageTheme = localStorage.getItem("THEME");
const theme = localStorageTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (theme === 'dark') {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light")
}
`;

const CLIENT_SECURE_SCRIPT = `
function detectKeyCombinations(e) {
    const forbiddenKeys = ['I', 'J', 'C', 'F12', 'U'];
    const isForbiddenKey = forbiddenKeys.includes(e.key.toUpperCase()) || forbiddenKeys.includes(e.key);

    if (
        (e.ctrlKey && e.shiftKey && isForbiddenKey) ||
        (e.metaKey && e.altKey && isForbiddenKey) ||
        (e.metaKey && e.shiftKey && e.key.toUpperCase() === 'C') ||
        e.key === 'F12' ||
        (e.metaKey && e.altKey && e.key.toUpperCase() === 'U') ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
        e.preventDefault();
        alert("특정 키 조합이 감지되어 차단되었습니다.");
    }
}

window.addEventListener('keydown', detectKeyCombinations);
`;

const GLOBAL_SCRIPT = THEME_SCRIPT + "\n" + CLIENT_SECURE_SCRIPT + "\n";

export default GLOBAL_SCRIPT;
