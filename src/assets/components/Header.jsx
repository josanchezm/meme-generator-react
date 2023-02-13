import trollFace from '../components/images/Troll Face.png'

export default function Header () {
    const test = () => console.log('Hover is working');
    return (
        <header>
            <div className="header-meme-logo">
                {/* Event listener that fires when the user hover over the image */}
                <img src={trollFace} onMouseOver={test} alt="Meme generator" />
                <h2>Meme Generator</h2>
            </div>
            <p>React Course - Project 3</p>
        </header>
    )
}