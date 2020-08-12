export interface ConnectPort {
    name: string
    type: string
}
export interface NodeData {
    nid: number
    type: string
    x: number
    y: number
    fields: {
        in: ConnectPort[]
        out: ConnectPort[]
    }
}

export interface ConnectionData {
    from_node: number
    from: string
    to_node: number
    to: string
}