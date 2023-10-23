import React, { useEffect, useState } from 'react'
import './ChapterThree.scss'
import data from '../data/capitulo-tres.json';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox'
import Editor from '../components/Editor'
import Help from '../components/Help';

const ChapterThree = () => {
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
			data_nascimento VARCHAR,
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

		INSERT INTO Pessoas(id, nome, data_nascimento, profissao, is_funcionario)
		VALUES
			(1091, 'Sam Vincent', '15/05/2029', 'Engenheiro', 0),
			(1092, 'Hannah Cooper', '10/12/2019', 'Cientista', 1),
			(1093, 'Benjamin Smith', '22/07/2029', 'Advogado', 0),
			(1094, 'David Williams', '07/03/2016', 'Cirurgião', 1),
			(1095, 'Sebastian Greenwood', '27/07/2009', 'Segurança', 1),
			(1096, 'Lilly Williams', '25/03/2034', 'Cantora', 0),
			(1097, 'Isabella Williams', '12/07/2036', 'Universitária', 0),
			(1098, 'Ben Johnson', '18/09/2018', 'Cirurgião', 0);

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
					if (res.columns.length == 4 && res.values.length == 1) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'descricao' && res.columns[3] == 'valor') {
							if (res.values[0][0] == 5083) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 2:
					if (res.columns.length == 5 && res.values.length == 3) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'profissao' && res.columns[4] == 'is_funcionario') {
							if (res.values[0][0] == 1094 && res.values[1][0] == 1096 && res.values[2][0] == 1097) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 3:
					if (res.columns.length == 4 && res.values.length == 3) {
						if (res.columns[0] == 'id' && res.columns[1] == 'descricao' && res.columns[2] == 'funcionario_id' && res.columns[3] == 'pessoa_id') {
							if (res.values[0][0] == 1094 && res.values[1][0] == 1096 && res.values[2][0] == 1097) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 4:
					if (res.columns.length == 5 && res.values.length == 3) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'profissao' && res.columns[4] == 'is_funcionario') {
							if (res.values[0][0] == 1091 && res.values[1][0] == 1094 && res.values[2][0] == 1098) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 5:
					if (res.columns.length == 5 && res.values.length == 3) {
						if (res.columns[0] == 'id' && res.columns[1] == 'nome' && res.columns[2] == 'data_nascimento' && res.columns[3] == 'profissao' && res.columns[4] == 'is_funcionario') {
							if ((res.values[0][0] == 1094 && res.values[1][0] == 1097) || (res.values[0][0] == 1097 && res.values[1][0] == 1094)) {
								arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
								setFlow(flow + 1)
								break;
							}
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>Os resultados estão incorretos.</p>)
					break;

				case 6:
					// corrigir mensagem de erro
					if (!res.length > 0) {
						if (!(res.props.children[0].toLowerCase().includes('erro'))) {
							arr.push(<p className="console-success" key={arr.length}>Ok!</p>)
							setFlow(flow + 1)
							break;
						} else {
							arr.push(<p className="console-fail" key={arr.length}>Verifique se os valores estão sendo atualizados corretamente.</p>)
							break
						}
					}

					arr.push(<p className="console-fail" key={arr.length}>O resultado está retornando uma tabela.</p>)
					break;
			}

			setConsoleComponents(arr)

		} catch (err) {
			console.log(err)
		}
	}

	const handleContinuar = () => {
		if (flow < data.length - 1) {
			if (data[flow].type === 'dialogue') {
				setFlow(flow + 1)
			}
		}
		handleModal()
	}

	const handleVoltar = () => {
		if (flow > 0) {
			setFlow(flow - 1)
		}
	}

	const handleModal = () => {
		if (flow == data.length - 1) {
			setModalIsOpen(!modalIsOpen)
		}
	}

	return (
		<div className='chapter-three'>
			<Help />
			<div className='wrapper'>
				<div className="textbox-container">
					<Textbox data={data} flow={flow} />
					<div className="row-btn">
						<button className='btn-voltar' onClick={handleVoltar}>Voltar</button>
						<button className='btn-continuar' onClick={handleContinuar} style={{visibility: data[flow].type === 'dialogue' ? 'visible' : 'hidden' }}>Continuar</button>
					</div>
				</div>

				<div className="editor-container">
					<Editor script={script} type={data[flow].type} consoleComponents={consoleComponents} setConsoleComponents={setConsoleComponents} handleExercise={handleExercise} chapter={3} indexJson={data[flow].index} />
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

export default ChapterThree