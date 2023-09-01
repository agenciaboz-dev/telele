import React, { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Easing, LayoutChangeEvent, PanResponder, View } from "react-native"
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

    const [textHeight, setTextHeight] = useState<number>(0)

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            animatedValue.setValue((animatedValue as any)._value + (pan as any)._value)
            pan.setValue(0)
        },
    })

    const handleTextLayout = (e: LayoutChangeEvent) => {
        // specify type
        setTextHeight(e.nativeEvent.layout.height)
    }

    useEffect(() => {
        if (playing) {
            const duration = 100000 / text.speed

            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: -textHeight,
                    duration: duration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start()
        } else {
            animatedValue.setValue(height * 0.75)
        }
    }, [playing, text.speed, textHeight])

    return (
        <View style={{ position: "absolute", top: 0, left: 0, width }}>
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    transform: [{ translateY: Animated.add(animatedValue, pan) }],
                }}
            >
                <Text style={[textStyle, { fontSize: text.fontSize, padding: 20 }]} onLayout={handleTextLayout}>
                    {text.text}
                </Text>
            </Animated.View>
        </View>
    )
}
