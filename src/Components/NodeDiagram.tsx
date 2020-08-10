import * as React from 'react'
import './NodeDiagram.scss'
import { DiagramProvider } from './DiagramContext'
import { DEFAULT_CONTAINER_STYLE } from './constants'
const { useEffect, useState, useRef } = React

import sampleData from '../../example.json'
import NodeContainer from './NodeContainer'
import ConnectionContainer from './ConnectionContainer'
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
                <DiagramProvider nodes={nodes} connections={connections}>
                    <NodeContainer />
                    <ConnectionContainer />
                </DiagramProvider>
            </svg>
        </div>
    )
}

export default NodeDiagram
