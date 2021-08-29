import React from "react";

// a single reusable input for a coin. updates its state on change.
function CoinInput({ index, coin, state }) {
    const [coins, setCoins] = state; // grab state from props

    // update coins state when this input is changed
    const handleChange = event => {
        const { value } = event.target;

        const quantity = parseInt(value) || 0; // short circuit to zero
        
        // deep copy coins and set new value
        const newCoins = [ ...coins ];
        newCoins[index] = { ...coin, quantity };
        
        setCoins(newCoins);
    };

    return (<div className="d-flex flex-column">
        <label htmlFor={coin.name} className="h5">{coin.name}</label>
        <input
            type="number"
            name={coin.name}
            id={coin.name}
            min="0"
            onChange={handleChange}
            className="w-50"
        />
    </div>);
}

export default CoinInput;
