import * as React from 'react'
import { useDiagramProvider } from './DiagramContext'
import Node from './Node/index'

const NodeContainer = () => {
    const { state } = useDiagramProvider()
    const { nodes } = state
    return (
        <g>
            {nodes.map((node) => {
                const { nid, type, x, y, fields } = node
                const { in: inputs, out: outputs } = fields
                return (
                    <Node
                        key={nid}
                        nid={nid}
                        type={type}
                        title={type}
                        x={x}
                        y={y}
                        inputs={inputs}
                        outputs={outputs}
                    />
                )
            })}
        </g>
    )
}

export default NodeContainer
