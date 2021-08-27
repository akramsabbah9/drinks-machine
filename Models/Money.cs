namespace drinks_machine
{
    public class Money
    {
        public int Value { get; } // the value of this coinage
        public int Quantity { get; set; }

        public Money(int value, int initialQuantity) {
            // if someone thinks it would be funny to initialize price/quantity
            // as negative, set them to zero instead
            Value = value >= 0 ? value : 0;
            Quantity = initialQuantity >= 0 ? initialQuantity : 0;
        }

        // override ToString for debug purposes
        public override string ToString() {
            return "Value: " + Value + ", Quantity: " + Quantity;
        }
    }
}
