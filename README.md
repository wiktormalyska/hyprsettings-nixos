# Hyprsettings

Hyprsettings is a configurator for `hyprland.conf` (and its included files), built for people like me who don't like faffing around with configs.  
Made with Python, web technologies via PyWebviewGTK,
vanilla JS and some js libs.

<img width="799" height="598" alt="image" src="https://github.com/user-attachments/assets/07ed324f-0939-4f01-8475-401cf650bfc0" />



> [!IMPORTANT]
> This is in alpha state.

You can fork this repo, make changes, and submit pull requests. Please also submit bugs, start discussions, etc. I'd love to hear from you!

## Testing the UI

1. Clone the repo:

```bash
git clone https://github.com/acropolis914/hyprsettings
cd hyprsettings
```

2. Install required system packages:

```bash
sudo pacman -Syu python python-gobject gtk3
```

3. Run the UI:

```bash
python src/ui.py
```

## Arch Linux Installation (Dependencies + Hyprland bind)

For Arch users, you can run the following single block to install dependencies and add a keybind to your Hyprland configuration:

```bash
sudo pacman -Syu python python-gobject gtk3
git clone https://github.com/acropolis914/hyprsettings ~/hyprsettings
echo 'bind = SUPER, I, Exec, python ~/hyprsettings/src/ui.py' >> ~/.config/hypr/hyprland.conf
```

> Make sure to replace `SUPER, I` with the key combination you want to use.


## Configuration and Theming

Hyprsettings will create a configuration file at:

```
~/.config/hypr/hyprsettings.toml
```

The defaults should be fine, but if you like tweaking, you can explore and modify the file. Be careful, though I don’t have extensive safeguards and fallbacks right now.

## A Personal Note

Please note that this is my first publicly announced project, so be kind and help me improve it! Start discussions if you want to chat with me about it.  
I’m not a professional programmer, nor have I studied programming academically, but I’ve been slowly chipping away at this. 😄



### Notice on the use of AI
There is a use of AI in this project. I am not very familiar with modern conventions so I sometimes ask AI on what are available and what methods can be used. I however am not okay with "vibecoding" as I believe that won't get me further.

AI has also been used to diagnose issues in code particularly with CSS/SCSS cause belive it or not, it's 2025, I've started learning it in 2018 and I still forget how to center a div lol.

Use of AI in my opinion is fine if you use it as a helper/tool but don't make it generate your code. I wont accept pull requests if I suspect it is plainly AI.
