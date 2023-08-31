import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from "react-native"
import { Routes } from "./src/Routes"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import * as MediaLibrary from "expo-media-library"
import { Camera } from "expo-camera"

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


    return (
        <>
            <StatusBar style="auto" hidden />
            <Routes />
        </>
    )
}

export default App