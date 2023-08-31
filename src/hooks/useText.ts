import { useContext } from "react"
import TextContext from "../contexts/textContext"

export const useText = () => {
    const textContext = useContext(TextContext)

    return { ...textContext }
}
