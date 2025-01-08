from POFT.poft_setup import *

def RefineValue(__value : str) -> float :
    
    if __value.__len__() == 0 : return 0

    value_to_multiply_with = 1
    if __value[__value.__len__()-1].lower() == 'k' : value_to_multiply_with = 1000
    elif __value[__value.__len__()-1].lower() == 'm' : value_to_multiply_with = 100000

    final_value = ""

    for i in __value :
        if i == '$' or i == ',' : continue
        if i != '.' and (not i.isdigit()) : break
        final_value+=i

    if final_value.__len__() == 0 : return 0
    return float(final_value)*value_to_multiply_with


def ExtractData(__data_index: int) -> dict[str , float] :
    if __data_index < 0 and __data_index >= Content__.__len__() : raise IndexError("Index not within range. The length of Content is limited within 0 and "+ str(Content__.__len__()-1))

    data_dict : dict = {}
    rows = Content__[__data_index].find_all('tr')

    for row in rows[1:]:  # skipping the header row
        columns = row.find_all('td')
        key = columns[0].text.strip().lower()
        value = columns[1].text.strip()

        data_dict[key] = RefineValue(value)
    return data_dict

def ExtractDataOfIndustry(__industry_name : str) -> dict :
    
    __industry_name = __industry_name.lower()
    
    return {
        "Impressions" : {
            "Google Ads" : ReadData(GOOGLE_ADS_IMPRESSIONS_INDEX)[__industry_name],
            "Facebook Ads" : ReadData(FACEBOOK_ADS_IMPRESSIONS_INDEX)[__industry_name],
            "LinkedIn Ads" : ReadData(LINKEDIN_ADS_IMPRESSIONS_INDEX)[__industry_name]
        },
        "Clicks" : {
            "Google Ads" : ReadData(GOOGLE_ADS_CLICKS_INDEX)[__industry_name],
            "Facebook Ads" : ReadData(FACEBOOK_ADS_CLICKS_INDEX)[__industry_name],
            "LinkedIn Ads" : ReadData(LINKEDIN_ADS_CLICKS_INDEX)[__industry_name]
        },
        "CTR" : {
            "Google Ads" : ReadData(GOOGLE_ADS_CTR_INDEX)[__industry_name],
            "Facebook Ads" : ReadData(GOOGLE_ADS_CTR_INDEX)[__industry_name],
            "LinkedIn Ads" : ReadData(GOOGLE_ADS_CTR_INDEX)[__industry_name]
        },
        "CPC" : {
            "Google Ads" : ReadData(GOOGLE_ADS_CPC_INDEX)[__industry_name],
            "Facebook Ads" : ReadData(FACEBOOK_ADS_CPC_INDEX)[__industry_name],
            "LinkedIn Ads" : ReadData(LINKEDIN_ADS_CPC_INDEX)[__industry_name]
        }
    }

# This function first checks if the __data_index is available in the poft.AllData__
# or not. If not found, it calls the poft.ExtractData() and then saves it on poft.AllData__
def ReadData(__data_index : int) -> dict[str, float] :
    if AllData__.get(__data_index) == None : AllData__[__data_index] = ExtractData(__data_index)
    return AllData__[__data_index]


def SaveToJson(__data_index : int, __file_name : str) :
    with open(__file_name, 'w') as file_to_write :
        dump(ReadData(__data_index),file_to_write, indent=4)

# CTC formula = (Cpc*clicks) + other_cost
def CalculateCTC(__industry_name : str) -> float:

    cpc= 0
    for i in range(9, 12) : cpc += ReadData(i)[__industry_name.lower()]

    clicks = 0
    for i in range(3,6) : clicks += ReadData(i)[__industry_name.lower()]

    return cpc*clicks

# loads all the data to poft.AllData__
def LoadAllData() : 
    for i in range(Content__.__len__()) : AllData__[i] = ExtractData(i)
    
# writes up the content of poft.AllData__ to Json fies which are saved in \All_Data\ directory
def SaveJsonofAllData() :
    if AllData__.__len__() == 0 : LoadAllData()
    for i in range(AllData__.__len__()) :
        with open("All_Data/"+str(i)+".json", 'w') as file :
            dump(AllData__[i], file, indent= 4)