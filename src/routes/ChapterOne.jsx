import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Textbox from '../components/Textbox'
import Editor from '../components/Editor'

const ChapterOne = () => {
	const [flow, setFlow] = useState(0);

	let script = `
		CREATE TABLE users(id int, nome varchar(25));
		INSERT INTO users VALUES (0, 'Gabriel');
		INSERT INTO users VALUES (1, 'Alice');
		INSERT INTO users VALUES (2, 'Júlio');
		INSERT INTO users VALUES (3, 'Felipe');
		INSERT INTO users VALUES (4, 'Sarah');
		INSERT INTO users VALUES (5, 'Sophia');
	`;

	const handleClick = () => {
		if (flow < data.length - 1) {
			setFlow(flow + 1)
		}
	}

	return (
		<div className='chapter-one'>
			<div className='wrapper'>
				<div className="textbox-container">
					<Textbox data={data} flow={flow} />
					<button className='btn-continuar' onClick={handleClick}>Continuar</button>
				</div>

				<div className="editor-container">
					<Editor script={script} />
				</div>
			</div>
		</div>
	)
}

export default ChapterOne