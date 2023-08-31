import React, { useEffect, useState } from "react"
import { Animated, Dimensions, Easing, View } from "react-native"
import { Text } from "react-native-paper"
import { useText } from "../hooks/useText"
import * as Clipboard from "expo-clipboard"

interface FloatingTextProps {
    navigation: any
    playing: boolean
}

export const FloatingText: React.FC<FloatingTextProps> = ({ navigation, playing }) => {
    const { width, height } = Dimensions.get("screen")
    const text = useText()
    const animatedValue = new Animated.Value(height * 0.75) // Initial value

    useEffect(() => {
        if (playing) {
            // Calculate duration based on speed
            const duration = 100000 / text.speed // you can adjust this formula

            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: -height, // Final position at the top
                    duration: duration,
                    easing: Easing.linear,
                    useNativeDriver: true, // <-- Add this to improve performance
                })
            ).start()
        } else {
            animatedValue.setValue(height * 0.75) // Reset position
        }
    }, [playing, text.speed])

    useEffect(() => {
        Clipboard.getStringAsync().then((value) => {
            text.setText(value)
        })
    }, [])

    return (
        <View style={{ position: "absolute", top: 0, left: 0, width, height }}>
            <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
                <Text
                    style={{
                        padding: 5,
                        color: "white",
                        fontSize: text.fontSize,
                        fontWeight: "bold",
                        textShadowColor: "#000",
                        textShadowOffset: { height: 0, width: 0 },
                        textShadowRadius: 10,
                    }}
                >
                    {text.text}
                </Text>
            </Animated.View>
        </View>
    )
}
