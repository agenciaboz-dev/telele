import { createContext, useEffect, useState } from "react"
import React from "react"
import { Dimensions } from "react-native"

interface TextContextValue {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    fontSize: number
    setFontSize: React.Dispatch<React.SetStateAction<number>>
    textY: number
    setTextY: React.Dispatch<React.SetStateAction<number>>
    speed: number
    setSpeed: React.Dispatch<React.SetStateAction<number>>
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
    const [speed, setSpeed] = useState(5)
    const [textY, setTextY] = useState(0)

    useEffect(() => {
        console.log(text)
    }, [text])

    return <TextContext.Provider value={{ text, setText, fontSize, setFontSize, textY, setTextY, speed, setSpeed }}>{children}</TextContext.Provider>
}
