import React, { useRef, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { Camera, CameraType } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"

interface CameraContainerProps {
    navigation: NavigationProp<any, any>
}

export const CameraContainer: React.FC<CameraContainerProps> = ({ navigation }) => {
    const cameraRef = useRef<Camera>(null)

    const { width, height } = Dimensions.get("screen")

    const [recording, setRecording] = useState(false)

    const handlePlay = async () => {
        setRecording(true)
        const video = await cameraRef.current?.recordAsync()
        // await MediaLibrary.saveToLibraryAsync(picture.uri)
        if (video) {
            await Sharing.shareAsync(video.uri)
        }
    }

    const handleStop = async () => {
        setRecording(false)
        await cameraRef.current?.stopRecording()
    }

    return (
        <Camera
            ref={cameraRef}
            type={CameraType.front}
            style={{ position: "absolute", top: 0, left: 0, width, height, padding: 20, alignItems: "center" }}
            ratio="16:9"
        >
            <TouchableOpacity
                style={{
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: recording ? 5 : 100,
                    width: 50,
                    height: 50,
                    marginTop: height * 0.75,
                    backgroundColor: "red",
                    opacity: recording ? 0.3 : 1,
                }}
                onPress={recording ? handleStop : handlePlay}
            ></TouchableOpacity>
        </Camera>
    )
}
