import * as React from 'react'
import { useDiagramProvider } from './DiagramContext'
import Connection from './Connection/index'
import NodeVec2 from './NodeVec2'

const ConnectionContainer = () => {
    const {
        state: { connections, nodeUIState },
    } = useDiagramProvider()

    return (
        <g>
            {connections.map((connection, index) => {
                const { from_node, from, to_node, to } = connection

                const fromNode = nodeUIState[from_node] ?? {}
                const toNode = nodeUIState[to_node] ?? {}

                const fromPoint = fromNode?.outputs?.[from]
                const toPoint = toNode?.inputs?.[to]

                if (!(fromPoint && toPoint)) {
                    return null
                }
                const fromPos = new NodeVec2(fromNode.x, fromNode.y)
                const toPos = new NodeVec2(toNode.x, toNode.y)
                return (
                    <Connection
                        start={fromPos.add(fromPoint)}
                        end={toPos.add(toPoint)}
                        key={index}
                    />
                )
            })}
        </g>
    )
}

export default ConnectionContainer
