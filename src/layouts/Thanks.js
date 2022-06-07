import { Link } from "react-router-dom";
import '../css/thanks.css';
export default function Thanks(){
    return(
        <div className="screen">
        <div className="thanks-cont">
        <div>
            <h2>Thank you!</h2>
            <h6>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</h6>
        </div>
            <button><Link to="/">Back to shop</Link></button>
        </div>
        </div>
    )
}