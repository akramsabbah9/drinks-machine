import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { coinName } from "../utils/helpers";

// modal to display receipt of purchase after completed transaction.
function ReceiptModal({ show, setModal, data }) {
    const { drinks, total, payment, change } = data;

    // helper function to tally total value of money
    const totalMoney = money => (money)
        ? money.map(c => c.value * c.quantity).reduce((p, n) => p + n)
        : 0;

    // helper function to list all coins in an array
    const listMoney = money => (money)
        ? money
            .filter(c => c.quantity > 0)
            .map(c => `${c.quantity} ${coinName(c.value, c.quantity)}`)
            .join(", ")
        : null;

    // when modal is closed, update show state
    const toggle = () => setModal(!show);

    return(
    <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Purchase Receipt</ModalHeader>
        <ModalBody>
            <h4>Purchase Details</h4>
            {/* display purchased drinks */}
            <div className="d-flex justify-content-end">
                {/* list in format of NAME, X drinks */}
                <ul>
                {(data.drinks)
                    ? Object.keys(drinks)
                        .filter(d => drinks[d].quantity > 0)
                        .map(d => {
                            const cur = drinks[d];
                            let amt = cur.quantity === 1 ? "drink" : "drinks";

                            return <li key={d}>
                                {cur.name}, {cur.quantity} {amt}
                            </li>;
                        })
                    : null
                }
                </ul>
            </div>
            <br />

            <h4>Total Cost</h4>
            <div className="d-flex justify-content-end">
                <p>{total} cents</p>
            </div>
            <br />

            <h4>Your Payment</h4>
            {/* total payment */}
            <div className="d-flex justify-content-end">
                <p>{totalMoney(payment)} cents</p>
            </div>
            {/* coinage of payment */}
            <div className="d-flex justify-content-end">
                <p>({listMoney(payment)})</p>
            </div>
            <br />

            <h4>Change Received</h4>
            {/* total change */}
            <div className="d-flex justify-content-end">
                <p>{totalMoney(change)} cents
                </p>
            </div>
            {/* coinage of change */}
            <div className="d-flex justify-content-end">
                <p>({listMoney(change)})</p>
            </div>

        </ModalBody>
        <ModalFooter>
            <button className="btn btn-lg btn-success" onClick={toggle}>OK</button>
        </ModalFooter>
    </Modal>
    )
}

export default ReceiptModal;
