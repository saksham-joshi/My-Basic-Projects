from os import system

system("start util/src/ACKNO.TTF")
system("start util/src/RobotoCondensed-Regular.ttf")
system("pip install -r requirements.txt")

config_dit : dict  = {

    "languages": [],
    "accent": [],
    "current_language": "en:English",
    "current_accent": "com",
    "about_message": "| Developed by : SAKSHAM JOSHI.\n| Github : https://github.com/saksham-joshi\n| Linkedin : https://www.linkedin.com/in/sakshamjoshi27/\n| Twitter : https://twitter.com/sakshamjoshi27/\n| Developed in : Python.\n| GUI Module : PyQT5.\n| Back-End Module : gTTS.\n| Code Editor : Microsoft VS Code.",
    "save_location": "Audios/",
    "play_cmd": "start",
    "OS_checked": False
}

from json import dump
from gtts import langs, accents


config_dit["accent"] = accents.accents
for langcode in langs._langs :
    config_dit["languages"].append(langcode + ":" + langs._langs[langcode])

with open("util/src/config.json" , 'w') as config_file :
    dump(config_dit , config_file, indent=4)

