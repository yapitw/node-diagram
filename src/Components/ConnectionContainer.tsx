import * as React from 'react'
import { useDiagramProvider } from './DiagramContext'
import Connection from './Connection'

const ConnectionContainer = () => {
    const { state } = useDiagramProvider()
    const { connections } = state
    return (
        <g>
            {connections.map((connection, index) => {
                // const { from, to } = connection
                return <Connection key={index} />
            })}
        </g>
    )
}

export default ConnectionContainer
