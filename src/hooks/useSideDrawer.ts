import { RootState, useAppDispatch } from "../store"
import { useSelector } from "react-redux"
import { DrawerTypes, setShowDrawerAction } from "../store/reducers/editor"

const useSideDrawer = () => {
    const dispatch = useAppDispatch()
    const { showDrawer } = useSelector(({ editor }: RootState) => editor)

    const openDrawer = (type: DrawerTypes) => dispatch(setShowDrawerAction(type))

    const closeDrawer = () => dispatch(setShowDrawerAction(undefined))

    return {
        showDrawer,
        openDrawer,
        closeDrawer
    }
}

export default useSideDrawer