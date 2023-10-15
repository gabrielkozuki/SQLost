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
		CREATE TABLE Items (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			nome VARCHAR,
			descricao VARCHAR,
			valor INTEGER
		);
		
		CREATE TABLE Vinculo (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			descricao VARCHAR,
			funcionario_id INTEGER,
			pessoa_id INTEGER,
			FOREIGN KEY (funcionario_id) REFERENCES Pessoas(id),
			FOREIGN KEY (pessoa_id) REFERENCES Pessoas(id)
		);
		
		CREATE TABLE Pessoas (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			nome VARCHAR,
			sobrenome VARCHAR,
			data_nascimento DATETIME,
			profissao VARCHAR,
			is_funcionario BIT
		);

		INSERT INTO Pessoas (nome, sobrenome, data_nascimento, profissao, is_funcionario)
		VALUES
			('João', 'Silva', '1990-05-15', 'Engenheiro', 1),
			('Maria', 'Fernandes', '1985-12-10', 'Médica', 0),
			('Pedro', 'Santos', '1995-07-20', 'Advogado', 1),
			('Ana', 'Oliveira', '1988-03-25', 'Professora', 0);

		INSERT INTO Items (nome, descricao, valor)
		VALUES
			('Produto A', 'Este é o Produto A', 100),
			('Produto B', 'Descrição do Produto B', 150),
			('Produto C', 'Informações sobre o Produto C', 75),
			('Produto D', 'Descrição do Produto D', 120);

		INSERT INTO Vinculo (descricao, funcionario_id, pessoa_id)
		VALUES
			('Vínculo 1', 1, 3),
			('Vínculo 2', 2, 4),
			('Vínculo 3', 1, 2),
			('Vínculo 4', 3, 3);
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
				<div className="row">
					<div className="col">tabelas:</div>
					<div className="col">
						<p>Pessoas (nome, sobrenome, data_nascimento, profissao, is_funcionario)</p>
						<p>Items (nome, descricao, valor)</p>
						<p>Vinculo (descricao, funcionario_id, pessoa_id)</p>
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