import * as React from 'react'
import { DEFAULT_FONTSIZE } from '../constants'
import './ConnectPoint.styl'

interface ConnectPointProps {
    name: string
    transform: string
    size: number
    isOutput?: boolean
    onPointerDown?: () => void
    onPointerEnter?: () => void
    onPointerLeave?: () => void
}
const ConnectPoint: React.FC<ConnectPointProps> = (props) => {
    const {
        name,
        transform,
        size = DEFAULT_FONTSIZE,
        isOutput,
        onPointerDown,
        onPointerEnter,
        onPointerLeave,
    } = props

    return (
        <g
            transform={transform}
            className="connect_dot"
            onPointerDown={onPointerDown}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
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

            <text
                fontSize={size}
                fill="black"
                x={isOutput ? -size : size}
                y={size / 3}
                textAnchor={isOutput ? 'end' : 'start'}
            >
                {name}
            </text>
        </g>
    )
}

export default ConnectPoint
