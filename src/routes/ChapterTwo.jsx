import React, { useEffect, useState } from 'react'
import './ChapterTwo.scss'
import data from '../data/capitulo-dois.json';

import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ChapterTwo = () => {
	const [flow, setFlow] = useState(0);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	Modal.setAppElement('#root');
	const navigate = useNavigate()

	let script = `
		CREATE TABLE Itens (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			nome VARCHAR,
			descricao VARCHAR,
			valor VARCHAR
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
			(1, 'Sam', 'Vincent', '1995-05-15', 'Engenheiro', 0),
			(2, 'Hannah', 'Cooper', '1985-12-10', 'Cientista', 1),
			(3, 'Benjamin', 'Smith', '1995-07-20', 'Advogado', 0),
			(4, 'David', 'Williams', '1989-03-07', 'Cirurgião', 1),
			(5, 'Sebastian', 'Greenwood', '1995-07-20', 'Segurança', 1),
			(6, 'Lilly', 'Williams', '1988-03-25', 'Professora', 0),
			(7, 'Isabella', 'Williams', '2002-07-12', 'Universitária', 0);

		INSERT INTO Itens (nome, descricao, valor)
		VALUES
			('Mesa de cirurgia', 'Mesa de cirurgia elétrica com regulagem de altura', ''),
			('Bisturi', 'Bisturi de precisão com diversos acessórios', ''),
			('Fechadura', 'Uma fechadura digital com senha.', '00000000'),
			('Anotação', 'Um papel com anotações de alguém.', 'TmFkYSBjb25zZWd1ZSBzdXByaW1pciBhIGN1cmlvc2lkYWRlIGRlIHVtIGh1bWFuby4='),
			('Cama', 'Uma cama de solteiro levemente confortável.', 'Mei');

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
		<div className='chapter-two'>
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
						<p>Pessoas (id, nome, sobrenome, data_nascimento, profissao, is_funcionario)</p>
						<p>Items (id, nome, descricao, valor)</p>
						<p>Vinculo (id, descricao, funcionario_id, pessoa_id)</p>
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

export default ChapterTwo