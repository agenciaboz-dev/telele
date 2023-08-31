import React from "react"
import { NavigationProp } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { Modal, Text, TextInput } from "react-native-paper"
import { Slider } from "@miblanchard/react-native-slider"
import { useText } from "../hooks/useText"
import { colors } from "../style/colors"

interface SettingsModalProps {
    open: boolean
    onClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
    const text = useText()

    return (
        <Modal visible={open} onDismiss={onClose}>
            <View style={{ padding: 20, gap: 30 }}>
                <View style={styles.container}>
                    <Text style={styles.text}>tamanho: {text.fontSize.toFixed(0)}</Text>
                    <Slider
                        value={text.fontSize}
                        onValueChange={(value) => text.setFontSize(value[0])}
                        maximumValue={100}
                        minimumValue={1}
                        containerStyle={styles.sliderContainer}
                        thumbStyle={styles.sliderThumb}
                        trackStyle={styles.sliderTrack}
                        minimumTrackTintColor={colors.primary}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>velocidade: {text.speed.toFixed(0)}</Text>
                    <Slider
                        value={text.speed}
                        onValueChange={(value) => text.setSpeed(value[0])}
                        maximumValue={10}
                        minimumValue={1}
                        containerStyle={styles.sliderContainer}
                        thumbStyle={styles.sliderThumb}
                        trackStyle={styles.sliderTrack}
                        minimumTrackTintColor={colors.primary}
                    />
                </View>
                <TextInput
                    value={text.text}
                    onChangeText={(value) => text.setText(value)}
                    mode="outlined"
                    style={{ backgroundColor: "transparent", fontSize: 20, color: colors.text }}
                    label="texto"
                    textColor={colors.text}
                />
            </View>
        </Modal>
    )
}

export const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", gap: 10 },
    text: {
        flex: 0.7,
        fontSize: 20,
        color: colors.primary,
        fontWeight: "bold",
    },
    sliderContainer: { backgroundColor: "transparent", flex: 1 },
    sliderThumb: { backgroundColor: colors.primary },
    sliderTrack: { backgroundColor: "white" },
})
