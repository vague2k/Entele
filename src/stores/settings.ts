import { persistentMap } from '@nanostores/persistent'

export type SettingsValue = {
    sidebar: 'expanded' | 'collapsed'
    theme: 'dark' | 'light'
    tableView: 'table' | 'smart'
}

export const $settingsStore = persistentMap<SettingsValue>('settings:', {
    sidebar: 'expanded',
    theme: 'light',
    tableView: 'table'
})

export function toggleSidebar() {
    if (localStorage.getItem("settings:sidebar") === "expanded") {
        $settingsStore.setKey("sidebar", "collapsed");
    } else {
        $settingsStore.setKey("sidebar", "expanded");
    }
}

export function toggleTheme() {
    const htmlTag = document.documentElement;
    if (localStorage.getItem("settings:theme") === "light") {
        $settingsStore.setKey("theme", "dark");
        htmlTag.classList.add("dark");
        htmlTag.classList.remove("light");
    } else {
        $settingsStore.setKey("theme", "light");
        htmlTag.classList.add("light");
        htmlTag.classList.remove("dark");
    }
}
