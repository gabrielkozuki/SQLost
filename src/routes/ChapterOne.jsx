import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Modal from 'react-modal';

const ChapterOne = () => {
	const [flow, setFlow] = useState(0);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(true);
	Modal.setAppElement('#root');

	let script = `
		CREATE TABLE Usuarios(id int, nome varchar(25));
		INSERT INTO Usuarios VALUES (1, 'Gabriel');
		INSERT INTO Usuarios VALUES (2, 'Alice');
		INSERT INTO Usuarios VALUES (3, 'Júlio');
		INSERT INTO Usuarios VALUES (4, 'Felipe');
		INSERT INTO Usuarios VALUES (5, 'Sarah');
		INSERT INTO Usuarios VALUES (6, 'Sophia');

		CREATE TABLE Produtos(id int, nome varchar(25), quantidade int);
		INSERT INTO Produtos VALUES (1, 'PlayStation 5', 5);
		INSERT INTO Produtos VALUES (2, 'Xbox Series X', 2);
		INSERT INTO Produtos VALUES (3, 'Caneca', 14);
	`;

	const handleExercise = (result) => {
		try {
			let res = result[0];
			let arr = consoleComponents;
			
			switch (data[flow].ex) {
				case 1:
					if (res.columns.length == 3 && res.values.length == 3) {
						arr.push(<p className="console-success" key={arr.length}>Muito bem!</p>)
						setFlow(flow + 1)
					} else {
						arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					}

					break;
				case 2:
					if (res.columns.length == 2 && res.values.length == 6) {
						arr.push(<p className="console-success" key={arr.length}>Muito bem!</p>)
						setFlow(flow + 1)
					} else {
						arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					}

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

	const modalStyle = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
		  transform: 'translate(-50%, -50%)',
		},
	  };

	return (
		<div className='chapter-one'>
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
				<p>tabelas: Usuarios(id, nome) Produtos(id, nome, quantidade)</p>
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
						
					}
				}}
				contentLabel="modal"
			>
				<h1>Capítulo concluído!</h1>
			</Modal>
		</div>
	)
}

export default ChapterOne