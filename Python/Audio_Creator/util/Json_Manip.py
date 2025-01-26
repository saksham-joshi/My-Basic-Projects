from json import load,dump
from platform import system
from typing import Final

CONFIG_FILE_PATH : Final = "util/src/config.json"

class json_manip :

    @staticmethod
    def update_config(key: str, value: str | list):
        with open(CONFIG_FILE_PATH) as file:
            dit = load(file)
            dit[key] = value
            with open(CONFIG_FILE_PATH, "w") as file2:
                dump(dit, file2, indent=4)

    @staticmethod
    def get_value(key : str) :
        with open(CONFIG_FILE_PATH) as file :
            return load(file)[key]
        
    @staticmethod
    def OS_detected() :
        if not load(open(CONFIG_FILE_PATH))["OS_checked"]:
            with open(CONFIG_FILE_PATH) as file :
                dit = load(file)
                if "windows" in system().lower() : dit["play_cmd"] = "start"
                elif "linux" in system().lower() : dit["play_cmd"] = "afplay"
                else : dit["play_cmd"] = "unknown"
                with open(CONFIG_FILE_PATH,"w") as file2 :
                    dump(dit,file2,indent=4)
            json_manip.update_config("OS_checked",True)