# pip install transformers
# pip install sentencepiece
# pip install tensorflow
# pip3 install torch torchvision torchaudio
# pip install ipywidgets

from transformers import pipeline

pipe = pipeline(task="text2text-generation", model="facebook/m2m100_418M")

print(pipe("i dont like soccer", forced_bos_token_id=pipe.tokenizer.get_lang_id(lang="es")))