import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

// track coin and drink inputs in form, then fetch on submit.
// if 200, load receipt modal and clear form, otherwise display error.
function DrinkMachine() {
    const coinTypes = [
        { name: "Pennies", value: 1 },
        { name: "Nickels", value: 5 },
        { name: "Dimes", value: 10 },
        { name: "Quarters", value: 25 }
    ];
    const [coins, setCoins] = useState(coinTypes);

    const [drinks, setDrinks] = useState({});

    // at start, fetch values for drinks
    useEffect(() => {
        const initialFetch = async () => {
            const response = await fetch("https://localhost:5001/api/drinkmachine", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            console.log(response, response.ok);
            const data = await response.json();
            setDrinks(data);
            console.log(data);
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
            <form onSubmit={handleSubmit}>
                {/* coins list */}
                <div className="d-flex">
                    {/* products list */}
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
