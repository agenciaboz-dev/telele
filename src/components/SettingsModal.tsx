import React, { useRef } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Keyboard, StyleSheet, TextInput, View } from "react-native"
import { Modal, Text } from "react-native-paper"
import { Slider } from "@miblanchard/react-native-slider"
import { useText } from "../hooks/useText"
import { colors } from "../style/colors"
import textStyle from "../style/text"

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
                        onValueChange={(value) => text.setFontSize(Number(value[0].toFixed(0)))}
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
                    onBlur={() => Keyboard.dismiss()}
                    multiline
                    value={text.text}
                    onChangeText={(value) => text.setText(value)}
                    style={[textStyle, { backgroundColor: "transparent", fontSize: text.fontSize, height: 300 }]}
                    placeholder="texto"
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
