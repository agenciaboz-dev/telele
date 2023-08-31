import { createContext, useState } from "react"
import React from "react"
import { Dimensions } from "react-native"

interface TextContextValue {
    text: string
    setText: (value: string) => void
    fontSize: number
    setFontSize: (value: number) => void
    textY: number
    setTextY: (value: number) => void
    speed: number
    setSpeed: (value: number) => void
}

interface TextProviderProps {
    children: React.ReactNode
}

const TextContext = createContext<TextContextValue>({} as TextContextValue)

export default TextContext

export const TextProvider: React.FC<TextProviderProps> = ({ children }) => {
    const { width, height } = Dimensions.get("screen")

    const [text, setText] = useState("")
    const [fontSize, setFontSize] = useState(30)
    const [speed, setSpeed] = useState(10)
    const [textY, setTextY] = useState(height / 2)

    return <TextContext.Provider value={{ text, setText, fontSize, setFontSize, textY, setTextY, speed, setSpeed }}>{children}</TextContext.Provider>
}
