# WDI Project 2 - Culture Find

This is my second project for the WDI course. The timeline of this project was six days.

This project is designed to help users find museums, art galleries and nearby train stations in central London using Google Maps.
It has a user management system where users have to sign up/login in order to use the services.

The project back-end has been written using Node.js.
The user management system has been implemented by using Express and ExpressJWT, user data is is being stored in a MongoDB database. I used Google Maps Javascript API to send a request to get Art galleries, Museums and Train stations within a two kilometre radius of central London.
Google Maps then sends a response which contains twenty places and a pagination variable which is used to expand to sixty places, twenty at a time. I added a load more button which calls the pagination to get the next twenty places when it's clicked and then gets disabled when it reaches its limit of two clicks.

In the navbar I have added check boxes for each type of place. Users can use the check box to either show or hide the specific type of places on the map. In order to avoid sending requests to Google again which would slow down the application, I managed to save all the markers I received initially and I am updating those markers based on which check boxes are enabled/disabled.


I've created markers on the map for each place. The icons on the markers change based on the type of the place. I have also added information windows which are pop ups which appear when a marker is clicked. Inside each information window I have used Google Places API to show these:
* An image of the place
* Icons representing type of the place, Including a restaurant icon depending on the places that have.
* Weather or not the place is open or closed.
* Ratings (1-5)
* The address of the place

## Getting Started

### Prerequisites
* MongoDB
* Node.js + NPM

install mongodb
```
brew install mongodb
```
create a database called galleries
```
use galleries
```
install Node + NPM
```
brew install node
```
### Installing
Go to the project folder and do ``` npm install ```
then do ```node index.js```
