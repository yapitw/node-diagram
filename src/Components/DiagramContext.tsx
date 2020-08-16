import * as React from 'react'
import { DEFAULT_FONTSIZE } from './constants'
import { NodeData, ConnectionData } from './DiagramTypes'
import NodeVec2 from './NodeVec2'

interface NodeUIState {
    width?: number
    height?: number
    x?: number
    y?: number
    inputs?: { [key: string]: NodeVec2 }
    outputs?: { [key: string]: NodeVec2 }
}

interface ConnectionCreationState {
    creating?: boolean
    start?: NodeVec2
    end?: NodeVec2
    from_node?: string
    from?: string
    to_node?: string
    to?: string
}

type DiagramContextState = {
    baseSize: number
    scale: number
    nodes: NodeData[]
    connections: ConnectionData[]
    nodeUIState: {
        [key: number]: NodeUIState
    }
    connectionCreation: ConnectionCreationState
}

export const defaultDiagramContext: DiagramContextState = {
    baseSize: DEFAULT_FONTSIZE,
    scale: 1,
    nodes: [],
    connections: [],
    nodeUIState: {},
    connectionCreation: {
        creating: false,
    },
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

    const updateNodeUIState = React.useCallback(
        (nid: number, newState: NodeUIState) => {
            return setState((state) => {
                const nodeUIState = {
                    ...state.nodeUIState,
                    [nid]: {
                        ...(state.nodeUIState[nid] ?? {}),
                        ...newState,
                    },
                }
                return {
                    ...state,
                    nodeUIState,
                }
            })
        },
        [setState],
    )

    const startConnectionCreation = React.useCallback(
        (start: NodeVec2) => {
            setState((state) => {
                const connectionCreation = {
                    creating: true,
                    start,
                }

                return {
                    ...state,
                    connectionCreation,
                }
            })
        },
        [setState],
    )

    return {
        state,
        updateNodeUIState,
    }
}

export default DiagramContext
