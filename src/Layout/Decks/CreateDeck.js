import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { createDeck } from '../../utils/api/index.js'


function CreateDeck({updateDecks}) {
    const [newDeck, setNewDeck] = useState({name: "", description: ""})

    const history = useHistory()

    const changeForm = ({ target }) => {
        setNewDeck({...newDeck, [target.name]: target.value})
    }
    
    const submitForm = async (event) => {
        event.preventDefault()
        const response = await createDeck(newDeck)
        // push the deck into history using the useHistory() hook
        history.push(`/decks/${response.id}`)
        // update the card deck using updateDeck()
        updateDecks(1)
    }


    // return a webpage containing the following content
    return (
        <div className="col-9 mx-auto">
            
            {/* a navigation bar that contains two links */}
            <nav aria-label="breadcrumb">

                <ol className="breadcrumb">                  
                    <li className="breadcrumb-item">
                        {/* a link the redirects to the home page */}
                        <Link to={"/"}>
                            <i 
                            className="fa fa-home" 
                            aria-hidden="true">
                            </i> 
                            Home
                        </Link>
                    </li>
                    
                    {/* a label for the current page that says "create deck" */}
                    <li 
                    className="breadcrumb-item"
                    >Create Deck
                    </li>                
                </ol>

            </nav>

            {/* a form for the following content */}
            <form 
                onSubmit={submitForm}>

                    {/* a text input for the card deck's name */}
                <div className="form-group">
                    <label>
                        Name
                    </label>

                    <input 
                        type="text" 
                        name="name"
                        value={newDeck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder="Deck Name" 
                    />
                </div>

                {/* a text area for the card's description */}
                <div className="form-group">
                    <label>
                        Description
                    </label>

                    <textarea
                    name="description" 
                    value={newDeck.description}
                    onChange={changeForm}
                    className="form-control" 
                    id="description" 
                    placeholder="Brief description of the deck."
                    rows={4}
                    />
                </div>

                {/* a button for cancelling the deck */}
                <Link 
                    to="/" 
                    name="cancel" 
                    className="btn btn-secondary mr-3">
                    Cancel
                </Link>

                {/* a button for submitted the deck */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Submit
                </button>

            </form>
            
        </div>
    )
}

export default CreateDeck