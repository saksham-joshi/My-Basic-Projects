from gtts import gTTS
from gtts.tts import gTTSError
from os import startfile

def createAudio(text : str , lang : str , accent : str, directory : str,fast : bool) -> str :
    try :
        lang = lang[:lang.index(":")]
        text= text.strip()

        if text.__len__() == 0 : return ""

        x = gTTS(text=text,tld=accent,lang=lang,slow= not fast)

        path = f"{directory[:-1] if directory[-1] in '/\\' else directory}/{(text[:30].strip()+".mp3").replace("/", "_").replace("\\", "_").replace(":", "_")}"

        print(f" >> Saving file to path: '{path}'")

        tries = 3

        while tries > 0 :
            try :
                x.save(path)
                print(f" >> Successfully saved file to '{path}'")
                break
            except PermissionError: path = "Audios/tts_audio.mp3"

            except OSError: path = directory+"tts_audio.mp3"

            except Exception as e : return f"Failed to saved the file due to the following error: {e}"
            
            tries -= 1
        
        if tries <= 0 : return f"Failed to save the file on this path '{path}'. Try to change the path!"

        startfile(path)

        return f"Successfully saved file at '{path}'"

    except ValueError as e : return f"Value Error: {e.__str__()}"
    
    except AssertionError as e : return f"Assertion Error: {e.__str__()}"
    
    except RuntimeError as e : return f"Runtime Error: {e.__str__()}"
    
    except gTTSError as e : return f"You are not connected to the Internet: {e.__str__()}" 
    
    except Exception as e : return f"Unknown Exception found: {e.__str__()}"