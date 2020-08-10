import * as React from 'react'
import ConnectPoint from './ConnectPoint'
import NodeVec2 from './NodeVec2'
import { DEFAULT_FONTSIZE } from './constants'
interface ConnectPort {
    name: string
    type: string
}

interface NodeProps {
    title?: string
    location?: NodeVec2
    width?: number
    height?: number
    nodeStyle: React.CSSProperties

    type: string
    fontSize?: number
    nid: number
    x: number
    y: number
    inputs: ConnectPort[]
    outputs: ConnectPort[]
}

const Node: React.FC<NodeProps> = (props) => {
    const {
        title = 'untitled',
        width = 150,
        height = 200,
        nodeStyle,
        inputs = [],
        outputs = [],
        x = 0,
        y = 0,
    } = props

    const fontSize = DEFAULT_FONTSIZE
    const titleElem = React.useRef<SVGTextElement>(null)

    const [location, setLocation] = React.useState<NodeVec2>(new NodeVec2())
    const [size, setSize] = React.useState<NodeVec2>(
        new NodeVec2(width, height),
    )
    const [moving, setMoving] = React.useState(false)

    React.useEffect(() => {
        setLocation(new NodeVec2(x, y))
        const titleWidth = titleElem.current.getBoundingClientRect().width + 10
        if (titleWidth > width) {
            setSize((size) => {
                return new NodeVec2(titleWidth, size.y)
            })
        }
    }, [x, y])

    React.useEffect(() => {
        // update node info
    }, [moving])

    const moveStartHandler = () => {
        setMoving(true)
        window.addEventListener('pointermove', moveHandler)
        window.addEventListener('pointerup', moveEndHandler)
    }

    const moveHandler = (event) => {
        const movement = new NodeVec2(event.movementX, event.movementY)
        setLocation((location) => location.add(movement))
    }

    const moveEndHandler = () => {
        setMoving(false)
        window.removeEventListener('pointermove', moveHandler)
        window.removeEventListener('pointerup', moveEndHandler)
    }

    return (
        <g
            transform={`translate(${location.x} ${location.y})`}
            style={{ fontSize }}
        >
            <rect width={size.x} height={height} style={nodeStyle} />

            <rect
                width={size.x}
                height={fontSize * 2}
                className="node_drag_area"
                onMouseDown={moveStartHandler}
            />

            <text
                ref={titleElem}
                x={size.x / 2}
                y={fontSize * 1.5}
                className="node_title"
                onMouseDown={moveStartHandler}
            >
                {title}
            </text>

            <g transform={`translate(0 ${fontSize * 3})`}>
                {inputs.map((input, index) => {
                    const { name, type } = input
                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(0 ${index * 2 * fontSize})`}
                            size={fontSize}
                        />
                    )
                })}
            </g>

            <g
                transform={`translate(${size.x} ${
                    size.y - (outputs.length - 0.5) * 2 * fontSize
                })`}
            >
                {outputs.map((output, index) => {
                    const { name, type } = output
                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(0 ${index * 2 * fontSize})`}
                            size={fontSize}
                            isOutput
                        />
                    )
                })}
            </g>
        </g>
    )
}

export default Node
