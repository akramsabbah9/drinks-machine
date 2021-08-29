/* helper functions for DrinkMachine component */

// scrub drinks data returned from API
const scrubDrinks = data => {
    const scrubbedData = {};

    for(const [key, value] of Object.entries(data)) {
        scrubbedData[[key]] = { ...value, quantity: 0 };
    }

    return scrubbedData;
};

// validate the form state, set error, and return true/false
const validateForm = (coins, drinks, setError) => {
    let totalMoney = 0;
    let totalDrinks = 0;

    // if any coin is negative, set error
    coins.forEach(coin => {
        if (coin.quantity < 0) {
            setError(`You cannot input a negative amount of money!`);
            return false;
        }
        totalMoney += coin.quantity;
    });

    // if the total payment is not positive, set error
    if (totalMoney <= 0) {
        setError("You must pay an amount greater than zero!");
        return false;
    }

    // if any drink is negative, set error
    for(const key of Object.keys(drinks)) {
        if (drinks[key].quantity < 0) {
            setError(`You cannot purchase a negative amount of drinks!`);
            return false;
        }
        totalDrinks += drinks[key].quantity;
    }

    // if total drink count is not positive, set error
    if (totalDrinks <= 0) {
        setError("You must purchase at least one drink!");
        return false;
    }

    // getting to here means the form state is valid.
    setError("");
    return true;
};

// clears all inputs in a form, given a list of their ids.
const resetForm = ids => {
    for (let id of ids) {
        document.querySelector(`#${id}`).value = null;
    }
};

// returns the total cost of a set of drinks, in cents.
const totalCost = drinks => {
    return Object.keys(drinks)
        .map(name => drinks[name].quantity * drinks[name].price)
        .reduce((p, n) => p + n);
};

// returns name of a given coin value.
const coinName = (value, quantity = 2) => {
    const coinage = {
        1: { singular: "penny", plural: "pennies" },
        5: { singular: "nickel", plural: "nickels" },
        10: { singular: "dime", plural: "dimes" },
        25: { singular: "quarter", plural: "quarters" }
    }

    // if value is not in coinage, short circuit to a catch-all
    const val = coinage[value]
        || { singular: `${value}-cent coin`, plural: `${value}-cent coins` };

    return (quantity === 1) ? val.singular : val.plural;
};

export { scrubDrinks, validateForm, resetForm, totalCost, coinName };
