from flask import Flask, request, jsonify
from transformers import pipeline
import json

app = Flask(__name__)

pipe = pipeline(task="text2text-generation", model="facebook/m2m100_418M")

# Add a default route to handle requests to the root URL "/"
@app.route('/', methods=['GET'])
def home():
    return "hi this is free"

# Your translation route
@app.route('/generate_translation', methods=['POST'])
def generate_translation():
    data = request.json
    text = data.get('text')
    lang = data.get('lang')

    translation = pipe(text, forced_bos_token_id=pipe.tokenizer.get_lang_id(lang))

    return jsonify({"translation": translation[0]['generated_text']})

app.run()
