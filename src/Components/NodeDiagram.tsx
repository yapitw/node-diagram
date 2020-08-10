import * as React from 'react'
import './NodeDiagram.scss'
import Node from './Node'
import { DEFAULT_CONTAINER_STYLE, DEFAULT_NODE_STYLE } from './constants'
const { useEffect, useState, useRef } = React

import sampleData from '../../example.json'
const nodes = sampleData.nodes

interface NodeDiagramProps {
    title?: string
    className?: string
    containerStyle?: React.CSSProperties
}

const NodeDiagram: React.FC<NodeDiagramProps> = (props) => {
    const { title, className, containerStyle = DEFAULT_CONTAINER_STYLE } = props

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
        return () => {
            window.removeEventListener('resize', setSize)
        }
    }, [])

    return (
        <div
            ref={containerElem}
            className="node_diagram_styles"
            style={containerStyle}
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
                            nodeStyle={DEFAULT_NODE_STYLE}
                            key={nid}
                            nid={nid}
                            type={type}
                            x={x}
                            y={y}
                            inputs={inputs}
                            outputs={outputs}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

export default NodeDiagram
