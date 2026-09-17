from json import load,dump
from typing import Final

CONFIG_FILE_PATH : Final = "util/src/config.json"

class JsonManip :

    @staticmethod
    def updateConfig(key: str, value: str | list):
        with open(CONFIG_FILE_PATH) as file:
            dit = load(file)
            dit[key] = value
            with open(CONFIG_FILE_PATH, "w") as file2:
                dump(dit, file2, indent=4)

    @staticmethod
    def getValue(key : str) :
        with open(CONFIG_FILE_PATH) as file :
            return load(file)[key]