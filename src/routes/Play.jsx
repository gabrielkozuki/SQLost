import React from 'react'
import './Play.scss'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
                <div className="button">III</div>
                
            </div>
            {/*<div className="trophy">
                <EmojiEventsIcon fontSize="inherit" />
            </div>*/}
        </div>
    )
}

export default Play