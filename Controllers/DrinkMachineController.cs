using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace drinks_machine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DrinkMachineController : ControllerBase
    {
        // make dictionary of Drink objects, and list of Money

        // dictionary used to lookup drinks when receiving purchase request
        private Dictionary<string, Drink> Drinks = new Dictionary<string, Drink>();

        // list of change to easily scale up when adding new types of coinage
        private List<Money> Change = new List<Money>();

        private readonly ILogger<DrinkMachineController> _logger;

        public DrinkMachineController(ILogger<DrinkMachineController> logger)
        {
            _logger = logger;
            // add drinks
            Drinks.Add("Coke", new Drink("Coke", 25, 5));
            Drinks.Add("Pepsi", new Drink("Pepsi", 36, 15));
            Drinks.Add("Soda", new Drink("Soda", 45, 3));

            // add available money in machine
            Change.Add(new Money(1, 100));
            Change.Add(new Money(5, 10));
            Change.Add(new Money(10, 5));
            Change.Add(new Money(25, 25));

            // in case later devs add change out of order, sort least to greatest
            Change.Sort((a, b) => a.Value.CompareTo(b.Value));
        }

        // get state of machine
        [HttpGet]
        public Dictionary<string, Drink> GetMachineContents()
        {
            Change.ForEach(Console.WriteLine); // debug: check change amounts
            return Drinks;
        }

        // attempt to complete a transaction. If valid, return new amt of drinks
        // and subtract Money from Change. Otherwise, 400 and refund.
        [HttpPost]
        public Dictionary<string, Drink> PurchaseDrinks()
        {
            return Drinks;
        }
    }
}