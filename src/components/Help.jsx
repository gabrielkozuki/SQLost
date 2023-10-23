import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import Collapse from '@kunukn/react-collapse'
import './Help.scss';
import "react-sliding-pane/dist/react-sliding-pane.css";

function Help() {
    const [openPanel, setOpenPanel] = useState(false);
    const [showCollapse, setShowCollapse] = useState(false);

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
                <div className="row" onClick={() => setShowCollapse(!showCollapse)}>
                    <i class="fa-solid fa-angle-right"></i>
                    Sobre o jogo
                </div>
                <Collapse isOpen={showCollapse}>
                    <div>Teste</div>
                </Collapse>

            </SlidingPane>
        </div>
    );
}

export default Help;