import React from "react"
import { NavigationProp } from "@react-navigation/native"
import { View } from "react-native"
import { Modal, Text } from "react-native-paper"

interface SettingsModalProps {
    open: boolean
    onClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
    return (
        <Modal visible={open} onDismiss={onClose}>
            <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
    )
}
