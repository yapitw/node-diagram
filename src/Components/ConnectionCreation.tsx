import * as React from 'react'
import Connection from './Connection/index'
import { useDiagramProvider } from './DiagramContext'

const ConnectionCreation: React.FC = (props) => {
    const {
        state: { connectionCreation },
    } = useDiagramProvider()
    const { creating, start, end } = connectionCreation
    return creating ? <Connection start={start} end={end} /> : null
}

export default ConnectionCreation
