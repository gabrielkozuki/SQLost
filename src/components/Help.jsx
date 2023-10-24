import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import Collapse from '@kunukn/react-collapse'
import './Help.scss';
import "react-sliding-pane/dist/react-sliding-pane.css";

function Help() {
    const [openPanel, setOpenPanel] = useState(false);
    const [showCollapse, setShowCollapse] = useState([false, false, false, false, false, false, false, false, false, false, false]);

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
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(1)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[1] ? 'fa-rotate-90' : ''}`}></i>
                    O que é SQL?
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[1]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(2)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[2] ? 'fa-rotate-90' : ''}`}></i>
                    Estrutura de comandos
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[2]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(3)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[3] ? 'fa-rotate-90' : ''}`}></i>
                    Selecionar todos os dados de uma tabela (SELECT)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[3]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(4)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[4] ? 'fa-rotate-90' : ''}`}></i>
                    Selecionar colunas específicas
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[4]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(5)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[5] ? 'fa-rotate-90' : ''}`}></i>
                    Ordenar linhas (ORDER BY)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[5]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(6)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[6] ? 'fa-rotate-90' : ''}`}></i>
                    Filtrar linhas (WHERE)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[6]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(7)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[7] ? 'fa-rotate-90' : ''}`}></i>
                    Operadores condicionais (AND, OR)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[7]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(8)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[8] ? 'fa-rotate-90' : ''}`}></i>
                    Atualizar linhas (UPDATE)
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[8]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(9)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[9] ? 'fa-rotate-90' : ''}`}></i>
                    Dicas
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[9]}>
                    <div className="content-collapse">...</div>
                </Collapse>

                <div className="row" onClick={() => handleCollapse(10)}>
                    <i className={`fa-solid fa-angle-right ${showCollapse[10] ? 'fa-rotate-90' : ''}`}></i>
                    Saiba mais
                </div>
                <Collapse transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`} isOpen={showCollapse[10]}>
                    <div className="content-collapse">...</div>
                </Collapse>

            </SlidingPane>
        </div>
    );
}

export default Help;