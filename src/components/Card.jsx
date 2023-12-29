import '../styles/Card.css';

export default function Card ({ emoji, onClick}) {
    return (
        <div className="card" onClick={onClick}>
            <p className="emoji no-highlight">{emoji.character}</p>
        </div>
    )
}
