import * as React from 'react'
import './NodeDiagram.scss'
import Node from './Node'
import { colors } from '../Components/colors.json'
const { useEffect, useState, useRef } = React

const DEFAULT_CONTAINER_STYLE = {
    width: '100%',
    height: '100%',
    background: colors.background,
}

const DEFAULT_NODE_STYLE = {
    stroke: 'black',
    strokeWidth: 1.5,
    fill: colors.background,
    rx: 5,
}

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
                viewBox={`${-windowInfo.width / 2} ${-windowInfo.height / 2} ${
                    windowInfo.width
                } ${windowInfo.height}`}
            >
                <Node nodeStyle={DEFAULT_NODE_STYLE} />
            </svg>
        </div>
    )
}

export default NodeDiagram
