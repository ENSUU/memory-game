import '../styles/Card.css';

export default function Card ({ emoji }) {
    return (
        <div className="card">
            <p className="emoji">{emoji.character}</p>
        </div>
    )
}
