import * as React from 'react'
import ConnectPoint from './ConnectPoint'
import NodeVec2 from '../NodeVec2'
import { DEFAULT_FONTSIZE, DEFAULT_NODE_STYLE } from '../constants'
import { ConnectPort } from '../DiagramTypes'
import { useDiagramProvider } from '../DiagramContext'

interface NodeProps {
    title?: string
    width?: number
    height?: number
    nodeStyle?: React.CSSProperties

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
        nodeStyle = DEFAULT_NODE_STYLE,
        nid,
        x = 0,
        y = 0,
        inputs = [],
        outputs = [],
    } = props

    const fontSize = React.useRef(DEFAULT_FONTSIZE)
    const titleElem = React.useRef<SVGTextElement>(null)
    const { updateNodeUIState } = useDiagramProvider()

    const [moving, setMoving] = React.useState(false)
    const [location, setLocation] = React.useState<NodeVec2>(new NodeVec2())
    const [size, setSize] = React.useState<NodeVec2>(
        new NodeVec2(width, height),
    )

    React.useEffect(() => {
        console.log(`node: ${nid} mounted`)
    }, [nid])

    React.useEffect(() => {
        setLocation(new NodeVec2(x, y))
        const titleWidth = titleElem.current.getBoundingClientRect().width + 10
        if (titleWidth > width) {
            setSize((size) => {
                return new NodeVec2(titleWidth, size.y)
            })
        }
    }, [x, y, width])

    React.useEffect(() => {
        updateNodeUIState(nid, { x: location.x, y: location.y })
    }, [nid, location, updateNodeUIState])

    React.useEffect(() => {
        updateNodeUIState(nid, { width: size.x, height: size.y })
    }, [nid, size, updateNodeUIState])

    const moveStartHandler = () => {
        setMoving(true)
        window.addEventListener('pointermove', moveHandler)
        window.addEventListener('pointerup', moveEndHandler)
    }

    const moveHandler = (event: PointerEvent) => {
        const movement = new NodeVec2(event.movementX, event.movementY)
        setLocation((location) => location.add(movement))
    }

    const moveEndHandler = () => {
        setMoving(false)
        window.removeEventListener('pointermove', moveHandler)
        window.removeEventListener('pointerup', moveEndHandler)
    }

    const inputPoints = React.useMemo(() => {
        const inputPoints = inputs.reduce(
            (res: { [key: string]: NodeVec2 }, input, index) => {
                const pos = new NodeVec2(0, (index * 2 + 3) * fontSize.current)
                res[input.name] = pos
                return res
            },
            {},
        )
        return inputPoints
    }, [inputs])

    React.useEffect(() => {
        updateNodeUIState(nid, { inputs: inputPoints })
    }, [inputPoints, nid, updateNodeUIState])

    const outputPoints = React.useMemo(() => {
        const outputPoints = outputs.reduce(
            (res: { [key: string]: NodeVec2 }, input, index) => {
                const pos = new NodeVec2(
                    size.x,
                    size.y -
                        (outputs.length - 0.5) * 2 * fontSize.current +
                        index * 2 * fontSize.current,
                )
                res[input.name] = pos
                return res
            },
            {},
        )
        return outputPoints
    }, [outputs, size])

    React.useEffect(() => {
        updateNodeUIState(nid, { outputs: outputPoints })
    }, [outputPoints, nid, updateNodeUIState])

    return (
        <g
            transform={`translate(${location.x} ${location.y})`}
            style={{ fontSize: fontSize.current }}
        >
            <rect width={size.x} height={height} style={nodeStyle} />

            <rect
                width={size.x}
                height={fontSize.current * 2}
                className="node_drag_area"
                onMouseDown={moveStartHandler}
            />

            <text
                ref={titleElem}
                x={size.x / 2}
                y={fontSize.current * 1.5}
                className="node_title"
                onMouseDown={moveStartHandler}
            >
                {title}
            </text>

            <g>
                {inputs.map((input, index) => {
                    const { name, type } = input
                    const pos = inputPoints[name]
                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(${pos.x} ${pos.y})`}
                            size={fontSize.current}
                        />
                    )
                })}
            </g>

            <g>
                {outputs.map((output, index) => {
                    const { name, type } = output
                    const pos = outputPoints[name]
                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(${pos.x} ${pos.y})`}
                            size={fontSize.current}
                            isOutput
                        />
                    )
                })}
            </g>
        </g>
    )
}

export default Node
