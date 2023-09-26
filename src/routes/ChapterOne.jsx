import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Textbox from '../components/Textbox'
import Editor from '../components/Editor'

const ChapterOne = () => {

	const [flow, setFlow] = useState(0);

	const handleClick = () => {
		if (flow < data.length - 1) {
			setFlow(flow + 1)
		}
		console.log(flow);
	}

	return (
		<div className='chapter-one'>
			<div className='wrapper'>
				<div className="textbox-container">
					<Textbox data={data} flow={flow} />
					<button className='btn-continuar' onClick={handleClick}>Continuar</button>
				</div>

				<div className="editor-container">
					<Editor />
				</div>
			</div>
		</div>
	)
}

export default ChapterOne