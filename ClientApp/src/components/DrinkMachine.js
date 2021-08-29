import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

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

    // at start, fetch values for drinks
    useEffect(() => {
        const initialFetch = async () => {
            const response = await fetch("api/drinkmachine", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            setInventory(data);

            // then scrub quantities from data and set as initial drinks value
            const scrubbedData = {};

            for(const [key, value] of Object.entries(data)) {
                console.log(key, value);
                scrubbedData[[key]] = { ...value, quantity: 0 };
            }
            console.log(data, scrubbedData);
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
    const handleSubmit = function(event) {
        event.preventDefault();
    };

    return (<>
        <Container fluid="md" className="px-md-5">
            <h1>Insert Coins</h1>
            <form id="vending-machine" onSubmit={handleSubmit}>
                {/* coins list */}
                <div className="d-flex">
                    <h2>Coin Information</h2>
                </div>
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
                    <button type="submit">Submit</button>
                </div>
                {/* error message display */}
            </form>
        </Container>
    </>)
}

export default DrinkMachine;
