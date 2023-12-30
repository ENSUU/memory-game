import '../styles/Card.css';

export default function Card ({ emoji, onClick}) {
    return (
        <div className="card">
            <p className="emoji no-highlight" data-unicode={emoji.unicodeName} onClick={onClick}>{emoji.character}</p>
        </div>
    )
}
