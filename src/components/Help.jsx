import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import Collapse from '@kunukn/react-collapse'
import './Help.scss';
import "react-sliding-pane/dist/react-sliding-pane.css";

function Help() {
    const [openPanel, setOpenPanel] = useState(false);
    const [showCollapse, setShowCollapse] = useState([false, false, false, false, false, false, false, false]);

    const handleCollapse = (index) => {
        let arr_collapse = showCollapse.map((valor, i) => {
            if (index == i) {
                return !valor;
            } else {
                return valor;
            }
        });

        setShowCollapse(arr_collapse);
    }

    return (
        <div className="help-panel">
            <div className='help-button' onClick={() => setOpenPanel(true)}>?</div>

            <SlidingPane
                className="slide-container"
                closeIcon={<div>X (Fechar)</div>}
                isOpen={openPanel}
                title="Ajuda"
                from="left"
                width="45%"
                onRequestClose={() => setOpenPanel(false)}
            >
                <div className="row" onClick={() => handleCollapse(0)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[0] ? 'fa-rotate-90' : ''}`}></i>
                    Sobre o jogo
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[0]}>
                    <div className="content-collapse">
                        <p>SQLost é um jogo educacional criado para auxiliar no processo de ensino e aprendizado de conteúdos de banco de dados por meio da linguagem de consulta estruturada SQL.</p>
                        <p>Este projeto é um resultado do Trabalho de Conclusão de Curso apresentado ao Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal do Paraná - Campus Londrina.</p>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(1)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[1] ? 'fa-rotate-90' : ''}`}></i>
                    O que é SQL?
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[1]}>
                    <div className="content-collapse">
                        <p>SQL, ou Structured Query Language (Linguagem de Consulta Estruturada) é uma linguagem criada para operar bancos de dados relacionais, sendo amplamente utilizada para armazenar, manipular e recuperar dados armazenados em tabelas.</p>
                        <p>Uma tabela é uma estrutura organizada para armazenar dados de maneira tabular. Ela é composta por linhas e colunas, onde cada linha em uma tabela representa um registro ou entrada de dados específica, enquanto as colunas definem os tipos de informações que estão sendo armazenadas.</p>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(2)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[2] ? 'fa-rotate-90' : ''}`}></i>
                    Estrutura de uma instrução SQL
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[2]}>
                    <div className="content-collapse">
                        <p>Uma instrução SQL é uma instrução que você envia a um banco de dados para realizar uma operação específica. Ele é composto por uma lista ordenada de cláusulas, como SELECT, FROM, WHERE, etc. Instruções SQL devem sempre terminar com ponto e vírgula (;).</p>
                        <p>Além disso, a linguagem SQL não diferencia as palavras-chave maiúsculas de minúsculas: ‘select’ é a mesma coisa que ‘SELECT’, ou seja, não é case sensitive.</p>
                        <p>Explore as seções abaixo para conhecer a sintaxe dos comandos que são apresentados ao decorrer do jogo!</p>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(3)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[3] ? 'fa-rotate-90' : ''}`}></i>
                    Selecionar todos os dados de uma tabela (SELECT)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[3]}>
                    <div className="content-collapse">
                        <p>A cláusula SELECT é uma das mais fundamentais no SQL, pois é usada para recuperar dados de uma tabela. Para selecionar todos os dados de uma tabela:</p>
                        <div className="script-example"><span className='sql-command'>SELECT</span> * <span className='sql-command'>FROM</span> nome_da_tabela;</div>
                        <ul>
                            <li>‘SELECT’: cláusula que indica que você deseja recuperar dados;</li>
                            <li>‘*’ (asterisco): um curinga que representa todas as colunas da tabela;</li>
                            <li>‘FROM’: indica de qual tabela você deseja obter os dados;</li>
                            <li>‘nome_da_tabela’: nome da tabela da qual você deseja selecionar todos os dados.</li>
                        </ul>
                        <p>Caso queira selecionar colunas específicas da tabela na sua consulta, você pode substituir o símbolo ‘*’ pelos nomes da coluna que deseja.</p>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(4)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[4] ? 'fa-rotate-90' : ''}`}></i>
                    Ordenar linhas (ORDER BY)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[4]}>
                    <div className="content-collapse">
                        <p>A cláusula ORDER BY é usada para classificar os resultados da consulta de acordo com uma ou mais colunas de uma tabela, sendo útil quando desejar que os resultados sejam exibidos em uma ordem específica.</p>
                        <div className="script-example">
                            <span className='sql-command'>SELECT</span> coluna1, coluna2, ... <br />
                            &nbsp;&nbsp;<span className='sql-command'>FROM</span> nome_da_tabela <br />
                            &nbsp;&nbsp;<span className='sql-command'>ORDER BY</span> coluna_para_ordenar [<span className='sql-command'>ASC</span> | <span className='sql-command'>DESC</span>]; <br />
                        </div>
                        <ul>
                            <li>‘ORDER BY’: cláusula que especifica como os resultados devem ser ordenados;</li>
                            <li>‘coluna_para_ordenar’ nome da coluna pela qual você deseja ordenar os resultados;</li>
                            <li>‘[ASC | DESC]’: é opcional e determina a direção da ordenação. ASC significa em ordem ascendente (do menor para o maior) e DESC significa em ordem descendente (do maior para o menor).</li>
                        </ul>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(5)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[5] ? 'fa-rotate-90' : ''}`}></i>
                    Filtrar linhas (WHERE)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[5]}>
                    <div className="content-collapse">
                        <p>A cláusula WHERE é usada para filtrar as linhas de uma tabela com base em uma condição especificada. Essa cláusula é essencial para recuperar apenas os dados que atendam a critérios específicos.</p>
                        <div className="script-example">
                            <span className='sql-command'>SELECT</span> coluna1, coluna2, ... <br />
                            &nbsp;&nbsp;<span className='sql-command'>FROM</span> nome_da_tabela <br />
                            &nbsp;&nbsp;<span className='sql-command'>WHERE</span> condição; <br />
                        </div>
                        <ul>
                            <li>‘WHERE’: é a cláusula que define a condição pela qual você deseja filtrar as linhas.</li>
                            <li>‘condição’: expressão que avalia se uma linha deve ser incluída no resultado ou não.</li>
                        </ul>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(6)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[6] ? 'fa-rotate-90' : ''}`}></i>
                    Operadores condicionais
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[6]}>
                    <div className="content-collapse">
                        <p>Condições são expressões que você usa na cláusula WHERE para especificar critérios que determinam quais linhas da tabela devem ser incluídas no resultado da consulta.</p>
                        <p>As condições são construídas com base em operadores e valores, e elas ajudam a filtrar os dados com base em regras específicas. Alguns dos operadores mais comuns são:</p>
                        <br />
                        <p><span style={{textDecoration: 'underline', textDecorationThickness: '2px'}}>Operadores de comparação</span>: são usados para comparar valores e criar condições. Alguns operadores comuns incluem:</p>
                        <ul>
                            <li>‘=’ (igual): verifica se dois valores são iguais</li>
                            <li>‘!=’ (diferente): verifica se dois valores são diferentes</li>
                            <li>‘&lt;’ (menor que): verifica se o valor à esquerda é menor que o valor à direita</li>
                            <li>‘&gt;’ (maior que): verifica se o valor à esquerda é maior que o valor à direita    </li>
                        </ul>
                        <p><span style={{textDecoration: 'underline', textDecorationThickness: '2px'}}>Operadores lógicos</span>: são usados para combinar condições. Os operadores lógicos mais comuns incluem:</p>
                        <ul>
                            <li>‘AND’ (E): retorna verdadeiro se todas as condições forem verdadeiras;</li>
                            <li>‘OR’ (OU): retorna verdadeiro se pelo menos uma das condições for verdadeira;</li>
                        </ul>
                        <p>É possível usar quantos operadores lógicos quiser em conjunto para criar condições mais complexas:</p>
                        <div className="script-example">
                        <span className='sql-command'>SELECT</span> * <span className='sql-command'>FROM</span> nome_da_tabela <br />
                        <span className='sql-command'>WHERE</span> coluna_x = valor_x <br />
                            &nbsp;&nbsp;<span className='sql-command'>AND</span> coluna_y &gt; valor_z <br />
                            &nbsp;&nbsp;<span className='sql-command'>AND</span> coluna_z != valor_qualquer;
                        </div>
                    </div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(7)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[7] ? 'fa-rotate-90' : ''}`}></i>
                    Atualizar linhas (UPDATE)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[7]}>
                    <div className="content-collapse">
                        <p>A cláusula UPDATE é usada para modificar os dados existentes em uma tabela. Com esse comando, você pode fazer alterações em um ou mais campos de uma ou várias linhas, de acordo com uma condição específica.</p>
                        <div className="script-example">
                            <span className='sql-command'>UPDATE</span> nome_da_tabela<br />
                            &nbsp;&nbsp;<span className='sql-command'>SET</span> coluna1 = novo_valor1, coluna2 = novo_valor2, ...<br />
                            &nbsp;&nbsp;<span className='sql-command'>WHERE</span> condição;<br />
                        </div>
                        <ul>
                            <li>‘UPDATE’: cláusula que indica que você deseja atualizar os dados;</li>
                            <li>‘SET’: é usado para especificar quais colunas devem ser atualizadas e quais valores devem ser atribuídos a elas;</li>
                            <li>‘SET coluna1 = novo_valor1, coluna2 = novo_valor2, …’: lista as colunas que serão atualizadas e os novos valores que serão atribuídos a elas;</li>
                            <li>‘WHERE’: é opcional, mas geralmente usado para limitar as atualizações apenas às linhas que atendem a uma determinada condição.</li>
                        </ul>
                    </div>
                </Collapse>
            </SlidingPane>
        </div>
    );
}

export default Help;