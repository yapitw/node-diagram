import * as React from 'react'

class NodeVec2 {
    x: number
    y: number
    constructor(x?: number, y?: number) {
        this.x = x || 0
        this.y = y || 0
    }

    add = (vec2: NodeVec2) => new NodeVec2(this.x + vec2.x, this.y + vec2.y)
    multiply = (scale: number) => new NodeVec2(this.x * scale, this.y * scale)
}

interface NodeProps {
    title?: string
    location?: NodeVec2
    width?: number
    height?: number
    nodeStyle: React.CSSProperties
}

const Node: React.FC<NodeProps> = (props) => {
    const {
        title = 'untitled',
        location: initLocation,
        width = 150,
        height = 200,
        nodeStyle,
    } = props

    const titleElem = React.useRef<SVGTextElement>(null)

    const [location, setLocation] = React.useState<NodeVec2>(new NodeVec2())
    const [size, setSize] = React.useState<NodeVec2>(
        new NodeVec2(width, height),
    )
    const [moving, setMoving] = React.useState(false)

    React.useEffect(() => {
        if (initLocation) {
            setLocation(initLocation)
        }
        const titleWidth = titleElem.current.getBoundingClientRect().width + 10
        if (titleWidth > width) {
            setSize((size) => {
                return new NodeVec2(titleWidth, size.y)
            })
        }
    }, [initLocation])

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

    interface ConnectPort {
        seq?: number
        type: string
    }

    const inputs: { [key: string]: ConnectPort } = {
        x: {
            seq: 0,
            type: 'number',
        },
        y: {
            seq: 1,
            type: 'number',
        },
        z: {
            seq: 2,
            type: 'number',
        },
    }
    const outputs: { [key: string]: ConnectPort } = {
        x: {
            seq: 2,
            type: 'number',
        },
        y: {
            seq: 1,
            type: 'number',
        },
        z: {
            seq: 0,
            type: 'number',
        },
    }

    return (
        <g transform={`translate(${location.x} ${location.y})`}>
            <rect width={size.x} height={height} style={nodeStyle} />

            <rect
                width={size.x}
                height={20}
                className="node_drag_area"
                fill="transparent"
                onMouseDown={moveStartHandler}
            />

            <text
                ref={titleElem}
                x={size.x / 2}
                y="20"
                textAnchor="middle"
                className="node_title"
                onMouseDown={moveStartHandler}
            >
                {title}
            </text>

            <g transform={`translate(0 36)`}>
                {Object.keys(inputs)
                    .sort(keySorter.bind(inputs))
                    .map((key, index) => (
                        <ConnectDot
                            key={key}
                            name={key}
                            transform={`translate(0 ${index * 2.5 * 12})`}
                        />
                    ))}
            </g>

            <g
                transform={`translate(${size.x} ${
                    size.y - Object.keys(outputs).length * 24 - 12
                })`}
            >
                {Object.keys(outputs)
                    .sort(keySorter.bind(outputs))
                    .map((key, index) => (
                        <ConnectDot
                            key={key}
                            name={key}
                            transform={`translate(0 ${index * 2.5 * 12})`}
                        />
                    ))}
            </g>
        </g>
    )
}

export default Node

interface ConnectDotProps {
    name: string
    transform: string
}
const ConnectDot: React.FC<ConnectDotProps> = (props) => {
    const { name, transform } = props
    return (
        <g transform={transform} className="connect_dot">
            <circle cx={0} cy={0} r="0.75em" strokeWidth={1.5}></circle>
            <text fontSize={16} fill="black" x={0} y={4} textAnchor="middle">
                {name}
            </text>
        </g>
    )
}

function keySorter(keyA: string, keyB: string) {
    return (this[keyA].seq || 0) < (this[keyB].seq || 0) ? -1 : 1
}
