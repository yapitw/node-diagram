class Vec2 {
    x: number
    y: number
    constructor(x?: number, y?: number) {
        this.x = x || 0
        this.y = y || 0
    }

    add = (vec2: Vec2) => new Vec2(this.x + vec2.x, this.y + vec2.y)
    multiply = (scale: number) => new Vec2(this.x * scale, this.y * scale)
}

export default Vec2