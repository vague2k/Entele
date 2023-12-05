export function toggleTheme() {
    const html = document.documentElement
    const currentTheme = html.classList.contains("dark") ? "dark" : "light"

    if (currentTheme === "dark") {
        html.classList.remove("dark")
        html.classList.add("light")
    } else {
        html.classList.remove("light")
        html.classList.add("dark")
    }

    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');

}
export function appliedTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
}
