import React from 'react'
import './Play.scss'
import { useNavigate } from 'react-router-dom';

const Play = () => {
    const navigate = useNavigate()

    const handleJogar = (url) => {
        return navigate(url)
    }

    return (
        <div className='play'>
            <h1>Seleção de Capítulo</h1>
            <div className="row">
                <div className="button" onClick={() => handleJogar('/play/chapter-one')}>I</div>
                <div className="button" onClick={() => handleJogar('/play/chapter-two')}>II</div>
                <div className="button" onClick={() => handleJogar('/play/chapter-three')}>III</div>
            </div>
        </div>
    )
}

export default Play