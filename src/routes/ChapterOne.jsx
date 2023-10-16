import React, { useEffect, useState } from 'react'
import './ChapterOne.scss'
import data from '../data/capitulo-um.json';

import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ChapterOne = () => {
	const [flow, setFlow] = useState(0);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	Modal.setAppElement('#root');
	const navigate = useNavigate()

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
			id INTEGER PRIMARY KEY,
			nome VARCHAR,
			sobrenome VARCHAR,
			data_nascimento DATETIME,
			profissao VARCHAR,
			is_funcionario BIT
		);

		INSERT INTO Pessoas (id, nome, sobrenome, data_nascimento, profissao, is_funcionario)
		VALUES
			(1, 'Sam', 'Vincent', '1990-05-15', 'Engenheiro', 0),
			(2, 'Hannah', 'Cooper', '1985-12-10', 'Cientista', 1),
			(3, 'Benjamin', 'Williamson', '1995-07-20', 'Advogado', 0),
			(4, '', '', '', '', 1),
			(5, 'Sebastian', 'Greenwood', '1995-07-20', 'Segurança', 1),
			(6, 'Sophia', 'Weston', '1988-03-25', 'Professora', 0),
			(7, '', '', '', '', 0);

		INSERT INTO Items (nome, descricao, valor)
		VALUES
			('Produto A', 'Este é o Produto A', 100),
			('Produto B', 'Descrição do Produto B', 150),
			('Produto C', 'Informações sobre o Produto C', 75),
			('Produto D', 'Descrição do Produto D', 120);

		INSERT INTO Vinculo (descricao, funcionario_id, pessoa_id)
		VALUES
			('Marido', 2, 1),
			('Irmão', 5, 3),
			('Filha', 4, 7);
	`;

	const handleExercise = (result) => {
		try {
			let res = result[0];
			let arr = consoleComponents;
			
			switch (data[flow].ex) {
				case 1:
					if (res.columns.length == 6 && res.values.length == 7) {
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
				<div className="row">
					<div className="col">
						<p>tabelas:</p>
					</div>
					<div className="col">
						<p>Pessoas (nome, sobrenome, data_nascimento, profissao, is_funcionario)</p>
						<p>Items (nome, descricao, valor)</p>
						<p>Vinculo (descricao, funcionario_id, pessoa_id)</p>
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				style={modalStyle}
				contentLabel="modal"
			>
				<h1>Capítulo concluído!</h1>
				<button 
				onClick={() => navigate('/play')}
				style={{
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