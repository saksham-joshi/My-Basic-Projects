from flask import Flask, request, jsonify
from flask_cors import CORS
from Model.Analyzer import *

app = Flask(__name__)

CORS(app)

@app.route("/")
def load_mainpage():
    return open("index.html")

@app.route("/analyze")
def analyze() :
    return jsonify(Analyze_String(request.args.get('text')))
    