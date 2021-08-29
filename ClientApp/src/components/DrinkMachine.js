import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CoinTypes from "../utils/cointypes";
import CoinInput from "./CoinInput";
import DrinkInput from "./DrinkInput";
import ReceiptModal from "./ReceiptModal";
import { scrubDrinks, validateForm, resetForm, totalCost } from "../utils/helpers";
import './DrinkMachine.css';

const coinTypes = CoinTypes.generateCoinTypes();

// track coin and drink inputs in form, then fetch on submit.
// if 200, load receipt modal and clear form, otherwise display error.
function DrinkMachine() {

    // coins: coins to use. inventory: drinks in machine. drinks: drinks to be purchased.
    // error: error to display, if any. idList: list of inputs to clear after form submit.
    const [coins, setCoins] = useState(coinTypes);
    const [inventory, setInventory] = useState({});
    const [drinks, setDrinks] = useState({});
    const [error, setError] = useState("");
    const [idList, setInputIds] = useState([]);
    const [showModal, setModal] = useState(false); // modal toggle
    const [modalData, setModalData] = useState({}); // modal data


    // on render, set the values of inventory and drinks
    // also set ids of form inputs to idList
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
            const scrubbedData = scrubDrinks(data);
            setDrinks(scrubbedData);

            // finally, set form input ids based off coin and drink names
            const inputIds = coinTypes.map(e => e.name);
            Object.keys(data).forEach(drink => inputIds.push(drink));
            setInputIds(inputIds);
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
        
        // validate: nonzero drink quantities & payment total, non-neg coins
        if (!validateForm(coins, drinks, setError)) return false;

        const response = await fetch("api/drinkmachine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "drinks": drinks, "payment": coins
            })
        });

        // if server sends back 400, display the error message and clear form
        if (!response.ok) {
            let text = await response.text();
            return setError(text);
        }
        const data = await response.json();

        // upon receiving the updated data and change, render modal
        setModalData({
            drinks: drinks,
            total: totalCost(drinks),
            payment: coins,
            change: data.payment
        });
        setModal(true);

        // clear form and its state
        resetForm(idList);
        setInventory(data.drinks);
        setDrinks(scrubDrinks(data.drinks));
        setCoins(coinTypes);
    };

    return (<>
        {/* modal for purchase receipt */}
        <ReceiptModal
            show={showModal}
            setModal={setModal}
            data={modalData}
        />
        <Container fluid="md" className="px-md-5">
            <form id="vending-machine" className="p-3" onSubmit={handleSubmit}>
                {/* coins list */}
                <h2>Coin Information</h2>
                <br />
                <div className="d-flex flex-wrap px-3 justify-content-between">
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
                <h2>Product Information</h2>
                <br />
                <Row className="d-flex">
                    {/* products list */}
                    <Col md>
                    <ul className="pl-3">
                        {Object.keys(drinks).map(name =>
                            <DrinkInput
                                key={name}
                                name={name}
                                drink={inventory[name]}
                                formState={[drinks, setDrinks]}
                            />
                        )}
                    </ul>
                    </Col>
                    {/* Order Total: get total cost of all purchased drinks */}
                    <Col className="my-auto pb-4 ml-4 order-total" md>
                        <span className="h3">Order Total: </span>
                        {/* if drinks are set, tally up their total cost. */}
                        <span>
                            {Object.keys(drinks).length
                                ? totalCost(drinks)
                                : 0} cents
                        </span>
                    </Col>
                </Row>
                {/* submit button */}
                <div className="d-flex justify-content-end pr-3">
                    <button
                        type="submit"
                        className="btn-outline-dark purchase-button"
                    >GET DRINKS</button>
                </div>
                {/* error message display */}
                {error
                    ? <span className="error">Error: {error}</span>
                    : <br />}
            </form>
        </Container>
    </>)
}

export default DrinkMachine;
