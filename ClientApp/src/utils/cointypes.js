/* define all coin types this application uses for easier scaling */
const CoinTypes = class {
    constructor() {
        // define a coinage array to hold the coin types.
        /* each object in coinage will have:
        name: the plural form of the coin type, ie. quarters
        singular: the singular form of the coin type, ie. quarter
        value: the value of the coin type, ie. 25
        */

        this.coinage = [
            { name: "Pennies", singular: "penny", value: 1 },
            { name: "Nickels", singular: "nickel", value: 5 },
            { name: "Dimes", singular: "dime", value: 10 },
            { name: "Quarters", singular: "quarter", value: 25 }
        ]
    }

    // generate coinTypes array used in DrinkMachine component
    generateCoinTypes() {
        return this.coinage.map(coin => {
            return { name: coin.name, value: coin.value, quantity: 0 };
        });
    }

    // generate coinNames object used in coinName helper function
    generateCoinNames() {
        const coinNames = {};

        this.coinage.forEach(coin =>
            coinNames[coin.value] = {
                singular: coin.singular,
                plural: coin.name.toLowerCase()
            }
        );

        return coinNames;
    }
};

export default new CoinTypes();
