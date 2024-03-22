import React from "react"
import { NavigationProp } from "@react-navigation/native"
import { View } from "react-native"
import { CameraContainer } from "./CameraContainer"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <CameraContainer navigation={navigation} />
        </View>
    )
}
