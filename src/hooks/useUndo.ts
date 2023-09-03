import { ActionCreators } from "redux-undo"
import { useAppDispatch } from "../store"
import { useEffect } from "react"

const useUndo = () => {
    const dispatch = useAppDispatch()

    const undo = () => dispatch(ActionCreators.undo())

    const redo = () => dispatch(ActionCreators.redo())

    const keyDownHandler = (ev: KeyboardEvent) => {
        if (!ev.ctrlKey) return

        switch(ev.key) {
            case 'z': undo()
                break
            case 'y': redo()
                break
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler)

        return () => {
            window.removeEventListener("keydown", keyDownHandler)
        }
    }, [])

    return {
        undo,
        redo
    }
}

export default useUndo