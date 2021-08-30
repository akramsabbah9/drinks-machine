# Drinks Machine


## Overview

This is my solution for the Drinks Machine coding challenge from GreenSlate. The goal of this challenge is to create an API with a .NET server that mimics the capabilities of a vending machine. It must be able to accept pennies, nickels, dimes and quarters, and should be able to vend three different types of drinks. The application must take into account that other types of currencies and drinks may be added in the future.

My implementation uses an ASP.NET Core 5.0 back-end, and a React-Bootstrap front-end. It is designed to closely resemble the project mockup in GreenSlate's specification:

![mockup](https://user-images.githubusercontent.com/59624292/131270063-87b37c10-6e95-4fd8-9195-218ab4efdca3.png)


## Installation

Before running the Drinks Machine, you must first have Node.js, npm, and ASP.NET Core 5.0 installed on your local machine. Then, follow the below instructions to install this project.

  1) Clone the repository to your local machine and enter its directory.
  2) Navigate to the project's ClientApp directory and install the frontend dependencies using `npm install`.
  3) Go back to the root directory of the project, and use `dotnet run` to start the Drinks Machine.
  4) The application is now running on https://localhost:5001/. Visit it in your browser of choice to begin using the Drinks Machine.


## Scaling Up


### Adding More Currency

Follow these steps to allow the Drinks Machine to accept additional types of currency.

Front-End: Open the ClientApp/utils/cointypes.js file in your text editor of choice. Then, add the information of your new currency type into the `coinage` array. Follow a similar format to this example:

`{ name: "Quarters", singular: "quarter", value: 25 }`

Back-End: Open the Controllers/DrinkMachineController.cs file in your text editor of choice. Then, add the information of your new currency type into the `public DrinkMachineController(ILogger<DrinkMachineController> logger)` constructor, right after the existing calls to `Cash.Add()`. Make sure to follow this format:

`Cash.Add(new Money(VALUE_OF_THIS_CURRENCY, STARTING_QUANTITY_OF_THIS_CURRENCY));`


### Adding More Drinks

Follow these steps to allow the Drinks Machine to accept additional types of drinks.

Back-End: Open the Controllers/DrinkMachineController.cs file in your text editor of choice. Then, add the information of your new drink type into the `public DrinkMachineController(ILogger<DrinkMachineController> logger)` constructor, right after the existing calls to `Drinks.Add()`. Make sure to follow this format:

`Drinks.Add("DRINK_NAME_HERE", new Drink("DRINK_NAME_HERE", DRINK_PRICE_HERE, STARTING_QUANTITY_OF_THIS_DRINK));`


## Contact

If you have any questions or concerns regarding this project, feel free to either contact me at akramsabbah9@gmail.com or open an issue on GitHub!
