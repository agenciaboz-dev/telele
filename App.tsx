import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from "react-native"
import { Routes } from "./src/Routes"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import { Camera } from "expo-camera"

SplashScreen.preventAutoHideAsync()

const App = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)

    useEffect(() => {
        if (hasPermission === false) {
            Alert.alert(
                "Permissão necessária",
                "Seu dispositivo não está permitindo acesso a câmera. Você pode corrigir isso nos ajustes do seu dispositivo"
            )
            ;(async () => {
                const { status } = await Camera.requestCameraPermissionsAsync()
                setHasPermission(status === "granted")
            })()
        }

        if (hasPermission) {
            SplashScreen.hideAsync()
        }
    }, [hasPermission])

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])

    return (
        <>
            <StatusBar style="auto" hidden />
            <Routes />
        </>
    )
}

export default App