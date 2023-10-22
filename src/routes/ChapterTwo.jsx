import React, { useEffect, useState } from 'react'
import './ChapterTwo.scss'
import data from '../data/capitulo-dois.json';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Help from '../components/Help';

const ChapterTwo = () => {
	const [flow, setFlow] = useState(0);
	const [consoleComponents, setConsoleComponents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	Modal.setAppElement('#root');
	const navigate = useNavigate()

	let script = `
		CREATE TABLE Itens(
			id INT PRIMARY KEY,
			nome VARCHAR,
			descricao VARCHAR,
			valor VARCHAR
		);
		
		CREATE TABLE Pessoas(
			id INT PRIMARY KEY,
			nome VARCHAR,
			sobrenome VARCHAR,
			data_nascimento DATETIME,
			profissao VARCHAR,
			is_funcionario BIT
		);

		CREATE TABLE Relacao(
			id INT PRIMARY KEY,
			descricao VARCHAR,
			funcionario_id INT,
			pessoa_id INT,
			FOREIGN KEY(funcionario_id) REFERENCES Pessoas(id),
			FOREIGN KEY(pessoa_id) REFERENCES Pessoas(id)
		);

		INSERT INTO Pessoas(id, nome, sobrenome, data_nascimento, profissao, is_funcionario)
		VALUES
			(1091, 'Sam', 'Vincent', '1995-05-15', 'Engenheiro', 0),
			(1092, 'Hannah', 'Cooper', '1985-12-10', 'Cientista', 1),
			(1093, 'Benjamin', 'Smith', '1995-07-20', 'Advogado', 0),
			(1094, 'David', 'Williams', '1989-03-07', 'Cirurgião', 1),
			(1095, 'Sebastian', 'Greenwood', '1995-07-20', 'Segurança', 1),
			(1096, 'Lilly', 'Williams', '1988-03-25', 'Professora', 0),
			(1097, 'Isabella', 'Williams', '2002-07-12', 'Universitária', 0);

		INSERT INTO Itens(id, nome, descricao, valor)
		VALUES
			(3257, 'Cama de cirurgia', 'Cama de cirurgia elétrica com regulagem de altura', 'Mei'),
			(6754, 'Bisturi', 'Bisturi de precisão com diversos acessórios', 'Manchas de sangue'),
			(7087, 'Fechadura', 'Uma fechadura digital com senha', '00000000'),
			(7919, 'Anotação', 'Um papel com anotações de alguém', 'Ligar p/ dra. Mariana'),
			(5083, 'Quadro', 'Um quadro com duas pessoas', 'imagem'),
			(2211, 'Mesa comum', 'Uma mesa com alguns itens apoiados em cima', 'quadro, anotação...');

		INSERT INTO Relacao(id, descricao, funcionario_id, pessoa_id)
		VALUES
			(62, 'Marido', 1092, 1091),
			(87, 'Irmão', 1095, 1093),
			(21, 'Filha', 1094, 1097);
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
						<p>Pessoas (id, nome, sobrenome, data_nascimento, profissao, is_funcionario)</p>
						<p>Itens (id, nome, descricao, valor)</p>
						<p>Relacao (id, descricao, funcionario_id, pessoa_id)</p>
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