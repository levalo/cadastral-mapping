import { useState } from "react"

const useEditor = () => {
    const [ showAddFeatureDrawer, setShowAddFeatureDrawer ] = useState<boolean>(false)

    const onAddFeatureDrawerOpen = () => setShowAddFeatureDrawer(() => true)

    const onAddFeatureDrawerClose = () => setShowAddFeatureDrawer(() => false)

    return {
        showAddFeatureDrawer,
        onAddFeatureDrawerOpen,
        onAddFeatureDrawerClose
    }
}

export default useEditor