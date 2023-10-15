import { Text, View } from "react-native";
import { useEffect } from "react";

export default function Page(){
    async function translate(){
        const res = await fetch("https://api-inference.huggingface.co/pipeline/translation/facebook/mbart-large-50-many-to-many-mmt", {
            method: 'POST',
            headers: {"Authorization": `Bearer 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`},
            body: JSON.stringify({"inputs": "My name is Sarah Jessica Parker but you can call me Jessica", "parameters": {"src_lang": "en_XX", "tgt_lang": "fr_XX"}})
            
        })
        data = await res.json()
        console.log(data)
    }
    useEffect(() => {
        translate()
    }, [])
    return (
        <View>
            <Text>Hi</Text>
        </View>
    )
}