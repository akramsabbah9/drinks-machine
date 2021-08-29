import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// modal to display receipt of purchase after completed transaction.
function ReceiptModal({ show, setModal, data }) {
    const { drinks, total, change } = data;

    // when modal is closed, update show state
    const toggle = () => setModal(!show);

    return(
    <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Purchase Receipt</ModalHeader>
        <ModalBody>
            <h4>Purchase Details</h4>
            {/* display purchased drinks */}
            <div className="d-flex justify-content-end">
                <ul>
                {(data.drinks)
                    ? Object.keys(drinks)
                        .filter(d => drinks[d].quantity > 0)
                        .map(d => {
                            const cur = drinks[d];
                            let quantity = cur.quantity === 1 ? "drink" : "drinks";

                            return <li key={d}>
                                {cur.quantity} {cur.name} {quantity}
                            </li>;
                        })
                    : null
                }
                </ul>
            </div>
            <br />
            <h4>Total Cost</h4>
            <div className="d-flex justify-content-end">
                <p className="float-right">{total} cents</p>
            </div>
            <br />
            <h4>Change Received</h4>
            <p className="float-right">{
                (change) ? change.map(c => c.value * c.quantity).reduce((p, n) => p + n) : 0} cents</p>

        </ModalBody>
        <ModalFooter>
            <button className="btn btn-lg btn-success" onClick={toggle}>OK</button>
        </ModalFooter>
    </Modal>
    )
}

export default ReceiptModal;
