import * as React from 'react'
import Vec2 from '../NodeVec2'
import './Connection.styl'

interface ConnectionProps {
    start: Vec2
    end: Vec2
    stops?: Vec2[]
}

const Connection: React.FC<ConnectionProps> = (props) => {
    const { start, end, stops } = props

    const extend = Math.max(60, Math.abs(start.x - end.x) / 2)
    const d = `
        M ${start.x} ${start.y} C ${start.x + extend} ${start.y},
        ${end.x - extend} ${end.y}, ${end.x} ${end.y}
     `
    return (
        <path
            className="connection_path"
            d={d}
            stroke="black"
            strokeWidth={1.5}
            fill="none"
        />
    )
}

export default Connection
