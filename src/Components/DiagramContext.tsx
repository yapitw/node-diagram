import * as React from 'react'
import { DEFAULT_FONTSIZE } from './constants'

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
}

type DiagramContextState = {
    baseSize: number
    scale: number
    nodes: NodeData[]
    connections: ConnectionData[]
    nodeUIState: {
        [key: number]: {
            width: number
            height: number
        }
    }
}

export const defaultDiagramContext: DiagramContextState = {
    baseSize: DEFAULT_FONTSIZE,
    scale: 1,
    nodes: [],
    connections: [],
    nodeUIState: {},
}

type DiagramContextValue = [
    DiagramContextState,
    React.Dispatch<React.SetStateAction<DiagramContextState>>,
]

const DiagramContext = React.createContext<DiagramContextValue>(undefined)

export const DiagramProvider: React.FC<{
    nodes: NodeData[]
    connections: ConnectionData[]
}> = (props) => {
    const { nodes, connections } = props
    const [state, setState] = React.useState({
        ...defaultDiagramContext,
        nodes,
        connections,
    })

    return (
        <DiagramContext.Provider value={[state, setState]}>
            {props.children}
        </DiagramContext.Provider>
    )
}

export const useDiagramProvider = () => {
    const [state, setState] = React.useContext(DiagramContext)

    const updateNodeUIState = (nid, newState) => {
        setState((state) => {
            const nodeUIState = {
                ...state.nodeUIState,
                [nid]: newState,
            }
            return {
                ...state,
                ...nodeUIState,
            }
        })
    }

    return {
        state,
        updateNodeUIState,
    }
}

export default DiagramContext
