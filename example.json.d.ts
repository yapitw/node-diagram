import { NodeData, ConnectionData } from './src/Components/DiagramTypes'

export interface ExampleJSON {
    nodes: NodeData[];
    connections: ConnectionData[];
}

export const jsonFile: ExampleJSON;

export default jsonFile;