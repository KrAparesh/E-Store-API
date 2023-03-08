# E-Store API

The project is centralized to create an API to search and filter out products for an e-commerce website. This repository only contains the backend and returns JSON objects as result.


## Route

>Base URL :  localhost:{PORT}/api/v1
 
 **URL/products** : Get a list of all products

## Queries

- **featured** : Takes boolean value **true** or **false** to display the featured products.
- **company** : Takes in values **ikea | liddy | caressa | marcos** to sort products.
- **name**: Takes in **any string** value and displays products containing the value passed.
- **sort**: Takes in values **name | price | rating | company | createdAt** and returns the sorted JSON object.
- **fields**: Use this if you want to get only specific field. Takes in values **name | price | rating | company | createdAt**.
- **numericFilters**: Takes in **price** and **rating** as parameters. The value can be range
> Example: URL/products?numericFilters=price>40,rating>=4

## Environment Variables

Create a **.env** file and populate it with the following data:

    MONGO_URI=[Your mongoDB string goes here]

## Installation

Clone the project:

    git clone https://github.com/KrAparesh/E-Store-API.git

Install the dependencies using:

    npm install 
***
Found a bug or want to drop suggestions? [Drop a Hi!](contact@kraparesh.co)