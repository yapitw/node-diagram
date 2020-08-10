import * as React from 'react'
import { DEFAULT_FONTSIZE } from '../constants'

interface ConnectPointProps {
    name: string
    transform: string
    size: number
    isOutput?: boolean
}
const ConnectPoint: React.FC<ConnectPointProps> = (props) => {
    const { name, transform, size = DEFAULT_FONTSIZE, isOutput } = props

    const [hovered, setHovered] = React.useState(false)

    return (
        <g
            transform={transform}
            className="connect_dot"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <circle cx={0} cy={0} r={size * 0.6} strokeWidth={1.5}></circle>

            <text
                fontSize={size}
                fill="black"
                x={0}
                y={size / 3}
                textAnchor={'middle'}
            >
                {name[0].toUpperCase()}
            </text>
            {hovered && (
                <text
                    fontSize={size}
                    fill="black"
                    x={isOutput ? -size : size}
                    y={size / 3}
                    textAnchor={isOutput ? 'end' : 'start'}
                >
                    {name}
                </text>
            )}
        </g>
    )
}

export default ConnectPoint
