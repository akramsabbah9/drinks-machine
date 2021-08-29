import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CoinInput from "./CoinInput";

// track coin and drink inputs in form, then fetch on submit.
// if 200, load receipt modal and clear form, otherwise display error.
function DrinkMachine() {
    const coinTypes = [
        { name: "Pennies", value: 1, quantity: 0 },
        { name: "Nickels", value: 5, quantity: 0 },
        { name: "Dimes", value: 10, quantity: 0 },
        { name: "Quarters", value: 25, quantity: 0 }
    ];

    // coins: coins to use. inventory: drinks in machine. drinks: drinks to be purchased.
    const [coins, setCoins] = useState(coinTypes);
    const [inventory, setInventory] = useState({});
    const [drinks, setDrinks] = useState({});

    // on render, set the values of inventory and drinks
    useEffect(() => {
        const initialFetch = async () => {
            // fetch drink data from machine and set initial inventory
            const response = await fetch("api/drinkmachine", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            setInventory(data);

            // then scrub quantities from data and set as initial drinks value
            const scrubbedData = {};

            for(const [key, value] of Object.entries(data)) {
                scrubbedData[[key]] = { ...value, quantity: 0 };
            }
            
            setDrinks(scrubbedData);
        };

        try {
            initialFetch();
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    // submit form, awaiting response. Then update drinks and show modal
    const handleSubmit = async event => {
        event.preventDefault();

        console.log("clicked")
        
        // validate: nonzero drink quantities & payment total, non-neg coins

        const response = await fetch("api/drinkmachine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "drinks": drinks, "payment": coins
            })
        });

        // if server sends back 400, display the error message and clear form
        if (!response.ok) {
            console.log(response);
            return;
        }
        const data = await response.json();

        // upon receiving the updated data and change, render modal and clear form
    };

    return (<>
        <Container fluid="md" className="px-md-5">
            <h1>Insert Coins</h1>
            <br />
            <form id="vending-machine" onSubmit={handleSubmit}>
                {/* coins list */}
                <h2>Coin Information</h2>
                <br />
                <div className="d-flex justify-content-between">
                    {coins.map((coin, index) =>
                        <CoinInput
                            key={coin.name}
                            index={index}
                            coin={coin}
                            state={[coins, setCoins]}
                        />
                    )}
                </div>
                <br />
                <div className="d-flex">
                    {/* products list */}
                    <h2>Product Information</h2>
                    <ul>
                        {/* drinks here */}
                    </ul>
                    {/* Order Total */}
                </div>
                {/* submit button */}
                <div className="d-flex justify-content-end">
                    <button type="submit">GET DRINKS</button>
                </div>
                {/* error message display */}
            </form>
        </Container>
    </>)
}

export default DrinkMachine;
