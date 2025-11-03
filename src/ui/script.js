//@ts-check
/* eslint-env browser */
/* global pywebview, TomSelect */
import { waitFor } from "./utils.js"
import { configRenderer } from "./configRenderer.js"
import { renderSettings } from "./settings.js"
import { createDynamicTabs } from "./createDynamicTabs.js"
import { setupTheme } from "./setupTheme.js"
// @ts-ignore
window.jsonViewer = document.querySelector("andypf-json-viewer")


async function setupData() {
    await waitFor(() => window.pywebview?.api.init)
    window.data = await JSON.parse(await window.pywebview.api.init())
    window.jsViewer = document.createElement("andypf-json-viewer")
    document.querySelector(".config-set#js_debug").appendChild(jsViewer)
    window.jsViewer.data = window.data
    // console.log(windowConfig)
    new configRenderer(window.data)
}

async function load_config() {
    await waitFor(() => window.pywebview?.api.init)
    window.windowConfig = await window.pywebview.api.read_window_config()
    window.themes = window.windowConfig.theme //just to globally access it for setupTheme
    window.config = window.config || {}
    for (let key in window.windowConfig.config) {
        window.config[key] = windowConfig.config[key]
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await load_config()
    await setupTheme()
    createDynamicTabs()
    await setupData()
    renderSettings()

})
