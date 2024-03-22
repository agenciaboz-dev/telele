import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from "react-native"
import { Routes } from "./src/Routes"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import * as MediaLibrary from "expo-media-library"
import { Camera } from "expo-camera"
import { PaperProvider } from "react-native-paper"
import { theme } from "./src/style/theme"
import { TextProvider } from "./src/contexts/textContext"
import { useKeepAwake } from "expo-keep-awake"

SplashScreen.preventAutoHideAsync()


const App = () => {
    useKeepAwake()
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()
    const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions()
    const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions()

    useEffect(() => {
        if (!galleryPermission?.granted) {
            requestGalleryPermission()
        }

        if (!cameraPermission?.granted) {
            requestCameraPermission()
        }

        if (!audioPermission?.granted) {
            requestAudioPermission()
        }

        if (galleryPermission?.granted && cameraPermission?.granted && audioPermission?.granted) {
            SplashScreen.hideAsync()
        }
    }, [cameraPermission, audioPermission, galleryPermission])

    return galleryPermission?.granted && cameraPermission?.granted && audioPermission?.granted ? (
        <PaperProvider theme={theme}>
            <TextProvider>
                <StatusBar style="auto" hidden />
                <Routes />
            </TextProvider>
        </PaperProvider>
    ) : (
        <View>
            <Text>o app precisa de permissão para acessar a câmera, microfone e galeria.</Text>
        </View>
    )
}

export default App