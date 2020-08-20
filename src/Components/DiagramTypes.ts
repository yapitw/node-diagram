export type NodeID = string
export interface ConnectPort {
    name: string
    type: string
}
export interface NodeData {
    nid: NodeID
    type: string
    x: number
    y: number
    fields: {
        in: ConnectPort[]
        out: ConnectPort[]
    }
}

export interface ConnectionData {
    from_node: NodeID
    from: string
    to_node: NodeID
    to: string
}