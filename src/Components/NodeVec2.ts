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

export default NodeVec2