import './Textbox.scss'
import { Typewriter } from "./Typewriter";

const Textbox = (props) => {
    const flow = props.flow
    const data = props.data[flow]
    const dialogue = Typewriter(data.text, data.speed)

    return (
        <div className='textbox'>
            <div className="background" style={{backgroundImage: `url(/backgrounds/${data.background})`}}>
                <img className='sprite' src={'/sprites/' + data.sprite} style={{display: data.sprite ? 'inline' : 'none'}}></img>
            </div>
            <div className='baloon-text'>{dialogue}</div>
        </div>
    )
}

export default Textbox