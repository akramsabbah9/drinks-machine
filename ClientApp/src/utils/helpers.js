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
    for(const key in Object.keys(drinks)) {
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
    return true;
};

export { scrubDrinks, validateForm };
