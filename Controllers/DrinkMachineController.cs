using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace drinks_machine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrinkMachineController : ControllerBase
    {
        // make dictionary of Drink objects, and list of Money on-hand

        // dictionary used to lookup drinks when receiving purchase request
        private static readonly Dictionary<string, Drink> Drinks = new Dictionary<string, Drink>();

        // list used to easily scale up when adding new types of coinage
        private static readonly List<Money> Cash = new List<Money>();

        private readonly ILogger<DrinkMachineController> _logger;
        // private IMemoryCache _cache; // add in-memory cache to store state

        public DrinkMachineController(ILogger<DrinkMachineController> logger)
        {
            _logger = logger;
            // add drinks
            if (Drinks.Count == 0) {
                Drinks.Add("Coke", new Drink("Coke", 25, 5));
                Drinks.Add("Pepsi", new Drink("Pepsi", 36, 15));
                Drinks.Add("Soda", new Drink("Soda", 45, 3));
            }

            // add available money in machine
            if (Cash.Count == 0) {
                Cash.Add(new Money(1, 100));
                Cash.Add(new Money(5, 10));
                Cash.Add(new Money(10, 5));
                Cash.Add(new Money(25, 25));
            }

            // in case later devs add change out of order, sort greatest to least
            Cash.Sort((a, b) => b.Value.CompareTo(a.Value));
        }

        // get state of machine, returning drinks inside
        [HttpGet]
        public Dictionary<string, Drink> GetMachineContents()
        {
            return Drinks;
        }

        // define class used for post parameters
        public class Transaction
        {
            public Dictionary<string, Drink> drinks { get; }
            public List<Money> payment { get; }

            public Transaction(Dictionary<string, Drink> drinks, List<Money> payment)
            {
                this.drinks = drinks;
                this.payment = payment;
            }
        }

        // return an Action Result to customize the response status code
        // attempt to complete a transaction. If valid, send 200 with the new
        // amt of drinks and change for this purchase. Otherwise, 400 and refund.
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Transaction))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PurchaseDrinks([FromBody] Transaction args)
        {
            int drinkTotal = 0; // total cost of purchase

            // initialize list to hold change, deep-copying Cash
            List<Money> change = new List<Money>();
            foreach(Money entry in Cash) {
                change.Add(new Money(entry.Value, 0));
            }


            // determine if there are enough drinks to supply the request
            foreach(KeyValuePair<string, Drink> entry in args.drinks) {
                // if there's not enough drinks, send 400
                if (Drinks[entry.Key].Quantity == 0 && entry.Value.Quantity != 0)
                    return BadRequest("Drink " + entry.Key + " is sold out, your purchase cannot be processed");
                else if (Drinks[entry.Key].Quantity < entry.Value.Quantity)
                    return BadRequest("Not enough drinks, your purchase cannot be processed");
                else
                // add total cost for purchased drinks of this name
                    drinkTotal += entry.Value.Quantity * Drinks[entry.Key].Price;
            }

            // if no drinks were actually bought, send 400
            if (drinkTotal == 0)
                return BadRequest("No drinks were purchased");
            

            // determine if the total payment matches the total price
            int changeNeeded = args.payment.Sum(x => x.Value * x.Quantity) - drinkTotal;

            // if changeNeeded is negative, the payment was too small
            if (changeNeeded < 0)
                return BadRequest("Payment is insufficient");
            // otherwise, calculate which coins to give back, largest-first
            else if (changeNeeded > 0) {
                // for each denomination in Cash, make change <= changeNeeded
                for (int i = 0; i < Cash.Count; i++) {
                    // calc how many coins of this denomination can fit
                    int coinCount = changeNeeded / Cash[i].Value;
                    
                    // if not enough coins, use up the remaining ones
                    int onHand = Cash[i].Quantity + args.payment.Find(e => e.Value == Cash[i].Value).Quantity;
                    coinCount = (coinCount > onHand) ? onHand : coinCount;

                    // subtract the necessary coins, or as many as possible
                    changeNeeded -= coinCount * Cash[i].Value;
                    change[i].Quantity = coinCount;
                }

                // if change is still needed, send 400
                if (changeNeeded > 0)
                    return BadRequest("Not sufficient change in the inventory");
            }


            // finally, remove purchased drinks and compute changes in Cash
            foreach(KeyValuePair<string, Drink> entry in args.drinks)
                Drinks[entry.Key].Quantity -= entry.Value.Quantity;

            for(int i = 0; i < Cash.Count; i++) {
                // if payment includes this coinage, add that value
                Money curCoin = args.payment.Find(e => e.Value == Cash[i].Value);
                
                int plus = (curCoin != null) ? curCoin.Quantity : 0;

                Cash[i].Quantity += plus - change[i].Quantity;
            }

            /* send back the response: drinks is the number of remaining drinks
               and payment is the change back from the transaction */
            return Ok(new Transaction(Drinks, change));
        }
    }
}