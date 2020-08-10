import React, { useEffect, useState, useRef } from 'react'
import './NodeDiagram.scss'

const DEFAULT_CONTAINER_STYLE = {
	width: '100%',
	height: '100%',
	background: 'grey',
}

interface NodeDiagramProps {
	title?: string
	className?: string
	containerStyle?: React.CSSProperties
}

const NodeDiagram: React.FC<NodeDiagramProps> = (props) => {
	const { title, className, containerStyle = DEFAULT_CONTAINER_STYLE } = props

	const containerElem = useRef<HTMLDivElement>(null)
	const [windowInfo, setWindowInfo] = useState({
		width: 0,
		height: 0,
	})

	const setSize = () => {
		setWindowInfo({
			width: containerElem.current.clientWidth,
			height: containerElem.current.clientHeight,
		})
	}

	useEffect(() => {
		window.addEventListener('resize', setSize)
		return () => {
			window.removeEventListener('resize', setSize)
		}
	}, [])
	return (
		<div
			ref={containerElem}
			className={className + ' node_diagram_styles'}
			style={containerStyle}
		>
			<h1>{title}</h1>
		</div>
	)
}

export default NodeDiagram
