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
        onStartShouldSetPanResponder: (evt, gestureState) => {
            return !isWithinControlArea(gestureState.x0, gestureState.y0)
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return !isWithinControlArea(gestureState.moveX, gestureState.moveY)
        },
        onPanResponderGrant: (e, gestureState) => {
            console.log("Touch Start Position:", gestureState.x0, gestureState.y0)
        },
        onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            animatedValue.setValue((animatedValue as any)._value + (pan as any)._value)
            pan.setValue(0)
            if (playing) {
                startAnimation() // Start animation from new position
            }
        },
    })

    const handleTextLayout = (e: LayoutChangeEvent) => {
        setTextHeight(e.nativeEvent.layout.height)
    }

    const isWithinControlArea = (x: number, y: number) => {
        console.log({ x, y })
        const centerX = width / 2
        const centerY = height * 0.85
        const tolerance = 25

        const withinX = x >= centerX - tolerance && x <= centerX + tolerance
        const withinY = y >= centerY - tolerance && y <= centerY + tolerance

        return withinX && withinY
    }

    const startAnimation = () => {
        const duration = 100000 / text.speed
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: -textHeight,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()
    }

    useEffect(() => {
        if (playing) {
            startAnimation()
        } else {
            animatedValue.setValue(height * 0.75) // Reset position when not playing
        }
    }, [playing, text.speed, textHeight])

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={{
                transform: [{ translateY: Animated.add(animatedValue, pan) }],
                width,
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <Text style={[textStyle, { fontSize: text.fontSize, padding: 20 }]} onLayout={handleTextLayout}>
                {text.text}
            </Text>
        </Animated.View>
    )
}
