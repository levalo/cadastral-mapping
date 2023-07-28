import { useState } from "react"

type DrawerTypes = "feature" | "points"

const useEditor = () => {
    const [ showDrawer, setShowDrawer ] = useState<DrawerTypes>()
    const [ selectedPoints, setSelectedPoints ] = useState<string[]>()

    const openDrawer = (type: DrawerTypes) => setShowDrawer(type)

    const closeDrawer = () => setShowDrawer(undefined)

    return {
        showDrawer,
        openDrawer,
        closeDrawer,
        selectedPoints,
        setSelectedPoints
    }
}

export default useEditor