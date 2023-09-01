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

SplashScreen.preventAutoHideAsync()

const App = () => {
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()
    const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions()
    const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions()

    if (!galleryPermission?.granted) {
        requestGalleryPermission()
    }

    if (!cameraPermission?.granted) {
        requestCameraPermission()
    }

    if (!audioPermission?.granted) {
        requestAudioPermission()
    }

    useEffect(() => {
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