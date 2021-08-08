import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { createCard, readDeck } from '../../utils/api/index.js'
import CardForm from "./CardForm.js"


// create a component for adding a card to a deck that takes in 
// the function updateDecks(newDecks) as a prop. this function
// takes the current number of decks, and returns it after adding
// the newly added decks

function AddCard({updateDecks}) {
    const [deck, setDeck] = useState([])
    const [card, addCard] = useState(
        {front: "", 
        back: "", 
        deckId: ""}
        )
    const {deckId} = useParams()

    useEffect(() => {

        const abortController = new AbortController()

        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
        }
        deckInfo()
        return () => abortController.abort()
    }, [deckId])



    const changeForm = ({ target }) => {
        addCard({...card, [target.name]: target.value})
    }


    
    const submitForm = async (event) => {
        event.preventDefault()
        addCard({...card, deckId: deckId})
        await createCard(deckId, card)
        updateDecks(1)
        addCard({front: "", back: "", deckId: ""})
    }


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