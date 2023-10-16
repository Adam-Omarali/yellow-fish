export async function translate(text) {
  const res = await fetch(
    "https://api-inference.huggingface.co/pipeline/translation/facebook/mbart-large-50-many-to-many-mmt",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: text,
        parameters: { src_lang: "en_XX", tgt_lang: "fr_XX" },
      }),
    }
  );
  data = await res.json();
  console.log(data);
  return data[0]["translation_text"];
}
