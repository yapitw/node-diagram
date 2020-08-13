import * as React from 'react'
import Vec2 from '../NodeVec2'
import './Connection.styl'

interface ConnectionProps {
    from: Vec2
    to: Vec2
    stops?: Vec2[]
}

const Connection: React.FC<ConnectionProps> = (props) => {
    const { from, to, stops } = props

    const extend = Math.max(60, Math.abs(from.x - to.x) / 2)
    const d = `
        M ${from.x} ${from.y} C ${from.x + extend} ${from.y},
        ${to.x - extend} ${to.y}, ${to.x} ${to.y}
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
