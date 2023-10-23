import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Help from '../components/Help';

const ChapterOne = () => {
	const [flow, setFlow] = useState(0);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	Modal.setAppElement('#root');
	const navigate = useNavigate()

	let script = `
		CREATE TABLE Pacientes (
			id INT AUTO_INCREMENT PRIMARY KEY,
			nome VARCHAR NOT NULL,
			data_nascimento VARCHAR,
			data_consulta VARCHAR
		);

		INSERT INTO Pacientes (id, nome, data_nascimento, data_consulta)
		VALUES
			(1, 'John Smith', '15/05/2024', '27/10/2057'),
			(2, 'Mary Johnson', '03/12/2019', '28/09/2057'),
			(3, 'Mei Yang', '20/07/2034', '05/11/2057'),
			(4, 'Jennifer Brown', '10/08/2026', '12/08/2057'),
			(5, 'Michael Davis', '25/04/2022', '19/07/2057'),
			(6, 'Sarah Taylor', '30/03/2029', '25/06/2057'),
			(7, 'William Anderson', '15/11/2017', '18/05/2057'),
			(8, 'Emily Clark', '05/02/2032', '14/04/2057'),
			(9, 'James White', '12/06/2013', '09/03/2057'),
			(10, 'Olivia Martin', '22/09/2021', '07/02/2057');
	`;

	const handleExercise = (result) => {
		try {
			let res = result[0];
			let arr = consoleComponents;
			
			switch (data[flow].ex) {
				case 1:
					if (res.columns.length == 2 && res.values.length == 10) {
						if (res.columns[0] == 'nome' && res.columns[1] == 'data_nascimento') {
							arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
							setFlow(flow + 1)
							break;
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;
					
				case 2:
					if (res.columns.length == 4 && res.values.length == 10) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'data_consulta') {
							arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
							setFlow(flow + 1)
							break;
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 3:
					if (res.columns.length == 4 && res.values.length == 10) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'data_consulta') {
							if (res.values[0][0] == 10) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;
					
				case 4:
					if (res.columns.length == 4 && res.values.length == 10) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'data_consulta') {
							if (res.values[0][0] == 3) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;
			}

			setConsoleComponents(arr)

		} catch (err) {
			console.log(err)
		}
	}

	const handleClick = () => {
		if (flow < data.length - 1) {
			if (data[flow].type === 'dialogue') {
				setFlow(flow + 1)
			}
		}
		handleModal()
	}

	const handleModal = () => {
		if (flow == data.length - 1) {
			setModalIsOpen(!modalIsOpen)
		}
	}

	return (
		<div className='chapter-one'>
			<Help />
			<div className='wrapper'>
				<div className="textbox-container">
					<Textbox data={data} flow={flow} />
					<button className='btn-continuar' style={{visibility: data[flow].type === 'dialogue' ? 'visible' : 'hidden' }} onClick={handleClick}>Continuar</button>
				</div>

				<div className="editor-container">
					<Editor script={script} type={data[flow].type} consoleComponents={consoleComponents} setConsoleComponents={setConsoleComponents} handleExercise={handleExercise} chapter={1} indexJson={data[flow].index} />
				</div>
			</div>

			<div className="tables">
				<div className="row">
					<div className="col">
						<p>tabelas:</p>
					</div>
					<div className="col">
						<p>Pacientes (id, nome, data_nascimento, data_consulta)</p>
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.2)',
						textAlign: 'center',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					},
					content: {
						position: 'relative',
						width: '50%',
						height: '35%',
						fontSize: 12,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'center'
					}
				}}
				contentLabel="modal"
			>
				<h1>Capítulo concluído!</h1>
				<button 
				onClick={() => navigate('/play')}
				style={{
					width: '280px',
					height: '45px',
					borderWidth: '2px',
					borderRadius: '2px',
					borderColor: 'black',
					borderStyle: 'solid',
					marginBottom: '15px',
					marginLeft: '30px',
				}}>Voltar ao Menu</button>
			</Modal>
		</div>
	)
}

export default ChapterOne