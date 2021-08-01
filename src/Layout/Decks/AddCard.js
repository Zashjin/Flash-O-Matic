import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { createCard, readDeck } from '../../utils/api/index.js'
import CardForm from "./CardForm.js"


// create a component for adding a card to a deck that takes in 
// the function updateDecks(newDecks) as a prop. this function
// takes the current number of decks, and returns it after adding
// the newly added decks

function AddCard({updateDecks}) {
    // the original state of a card deck is an empty array
    const [deck, setDeck] = useState([])

    
    // the original state of a card is an object containing
    // empty strings for the front and back of the card, as
    // well as it's deck's id
    const [card, addCard] = useState(
        {front: "", 
        back: "", 
        deckId: ""}
        )


    // create a variable for a deck's id to be used as a parameter
    const {deckId} = useParams()


    // use useEffect() to create a callback function with a deck's
    // id as a dependency
    useEffect(() => {

        // use abortController() to abort any web requests for different
        // decks
        const abortController = new AbortController()

        // create a variable that takes a deck's id, and returns it's 
        // api url
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            // with this url, set an array containing the data from the deck
            setDeck(() => response)
        }

        // return the newly created deck
        deckInfo()
        return () => abortController.abort()
    }, [deckId])



    // changeForm takes the targeted deck, and modifies a card's
    // useState to also contain it's name and value 
    const changeForm = ({ target }) => {
        addCard({...card, [target.name]: target.value})
    }


    
    const submitForm = async (event) => {
        event.preventDefault()
        // takes sets a card's object to contain all the
        // correct key/value pairs using addCard()
        addCard({...card, deckId: deckId})
        // makes a post request to add the card to the deck's
        // card list, and stringify's so it is no longer an 
        // object using createCard()
        await createCard(deckId, card)
        // return the new length of the card deck using
        // updateDecks()
        updateDecks(1)
        // update the deck with the newly added card using addCard()
        addCard({front: "", back: "", deckId: ""})
    }


    // display the web page with the following content
    return (
        <div className="col-9 mx-auto">
           
            {/*navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                    {/* a link to the home page */}
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>

                    {/* a link to the deck */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* a link for adding a card */}
                    <li className="breadcrumb-item">
                        Add Card
                        </li>

                </ol>
            </nav>


            <div className="row pl-3 pb-2">
                {/* a heading that display's the deck's name and "add card" */}
                <h1>{deck.name}: Add Card</h1>
            </div>

            {/* display the card form using the cardForm component which will
            display a form for adding content to the front and back of the card,
            as well as a button for finishing, and one for saving the card */}
            <CardForm 
            submitForm={submitForm} 
            changeForm={changeForm} 
            card={card} 
            deckId={deckId} 
            />

        </div>
    )
}

export default AddCard