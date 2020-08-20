import * as React from 'react'
import ConnectPoint from './ConnectPoint'
import Vec2 from '../NodeVec2'
import { DEFAULT_FONTSIZE, DEFAULT_NODE_STYLE } from '../constants'
import { ConnectPort, NodeID } from '../DiagramTypes'
import { useDiagramProvider } from '../DiagramContext'

interface NodeProps {
    title?: string
    width?: number
    height?: number
    nodeStyle?: React.CSSProperties

    type: string
    fontSize?: number
    nid: NodeID
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
    const {
        state: {
            connectionCreation: { creating },
        },
        updateNodeUIState,
        setConnectionStartPoint,
        setConnectionEndPoint,
    } = useDiagramProvider()

    const [location, setLocation] = React.useState<Vec2>(new Vec2(x, y))
    const [size, setSize] = React.useState<Vec2>(new Vec2(width, height))

    // React.useEffect(() => {
    //     console.log(`node: ${nid} mounted`)
    // }, [nid])

    React.useEffect(() => {
        setLocation(new Vec2(x, y))
        const titleWidth = titleElem.current.getBoundingClientRect().width + 10
        if (titleWidth > width) {
            setSize((size) => new Vec2(titleWidth, size.y))
        }
    }, [x, y, width])

    React.useEffect(() => {
        updateNodeUIState(nid, { x: location.x, y: location.y })
    }, [nid, location, updateNodeUIState])

    React.useEffect(() => {
        updateNodeUIState(nid, { width: size.x, height: size.y })
    }, [nid, size, updateNodeUIState])

    const pointerOffset = React.useRef(new Vec2())

    const moveStartHandler = (event: React.PointerEvent) => {
        pointerOffset.current = new Vec2(
            -(event.clientX - location.x),
            -(event.clientY - location.y),
        )
        window.addEventListener('pointermove', moveHandler)
        window.addEventListener('pointerup', moveEndHandler)
    }

    const moveHandler = (event: PointerEvent) => {
        const newLocation = new Vec2(event.clientX, event.clientY)
        setLocation(newLocation.add(pointerOffset.current))
    }

    const moveEndHandler = () => {
        window.removeEventListener('pointermove', moveHandler)
        window.removeEventListener('pointerup', moveEndHandler)
    }

    const inputPoints = React.useMemo(() => {
        const inputPoints = inputs.reduce(
            (res: { [key: string]: Vec2 }, input, index) => {
                const pos = new Vec2(0, (index * 2 + 3) * fontSize.current)
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
            (res: { [key: string]: Vec2 }, input, index) => {
                const pos = new Vec2(
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

    const handlePointerLeave = () => {
        setConnectionEndPoint({
            end: undefined,
            to_node: undefined,
            to: undefined,
        })
    }

    return (
        <g
            transform={`translate(${location.x} ${location.y})`}
            style={{ fontSize: fontSize.current }}
        >
            <rect
                width={size.x}
                height={size.y}
                onPointerDown={moveStartHandler}
                style={nodeStyle}
            />

            <text
                ref={titleElem}
                x={size.x / 2}
                y={fontSize.current * 1.5}
                className="node_title"
            >
                {title}
            </text>

            <g>
                {inputs.map((input) => {
                    const { name, type } = input
                    const pos = inputPoints[name]

                    const handlePointerEnter = () => {
                        setConnectionEndPoint({
                            end: location.add(pos),
                            to_node: nid,
                            to: name,
                        })
                    }

                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(${pos.x} ${pos.y})`}
                            size={fontSize.current}
                            onPointerEnter={
                                creating ? handlePointerEnter : undefined
                            }
                            onPointerLeave={
                                creating ? handlePointerLeave : undefined
                            }
                        />
                    )
                })}
            </g>

            <g>
                {outputs.map((output, index) => {
                    const { name, type } = output
                    const pos = outputPoints[name]
                    const handlePointerDown = () => {
                        setConnectionStartPoint({
                            start: location.add(pos),
                            from_node: nid,
                            from: name,
                        })
                    }
                    return (
                        <ConnectPoint
                            key={name}
                            name={name}
                            transform={`translate(${pos.x} ${pos.y})`}
                            size={fontSize.current}
                            isOutput
                            onPointerDown={handlePointerDown}
                        />
                    )
                })}
            </g>
        </g>
    )
}

export default Node
