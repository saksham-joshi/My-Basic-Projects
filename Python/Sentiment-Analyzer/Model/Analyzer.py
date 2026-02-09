from json import load
from Model.AnalystUtility import *
import threading

json_obj = load(open("./Model/Corrector.json"))

def is_currency(val: str) -> bool:
    if val in json_obj["Currencies"]:
        return True
    return False


def is_datesandnumbers(val: str) -> bool:
    if val in json_obj["Datesandnumbers"]:
        return True
    return False


def is_generic(val: str) -> bool:
    if val in json_obj["Generic"]:
        return True
    return False


def is_genericlong(val: str) -> bool:
    if val in json_obj["Genericlong"]:
        return True
    return False


def is_geographic(val: str) -> bool:
    if val in json_obj["Geographic"]:
        return True
    return False


def is_names(val: str) -> bool:
    if val in json_obj["Names"]:
        return True
    return False


def is_positive_word(val: str) -> bool:
    if val in json_obj["positive-words"]:
        return True
    return False


def is_negative_word(val: str) -> bool:
    if val in json_obj["negative-words"]:
        return True
    return False


def Analyze_String(val: str):
    positive_score = 0
    negative_score = 0
    no_of_word = 0
    no_of_sentence = 0
    no_of_complex_word = 0
    total_no_of_character = 0
    total_no_of_words = 0
    unidentified_words = 0
    avg_sentence_length = 0
    percent_of_complex_words = 0

    list_unidentified_words = []
    try :

        i = 0

        while i < val.__len__():

            word = ""

            
            if i < val.__len__() and (val[i] == "." or val[i] == '?' or val[i] == '!') : no_of_sentence+=1
            if not val[i].isalpha() : i+=1

            # extracting the word
            try :
                while (i < val.__len__() and val[i].isalpha()):
                    word += val[i].upper()
                    i+=1
            except UnicodeError :
                pass
            if word.__len__() != 0 : total_no_of_words+=1
            
            # check if the word's length is zero or it is included in stopwords.
            if word.__len__() == 0 or is_currency(word) or is_datesandnumbers(word) or is_generic(word) or is_genericlong(word) or is_geographic(word) or is_names(word) :
                continue

            no_of_word+=1

            # Now calculating the output ....
            if is_positive_word(word) : positive_score+=1
            elif is_negative_word(word) : negative_score+=1
            else : list_unidentified_words.append(word) ;unidentified_words+=1

            if AnalystUtility.is_complex_word(word) : no_of_complex_word+=1

            total_no_of_character += word.__len__()

        avg_sentence_length = AnalystUtility.calculate_average_sentence_length(total_no_of_words, no_of_sentence)
        percent_of_complex_words = AnalystUtility.calculate_percent_of_complex_words(no_of_complex_word, total_no_of_words)
    except :
        pass
    threading.Thread(target= AnalystUtility.add_unidentified_words,args=(list_unidentified_words,)).start()

    return {"Positive Score": positive_score,
            "Negative Score": negative_score,
            "Polarity Score": AnalystUtility.calculate_polarity_score(positive_score, negative_score),
            "Subjectivity Score": AnalystUtility.calculate_subjectivity_score(positive_score, negative_score, no_of_word),
            "Average sentence length": str(avg_sentence_length)+" words" ,
            "Number of Complex Words": str(no_of_complex_word) +" words" ,
            "Percentage of Complex Words": str(percent_of_complex_words)+" %",
            "Fog Index": AnalystUtility.calculate_fog_index(avg_sentence_length, percent_of_complex_words),
            "Average word length": str(AnalystUtility.calculate_average_word_length(total_no_of_character, no_of_word))+" characters" ,
            "Total words Analyzed": str(no_of_word)+" words",
            "Unidentified words": str(unidentified_words)+" words"
            }


def Analyze_File(file_url: str) -> dict:
    try:
        return Analyze_String(open(file_url).read())
    except Exception as e:
        pass