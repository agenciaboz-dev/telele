import React, { useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { useText } from "../hooks/useText"
import { colors } from "../style/colors"

interface FloatingTextProps {
    navigation: NavigationProp<any, any>
}

export const FloatingText: React.FC<FloatingTextProps> = ({ navigation }) => {
    const { width, height } = Dimensions.get("screen")
    const text = useText()

    return (
        <View style={{ position: "absolute", top: 0, left: 0, width, height, padding: 20 }}>
            <Text
                style={{
                    padding: 5,
                    color: "white",
                    fontSize: text.fontSize,
                    fontWeight: "bold",
                    textShadowColor: "#000",
                    textShadowOffset: { height: 0, width: 0 },
                    textShadowRadius: 10,
                    top: text.textY,
                }}
            >
                {text.text}
            </Text>
        </View>
    )
}
