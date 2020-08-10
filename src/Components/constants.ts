import styles from './Shared.scss'

export const DEFAULT_FONTSIZE = 14

export const DEFAULT_CONTAINER_STYLE = {
    width: '100%',
    height: '100%',
    background: styles.nodeBackground,
    '--node-font-size': DEFAULT_FONTSIZE
}

export const DEFAULT_NODE_STYLE = {
    stroke: 'black',
    strokeWidth: 1.5,
    fill: styles.nodeBackground,
    rx: 5,
}