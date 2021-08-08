import React from 'react';
import {Link} from 'react-router-dom';

function CardForm(
      { submitForm, 
        changeForm, 
        card, 
        deckId }
    ) {
    
    // using these props, display the following content on the page:
    return (

        <form 
        id="cardForm" 
        onSubmit={submitForm}
        >
                <div className="form-group">
                    {/* a text area for the front of the card's content */}
                    <label>
                        Front
                    </label>
                    <textarea  
                        name="front"
                        value={card.front}
                        onChange={changeForm}
                        id="front" 
                        className="form-control" 
                        placeholder="Front side of card"
                        rows={4}
                    />
                </div>


                <div className="form-group">
                    {/* a text area for the back of the card's content */}
                    <label>Back</label>
                    <textarea
                    name="back" 
                    value={card.back}
                    onChange={changeForm}
                    className="form-control" 
                    id="back" 
                    placeholder="Back side of card"
                    rows={4}
                    />
                </div>

                {/* a button for when card form is completed */}
                <Link 
                    to={`/decks/${deckId}`} 
                    name="cancel" 
                    className="btn btn-secondary mr-3">
                    Done
                </Link>

                {/* a button for saving the card's content */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Save
                </button>
                
            </form>
    )

}

export default CardForm