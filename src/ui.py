import webview
from parser import ConfigParser
from pathlib import Path
import mimetypes

current_file = Path(__file__).parent.resolve()
html_file = current_file / "ui" / "index.html"
css_file = current_file / "ui" / "style.css"

with open(html_file, "r", encoding="UTF-8") as html_content:
    html = html_content.read()


class Api:
    def init(self):
        return self.get_config()

    def get_config(self):
        config_path = Path.home() / ".config" / "hypr" / "hyprland.conf"
        config = ConfigParser(config_path).root.to_json()
        return config

    def save_config(self, json: str):
        pass


api = Api()

mimetypes.add_type("application/javascript", ".js")
window = webview.create_window(
    "Hyprland Config Editor",
    "ui/index.html",
    js_api=api,
    transparent=True,
    # frameless=True,r
)

# window.load_css(stylesheet=css_file)
webview.start(gui="gtk", debug=True, private_mode=False, storage_path=".pywebview")
