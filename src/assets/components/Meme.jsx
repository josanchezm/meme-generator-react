import picture from './images/picture.png'
import { useState, useEffect, React } from 'react';

export default function Meme () {
    // Setting the count that will be used to update the meme images
    const [count, setCount] = useState(0)

    // Setting the default state for the meme images
    const [memeImg, setMemeImg] = useState('http://i.imgflip.com/1bij.jpg')

    // useEffect to make API calls so we can update the meme image url

    /*
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    useEffect(() => {    
        // Retrieving data from the API via an async/await function 
        const apiReq = async () => {
            const res = await fetch('https://api.imgflip.com/get_memes')
            const memesData = await res.json()
            setMemeImg(memesData.data.memes[Math.floor(Math.random() * memesData.data.memes.length)].url)
        }
        apiReq()
    }, [count])

    // Giving the meme url as the value of memeImg
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        memeUrlImg: memeImg
    })

    // Handling the changes on the input fields se we can update the top and bottom text of the memes
    const handleChange = event => setMeme(prevState => {
        const {name, value} = event.target
        return ({
            ...prevState,
            [name]: value,
        })
    })

    // Setting the new state of meme, changing its image url
    const randomMeme = () => {
        // Adding one unit to the count, so it gets changed and therefore our useEffect callback function re-runs, changing the meme URL
        setCount(prevState => prevState + 1)
        setMeme(prevState => ({
            ...prevState,
            memeUrlImg: memeImg
        }))
    }

    // // Props

    // // displaying variables into the DOM
    // const thingsArray = ["Thing 1", "Thing 2"]

    // // Rendering multiple labels into the DOM via a function
    // const mappedThings = thingsArray.map(thing => <p key={thing}>{thing}</p>) 

    // // Adding things to an array via an event listener
    // const addingThings = () => {
    //     const newThing = `Thing ${thingsArray.length+1}`
    //     thingsArray.push(newThing)
    //     console.log(thingsArray);
    // }

    // // State: props

    // // Using React.useState for changing elements in the DOM
    // const [things, setThings] = React.useState(["Thing 1", "Thing 2"])

    // // Adding things to an array via an event listener for rendering the changes on the DOM
    // const addItems = () => {
    //     const newThing = `Thing ${things.length+1}`
    //     setThings(prevState => [...prevState, newThing])
    // }

    // // Rendering the changes on the DOM
    // const thingsElements = things.map(thing => <p key={thing}>{thing}</p>)

    return (
        <main>
            <div className="meme-form">
                <input type="text" placeholder='Shut up' name='topText' value={meme.topText} onChange={handleChange}/>
                <input type="text" placeholder='and take my money' name='bottomText' value={meme.bottomText} onChange={handleChange}/>
                {/* Even listeners on React */}
                <button type='submit' onClick={randomMeme}>Get a new meme image <img src={picture} alt="Picture icon" /></button>
            </div>
            <div className="meme">
                <img src={meme.memeUrlImg} className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}