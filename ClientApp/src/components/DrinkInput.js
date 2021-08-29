import React from "react";

// a single reusable input for a drink. updates its state on change.
function DrinkInput({ name, drink, formState }) {
    const [drinks, setDrinks] = formState; // grab state from props

    // update coins state when this input is changed
    const handleChange = event => {
        const { value } = event.target;

        const quantity = parseInt(value) || 0; // short circuit to zero

        console.log( { ...drinks, [name]: { ...drink, quantity } } );
        
        // set drinks state with new value
        setDrinks({ ...drinks, [name]: { ...drink, quantity } });
    };

    return (<li className="d-flex justify-content-between">
        {/* drink name, quantity and price */}
        <div className="d-flex flex-column">
            <label htmlFor={name} className="h5">{name}</label>
            <span>
                {drink.quantity} {drink.quantity === 1 ? "drink" : "drinks"} available,
                Cost = {drink.price}
            </span>
        </div>
        {/* form input */}
        <input
            type="number"
            name={name}
            id={name}
            min="0"
            onChange={handleChange}
        />
    </li>);
}

export default DrinkInput;