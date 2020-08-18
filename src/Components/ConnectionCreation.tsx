import * as React from 'react'
import Connection from './Connection/index'
import { useDiagramProvider } from './DiagramContext'
import Vec2 from './NodeVec2'

const ConnectionCreation: React.FC = () => {
    const {
        state: { connectionCreation },
        createNewConnection,
    } = useDiagramProvider()
    const { creating, start, end } = connectionCreation
    const [endPoint, setEndPoint] = React.useState<Vec2>()

    const handlePointerMove = React.useCallback((event: PointerEvent) => {
        console.log(event)
        console.log(event.clientX, event.clientY)
        setEndPoint(new Vec2(event.clientX, event.clientY))
        return
    }, [])

    const handlePointerUp = React.useCallback(() => {
        setEndPoint(undefined)
        createNewConnection()
    }, [createNewConnection])

    React.useEffect(() => {
        if (creating) {
            window.addEventListener('pointermove', handlePointerMove)
            window.addEventListener('pointerup', handlePointerUp)
        } else {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
        }
    }, [creating, handlePointerMove, handlePointerUp])

    return creating && start && endPoint ? (
        <Connection start={start} end={end ?? endPoint} />
    ) : null
}

export default ConnectionCreation
