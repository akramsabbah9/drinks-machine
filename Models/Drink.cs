using System;

namespace drinks_machine
{
    public class Drink
    {
        // readonly: name, price; read-write: quantity
        private string Name { get; }
        private int Price { get; }
        private int Quantity { get; set; }

        // one constructor to initialize a vending machine drink
        public Drink(string name, int price, int initialQuantity) {
            Name = name;
            // if someone thinks it would be funny to initialize price/quantity
            // as negative, set them to zero instead
            Price = price >= 0 ? price : 0;
            Quantity = initialQuantity >= 0 ? initialQuantity : 0;
        }
    }
}
