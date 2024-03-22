import React, { useEffect, useRef, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, Platform, Text, TouchableOpacity, View } from "react-native"
import { Camera, CameraType, VideoStabilization } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import { colors } from "../../style/colors"
import { FloatingText } from "../../components/FloatingText"
import { IconButton, Modal } from "react-native-paper"
import { SettingsModal } from "../../components/SettingsModal"
import * as Clipboard from "expo-clipboard"
import { useText } from "../../hooks/useText"

interface CameraContainerProps {
    navigation: NavigationProp<any, any>
}

export const CameraContainer: React.FC<CameraContainerProps> = ({ navigation }) => {
    const cameraRef = useRef<Camera>(null)
    const text = useText()

    const { width, height } = Dimensions.get("screen")

    const [recording, setRecording] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)
    const [cameraKey, setCameraKey] = useState(1)
    const [ratio, setRatio] = useState<"16:9" | "4:3" | "1:1">("16:9")

    const handlePlay = () => {
        setRecording(true)
        cameraRef.current?.recordAsync().then((video) => {
            Sharing.shareAsync(video.uri)
            MediaLibrary.saveToLibraryAsync(video.uri)
        })
    }

    const handleStop = () => {
        setRecording(false)
        cameraRef.current?.stopRecording()
    }

    useEffect(() => {
        Clipboard.getStringAsync().then((value) => {
            text.setText(value)
        })
    }, [])

    return (
        <>
            <Camera
                key={cameraKey}
                ref={cameraRef}
                type={CameraType.front}
                style={{ position: "absolute", top: 0, left: 0, width, height: height * 0.8, padding: 20, alignItems: "center" }}
                ratio={ratio}
                videoStabilizationMode={VideoStabilization.auto}
            >
                <IconButton
                    icon={"format-text-variant-outline"}
                    iconColor={colors.primary}
                    size={50}
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => setOpenSettings(true)}
                    disabled={!!recording}
                />

                <SettingsModal
                    open={openSettings}
                    onClose={() => {
                        setOpenSettings(false)
                        setCameraKey((key) => key + 1)
                    }}
                />
            </Camera>
            {!openSettings && <FloatingText navigation={navigation} playing={recording} />}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: recording ? 5 : 100,
                    width: 50,
                    height: 50,
                    backgroundColor: openSettings ? "grey" : colors.primary,
                    opacity: recording ? 0.3 : 1,
                    bottom: 50,
                    alignSelf: "center",
                }}
                onPress={recording ? handleStop : handlePlay}
            ></TouchableOpacity>
            <View style={{ position: "absolute", bottom: 20, right: 50, alignItems: "center", gap: 10 }}>
                <TouchableOpacity onPress={() => setRatio("16:9")} style={{ opacity: ratio == "16:9" ? 1 : 0.15 }}>
                    <Text style={{ color: colors.primary }}>16:9</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRatio("4:3")} style={{ opacity: ratio == "4:3" ? 1 : 0.15 }}>
                    <Text style={{ color: colors.primary }}>4:3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRatio("1:1")} style={{ opacity: ratio == "1:1" ? 1 : 0.15 }}>
                    <Text style={{ color: colors.primary }}>1:1</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
