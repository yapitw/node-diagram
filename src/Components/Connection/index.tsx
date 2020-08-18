import * as React from 'react'
import Vec2 from '../NodeVec2'
import './Connection.styl'

interface ConnectionProps {
    start: Vec2
    end: Vec2
    stops?: Vec2[]
    isCreation?: boolean
}

const Connection: React.FC<ConnectionProps> = (props) => {
    const { start, end, stops, isCreation } = props

    const extend = Math.max(60, Math.abs(start.x - end.x) / 2)
    const d = `
        M ${start.x} ${start.y} C ${start.x + extend} ${start.y},
        ${end.x - extend} ${end.y}, ${end.x} ${end.y}
     `
    const className = isCreation
        ? 'connection_path_creation'
        : 'connection_path'

    return (
        <path
            className={className}
            d={d}
            stroke="black"
            strokeWidth={1.5}
            fill="none"
        />
    )
}

export default Connection
