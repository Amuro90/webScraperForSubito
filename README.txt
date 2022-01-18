Web scraping tool for subito (subito.it tested)

in mainUrl you have to paste the starting url, you just have to manually serch 
on subito your interested object, then you have to copy that url in mainUrl

after that in this cycle:

for (let n = 0; n < arrayPage[l].productsOfThePage.length; n++) {

you can set your parameters such as the title that must contain certain words etc:

if (arrayPage[l].productsOfThePage[n].title.includes("lumix")) {


or the price that must not be over a certain level

if (arrayPage[l].productsOfThePage[n].price <= 600 && arrayPage[l].productsOfThePage[n].price > 300)

to run the code just type:
npm install (only the first time) // you hve to be in the same folder
as the file include.js and package.json 

and every time 

node include.js

This is a powerfull tool, asks for houndred of pages each time 
with your ip so use it with caution, i made it only for fun
