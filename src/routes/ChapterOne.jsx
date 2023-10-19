import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Help from '../components/Help';

const ChapterOne = () => {
	const [flow, setFlow] = useState(46);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	Modal.setAppElement('#root');
	const navigate = useNavigate()

	let script = `
		CREATE TABLE Pacientes (
			id INT AUTO_INCREMENT PRIMARY KEY,
			nome VARCHAR(255) NOT NULL,
			data_nascimento DATE,
			data_consulta DATE
		);

		INSERT INTO Pacientes (id, nome, data_nascimento, data_consulta)
		VALUES
			(1, 'John Smith', '2024-05-15', '2057-10-27'),
			(2, 'Mary Johnson', '2019-12-03', '2057-09-28'),
			(3, 'Mei Yang', '2034-07-20', '2057-11-05'),
			(4, 'Jennifer Brown', '2026-08-10', '2057-08-12'),
			(5, 'Michael Davis', '2022-04-25', '2057-07-19'),
			(6, 'Sarah Taylor', '2029-03-30', '2057-06-25'),
			(7, 'William Anderson', '2017-11-15', '2057-05-18'),
			(8, 'Emily Clark', '2032-02-05', '2057-04-14'),
			(9, 'James White', '2013-06-12', '2057-03-09'),
			(10, 'Olivia Martin', '2021-09-22', '2057-02-07');
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
					<Editor script={script} type={data[flow].type} consoleComponents={consoleComponents} setConsoleComponents={setConsoleComponents} handleExercise={handleExercise} />
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