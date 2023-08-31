import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, Easing, PanResponder, View } from "react-native"
import { Text } from "react-native-paper"
import { useText } from "../hooks/useText"
import textStyle from "../style/text"

interface FloatingTextProps {
    navigation: any
    playing: boolean
}

export const FloatingText: React.FC<FloatingTextProps> = ({ navigation, playing }) => {
    const { width, height } = Dimensions.get("screen")
    const text = useText()
    const animatedValue = useRef(new Animated.Value(height * 0.75)).current
    const pan = useRef(new Animated.Value(0)).current // Only Y position

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            animatedValue.setValue(animatedValue._value + pan._value)
            pan.setValue(0)
        },
    })

    useEffect(() => {
        if (playing) {
            const duration = 100000 / text.speed

            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: -height,
                    duration: duration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start()
        } else {
            animatedValue.setValue(height * 0.75)
        }
    }, [playing, text.speed])

    return (
        <View style={{ position: "absolute", top: 0, left: 0, width, height }}>
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    transform: [{ translateY: Animated.add(animatedValue, pan) }],
                }}
            >
                <Text style={[textStyle, { fontSize: text.fontSize, padding: 20 }]}>{text.text}</Text>
            </Animated.View>
        </View>
    )
}
