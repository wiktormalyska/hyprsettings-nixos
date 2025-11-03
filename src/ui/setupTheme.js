import { saveConfig } from "./utils.js";

let themeButton = document.getElementById("theme-toggle");
let currentThemeIndex = 0;
var root = document.querySelector(":root");
let headers = ["description", "link", "author", "variant"];

export function setupTheme() {
	let currentTheme = window.config["current_theme"];
	window.themes.forEach(theme => {
		if (theme.name == currentTheme) {
			currentThemeIndex = window.themes.findIndex(theme => theme.name === currentTheme);
			console.log(`Initially setting ${theme.name} as theme from config`);
			Object.entries(theme).forEach(([key, value]) => {
				if (headers.includes(key)) {
					return;
				}
				root.style.setProperty(`--${key}`, value, "important");
			});
			window.config["current_theme"] = theme.name
		}
	});
}

themeButton.addEventListener("click", () => {
	currentThemeIndex += 1;
	currentThemeIndex = currentThemeIndex % (window.themes.length - 1);
	changeTheme()
});

function changeTheme() {
	let theme = window.themes[currentThemeIndex]
	console.log(`Changing theme to ${theme.name}`)
	Object.entries(theme).forEach(([key, value]) => {
		if (headers.includes(key)) {
			return;
		}
		root.style.setProperty(`--${key}`, value, "important");
	});
	window.config["current_theme"] = theme.name
	saveConfig()
}