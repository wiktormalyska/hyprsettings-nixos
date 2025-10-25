//@ts-check
import { bindFlags, modkeys, dispatchers, dispatcherParams, noneDispatchers } from "./hyprland-specific/binds.js";
let data;
let themeButton = document.getElementById("theme-toggle")
let root = document.querySelector("html")
let jsonViewer = document.querySelector("andypf-json-viewer")
let current_theme;
let themeIndex = Number(localStorage.getItem("themeIndex") ?? 0)
let themes = ["mocha", "tokyo", "siloe"]

function setupTheme() {
    current_theme = themes[themeIndex]
    root?.classList.add(current_theme)
    themeButton.onclick = toggle_theme
}

function toggle_theme() {
    root?.classList.remove(current_theme)
    themeIndex == themes.length - 1 ? themeIndex = 0 : themeIndex += 1
    localStorage.setItem("themeIndex", String(themeIndex))
    current_theme = themes[themeIndex]
    root?.classList.add(current_theme)
    console.log("Theme toggled")
}

function handleTabClick(id) {
    document.querySelectorAll(".config-set").forEach((element) => {
        element.id === id ? element.classList.remove("hidden") : element.classList.add("hidden")
    })
    document.querySelectorAll(".sidebar-item").forEach((element) => {
        element.id === id ? element.classList.add("selected") : element.classList.remove("selected")
    })
    const sidebarItem = document.querySelector(`#${id}`);
    const sidebarItemTitle = sidebarItem.dataset.label;
}

document.querySelectorAll(".sidebar-item").forEach((li) => {
    li.addEventListener("click", () => {
        handleTabClick(li.id)
    })
})


async function setup() {
    setupTheme()
    window.addEventListener('pywebviewready', async function () {
        jsonViewer.data = JSON.stringify(JSON.parse(await window.pywebview.api.get_config()))
        data = JSON.parse(await window.pywebview.api.get_config())
        console.table(data["children"])
    })
}

setup()

class EditorItem_Binds {
    constructor(name, uuid, value, comment = null) {
        if (!name.trim().startsWith("bind")) return console.warn(`Given json object is not sutable for this editor item:${name}=${value}`)
        const template = document.getElementById("keybind-template")
        this.el = template.content.firstElementChild.cloneNode(true)

        this.el.dataset.name = name
        this.el.dataset.uuid = uuid
        this.el.dataset.comment = comment ?? ""

        let tomselect_bindflag_settings = { options: bindFlags, valueField: "value", searchField: "value" }
        let bindflag_selectel = this.el.querySelector(".bindflags")
        console.log(name)
        let bindflag_additems = name.trim().substring(4).split("")
        let bindflag_selector = new TomSelect(bindflag_selectel, tomselect_bindflag_settings)
        bindflag_additems.forEach(element => {
            bindflag_selector.addItem(element)
        });

        this.el.querySelector(".comment").textContent = comment ?? ""

        let tomselect_modkeys_settings = { options: modkeys, valueField: "value", searchField: "text" }
        let modkey_select = this.el.querySelector(".modkey")
        new TomSelect(modkey_select, tomselect_modkeys_settings)

        const dispatcherSelect = this.el.querySelector(".dispatcher");
        const paramSelect = this.el.querySelector(".params");

        const dispatcherTS = new TomSelect(dispatcherSelect, {
            options: dispatchers,
            maxItems: 1,
            valueField: "value",
            searchField: "text",
            onChange: (value) => {
                paramTS.clearOptions();
                const allowedParams = dispatcherParams[value] || [];
                paramTS.addOptions(allowedParams);
                if (noneDispatchers.includes(value)) {
                    paramTS.disable()
                } else {
                    paramTS.enable()
                }
            },
        });

        const paramTS = new TomSelect(paramSelect, {
            create: true,
            disable: true,
            options: [],
            valueField: "value",
            searchField: "text",
        });



    }

    addToParent(parent) {
        parent.appendChild(this.el)
    }
}




