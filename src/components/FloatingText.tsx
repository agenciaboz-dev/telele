import React from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, View } from "react-native"

interface FloatingTextProps {
    navigation: NavigationProp<any, any>
}

export const FloatingText: React.FC<FloatingTextProps> = ({ navigation }) => {
    const { width, height } = Dimensions.get("screen")

    return <View style={{ position: "absolute", top: height * 0.7, left: 0, width }}></View>
}
