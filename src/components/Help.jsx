import React, { useState } from 'react';
import './Help.scss';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

function Help() {
    const [openPanel, setOpenPanel] = useState(false);

    return (
        <div className="help-panel">
            <div className='help-button' onClick={() => setOpenPanel(true)}>?</div>

            <SlidingPane
                closeIcon={<div>Fechar</div>}
                isOpen={openPanel}
                title="Ajuda"
                from="left"
                width="45%"
                onRequestClose={() => setOpenPanel(false)}
            >
                <div>And I am pane content on left.</div>
            </SlidingPane>
        </div>
    );
}

export default Help;