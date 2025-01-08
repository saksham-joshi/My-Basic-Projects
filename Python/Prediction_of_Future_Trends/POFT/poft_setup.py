from bs4 import BeautifulSoup
from requests import get
from typing import Final
from json import dump

# link from where the data will be extracted
MAIN_LINK: Final = "https://databox.com/ppc-industry-benchmarks"
HTML_TAG_WHERE_DATA_IS_STORED: Final = "tbody"

GOOGLE_ADS_IMPRESSIONS_INDEX: Final = 0
FACEBOOK_ADS_IMPRESSIONS_INDEX: Final = 1
LINKEDIN_ADS_IMPRESSIONS_INDEX: Final = 2

GOOGLE_ADS_CLICKS_INDEX: Final = 3
FACEBOOK_ADS_CLICKS_INDEX: Final = 4
LINKEDIN_ADS_CLICKS_INDEX: Final = 5

GOOGLE_ADS_CTR_INDEX: Final = 6
FACEBOOK_ADS_CTR_INDEX: Final = 7
LINKEDIN_ADS_CTR_INDEX: Final = 8

GOOGLE_ADS_CPC_INDEX: Final = 9
FACEBOOK_ADS_CPC_INDEX: Final = 10
LINKEDIN_ADS_CPC_INDEX: Final = 11

Response__ = get(MAIN_LINK)
Soup__ = BeautifulSoup(Response__.content, "html.parser")
Content__ = Soup__.find_all(HTML_TAG_WHERE_DATA_IS_STORED)
AllData__ : dict = { }