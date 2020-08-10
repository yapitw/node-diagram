import * as React from 'react'
import './NodeDiagram.scss'
import Node from '../Node'
import DiagramContext, {
    defaultDiagramContext,
    DiagramProvider,
} from './DiagramContext'
import { DEFAULT_CONTAINER_STYLE } from './constants'
const { useEffect, useState, useRef } = React

import sampleData from '../../../example.json'
import Connection from '../Connection'
const { nodes, connections } = sampleData

interface NodeDiagramProps {
    title?: string
    className?: string
    containerStyle?: React.CSSProperties
}

const NodeDiagram: React.FC<NodeDiagramProps> = (props) => {
    const { title, className, containerStyle = {} } = props

    const containerElem = useRef<HTMLDivElement>(null)
    const [windowInfo, setWindowInfo] = useState({
        width: 0,
        height: 0,
    })

    const setSize = () => {
        setWindowInfo({
            width: containerElem.current.clientWidth,
            height: containerElem.current.clientHeight,
        })
    }

    useEffect(() => {
        setSize()
        window.addEventListener('resize', setSize)
        // setDiagramState({ baseSize: 10 })

        return () => {
            window.removeEventListener('resize', setSize)
        }
    }, [])

    return (
        <div
            ref={containerElem}
            className={className ?? className + ' ' + 'node_diagram_styles'}
            style={{ ...DEFAULT_CONTAINER_STYLE, ...containerStyle }}
        >
            {title && <h1 className="diagram_title">{title}</h1>}
            <svg
                width={windowInfo.width}
                height={windowInfo.height}
                viewBox={`0 0 ${windowInfo.width} ${windowInfo.height}`}
            >
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

                <g>
                    {connections.map((connection, index) => {
                        const { from, to } = connection
                        return <Connection key={index} />
                    })}
                </g>
            </svg>
            <DiagramProvider />
        </div>
    )
}

export default NodeDiagram
