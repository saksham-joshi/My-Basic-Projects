# Sample Code to use POFT API

from POFT import poft

# To save data to json file
poft.SaveToJson(poft.GOOGLE_ADS_CPC_INDEX, "sample_output.json")

# # To get the dictionary of the data
poft.ExtractData(poft.FACEBOOK_ADS_CTR_INDEX)

# For faster operations in data, this function preloads the poft.AllData__
poft.LoadAllData()

# To save data in poft.AllData__ in a json file, this method save all the data
# in \All_Data\ directory in .json files
poft.SaveJsonofAllData()

# To calculate CTC
print(poft.CalculateCTC("automotive"))

# To extract all data of certain industry, then use this method
print(poft.ExtractDataOfIndustry("technology"))