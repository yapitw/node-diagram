import { isEqual } from 'lodash'
import * as React from 'react'
import { DEFAULT_FONTSIZE } from './constants'
import { NodeData, ConnectionData, NodeID } from './DiagramTypes'
import Vec2 from './NodeVec2'

interface NodeUIState {
    width?: number
    height?: number
    x?: number
    y?: number
    inputs?: { [key: string]: Vec2 }
    outputs?: { [key: string]: Vec2 }
    selected?: boolean
}

interface ConnectionCreationState extends Partial<ConnectionData> {
    creating?: boolean
    start?: Vec2
    end?: Vec2
}

type DiagramContextState = {
    baseSize: number
    scale: number
    nodes: NodeData[]
    connections: ConnectionData[]
    connectionCreation: ConnectionCreationState
    selectedNodes: string[]
    nodeUIState: {
        [key: string]: NodeUIState
    }
}

export const defaultDiagramContext: DiagramContextState = {
    baseSize: DEFAULT_FONTSIZE,
    scale: 1,
    nodes: [],
    connections: [],
    nodeUIState: {},
    selectedNodes: [],
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
        (nid: NodeID, newState: Partial<NodeUIState>) => {
            return setState((state) => {
                const nodeUIState = {
                    ...state.nodeUIState,
                    [nid]: {
                        ...state.nodeUIState[nid],
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

    const createNewConnection = React.useCallback(() => {
        setState((state) => {
            const { from, from_node, to, to_node } = state.connectionCreation
            const connections = [...state.connections]

            if (
                // any property not defined
                from === undefined ||
                from_node === undefined ||
                to === undefined ||
                to_node === undefined ||
                // connection exist
                connections.find((connection) =>
                    isEqual(connection, { from, from_node, to, to_node }),
                )
            ) {
                // cancel creation
                return { ...state, connectionCreation: { creating: false } }
            } else {
                // add connection
                connections.push({ from, from_node, to, to_node })
                return {
                    ...state,
                    connections,
                    connectionCreation: { creating: false },
                }
            }
        })
    }, [setState])

    interface SetConnectionStartPointParams {
        start: Vec2
        from_node: NodeID
        from: string
    }
    const setConnectionStartPoint = React.useCallback(
        ({ start, from_node, from }: SetConnectionStartPointParams) => {
            setState((state) => {
                const connectionCreation = {
                    creating: true,
                    start,
                    from_node,
                    from,
                }

                return {
                    ...state,
                    connectionCreation,
                }
            })
        },
        [setState],
    )

    interface setConnectionEndPointParams {
        end: Vec2
        to_node: NodeID
        to: string
    }

    const setConnectionEndPoint = React.useCallback(
        ({ end, to_node, to }: setConnectionEndPointParams) => {
            setState((state) => {
                if (to_node !== state.connectionCreation.from_node) {
                    const connectionCreation = {
                        ...state.connectionCreation,
                        end,
                        to_node,
                        to,
                    }
                    return {
                        ...state,
                        connectionCreation,
                    }
                }

                return state
            })
        },
        [setState],
    )

    return {
        state,
        updateNodeUIState,
        setConnectionStartPoint,
        setConnectionEndPoint,
        createNewConnection,
    }
}

export default DiagramContext
