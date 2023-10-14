import { Text, View } from "react-native";
import { useEffect } from "react";

export default function Page(){
    async function translate(){
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