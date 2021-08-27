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
        // make dictionary of Drink objects
        private Dictionary<string, Drink> Drinks = new Dictionary<string, Drink>();

        private readonly ILogger<DrinkMachineController> _logger;

        public DrinkMachineController(ILogger<DrinkMachineController> logger)
        {
            _logger = logger;
            // initialize Drinks
            Drinks.Add("Coke", new Drink("Coke", 25, 5));
            Drinks.Add("Pepsi", new Drink("Pepsi", 36, 15));
            Drinks.Add("Soda", new Drink("Soda", 45, 3));
        }

        [HttpGet]
        public Dictionary<string, Drink> Get()
        {
            return Drinks;
        }
    }
}