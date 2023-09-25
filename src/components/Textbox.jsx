import './Textbox.scss'
import { Typewriter } from "./Typewriter";

const Textbox = (props) => {
    const flow = props.flow
    const data = props.data[flow]
    const dialogue = Typewriter(data.text, data.speed)

    return (
        <div className='textbox'>
            <img className='sprite' src={'/sprites/' + data.sprite}></img>
            <div className='baloon-text'>{dialogue}</div>
        </div>
    )
}

export default Textbox