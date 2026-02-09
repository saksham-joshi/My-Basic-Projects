
# Sentiment Analyzer

Analyze the sentiment of a text stored in a string or text file and understand the reason why your blogs and posts are not ranking up.
This Model is developed using Python3 programming language without using nltk package.



## How to use it ?

 - Install Python3 on your system from [here](https://www.python.org/downloads/).
 - Download this repository from [here](https://github.com/saksham-joshi/Sentiment_Analyzer/archive/refs/heads/main.zip).
 - After downloading, extract the zip file and open the extracted folder.
## Files & Folders:
1. "support_files": this folder is used by "Corrector_generator.ipynb" to generate "Corrector.json". 
1. "Corrector.json": this file contains all the words required to clean your given text which eventually increases accuracy and quality of output.
2. "Corrector_generator.ipynb": this is a jupyter notebook file of a python script which helps you to generate and update "Corrector.json".
3. "AnalystUtility.py": this file contains the implementation of neccesary formula required to create outputs.
4. "Analyzer.py": this is the main file which contains the implementation and logic of this Analyzer. It contains two functions : 
    - Analyze_String(val : str) : this function takes string as input as returns a dictionary as output.
    - Analyze_File(file_name : str) : this function takes file address as a input and returns a dictionary as output.
## Developer Info:
- Developed by Saksham Joshi.
- [@Portfolio](https://sakshamjoshi.netlify.app/)
- [@Linkedin](https://www.linkedin.com/in/sakshamjoshi27)
- [@GitHub](https://github.com/saksham-joshi)
- [@X(Twitter)](https://twitter.com/sakshamjoshi27/)

