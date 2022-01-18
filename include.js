const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const mainUrl = 'https://www.subito.it/annunci-italia/vendita/usato/?q=Lumix+g&from=top-bar';

let urlSon = mainUrl;
let final = 0;
let arrayPage = [{
    link: mainUrl,
    page: 222220,
    data: "",
    productsOfThePage: [
    ]
}];

let space = false;
let indexSpace = 0;
let indexSpaceForKM = 0;
let priceOnly = 0;
let priceTrue = 0;
let counter = 0;

let thing = "tfgh"
let thing2 = "tfgh"

const index = async (final, counter) => {

    for (let p = 0; p <= final; p++) {
        arrayPage.push({
            link: "test", page: 11110, data: "", productsOfThePage: []
        })
        arrayPage[p].link = await `${mainUrl}&o=${p}`
        arrayPage[p].page = p;

        let link = arrayPage[p].link

        got(link).then(async (res) => {

            arrayPage[p].data = await new JSDOM(res.body.toString()).window.document
            // const sel2 = await sonPage.querySelectorAll('.pagination__btn')
        }).catch((e) => {
            console.log("errore1");
            console.log(e);
        })


    }
    for (let l = 0; l <= final; l++) {

        let link = arrayPage[l].link
        got(link).then(async (res) => {

            let parentPageRSrc = await new JSDOM(res.body.toString()).window.document
            let btn = await parentPageRSrc.querySelectorAll('.pagination__btn')

            const sel = await parentPageRSrc.querySelectorAll('.price')
            const pTitle = await parentPageRSrc.querySelectorAll('.SmallCard-module_item-title__3e8Rq')
            const pLink = await parentPageRSrc.querySelectorAll('.SmallCard-module_link__9Ey4a')
            const pKM = await parentPageRSrc.querySelectorAll('.additional-info p:nth-child(3)')


            counter = 0;

            for (let i of sel) {


                arrayPage[l].productsOfThePage.push({
                    title: "",
                    price: 0,
                    link: "",
                    good: false,
                    km: 0
                });

                try {
                    let priceComplete = i.textContent

                    indexSpace = priceComplete.indexOf(`€`);

                    // console.log(`QUESTO è LINDEX ${"1.110 €".indexOf("€")}`)

                    let replaced = priceComplete.replace(".", "")

                    let priceOnly = replaced.slice(0, indexSpace)


                    let priceFinal = parseInt(priceOnly)


                    arrayPage[l].productsOfThePage[counter].price = priceFinal;

                } catch (e) {
                    console.log(e)
                    console.log(arrayPage[l].link)
                }

                counter++;

            }
            //research for km in used cars
            counter = 0;

            for (let i of pKM) {
                try {
                    let kmcomplete = i.textContent

                    indexSpaceForKM = kmcomplete.indexOf(` `);

                    let kmOnly = kmcomplete.slice(0, indexSpaceForKM)
                    let kmInt = parseInt(kmOnly)

                    arrayPage[l].productsOfThePage[counter].km = kmInt;
                }
                catch {
                    arrayPage[l].productsOfThePage[counter].km = 13; //number only for identifing the error
                }
                counter++;
            }

            counter = 0;
            for (let i of pTitle) {
                try {
                    thing = i.textContent.toLowerCase()
                    arrayPage[l].productsOfThePage[counter].title = thing;


                } catch {
                    console.log(arrayPage[l].page)

                }
                counter++;
            }
            counter = 0;
            for (let i of pLink) {
                try {
                    thing2 = i.getAttribute('href')
                    arrayPage[l].productsOfThePage[counter].link = thing2;


                } catch {
                    console.log(arrayPage[l].link)
                }
                counter++;
            }

            counter = 0;


        }).then(() => {
            // for (let counter of arrayPage[l].productsOfThePage) {
            //     console.log(counter.title)
            //     console.log(counter.price)
            //     console.log(counter.link)
            //     console.log(arrayPage[l].page);
            // }

        }).then(() => {


            for (let n = 0; n < arrayPage[l].productsOfThePage.length; n++) {

                // console.log(arrayPage[l].productsOfThePage[n].title)
                // console.log(arrayPage[l].productsOfThePage[n].price)
                // console.log(arrayPage[l].productsOfThePage[n].link)
                // console.log("*************************************")
                // console.log("")
                if (arrayPage[l].productsOfThePage[n].title.includes("lumix")) {

                } else {
                    //                   if (arrayPage[l].productsOfThePage[n].title.includes("go pro")) {
                    if (arrayPage[l].productsOfThePage[n].price <= 600 && arrayPage[l].productsOfThePage[n].price > 300) {
                        //                        if (arrayPage[l].productsOfThePage[n].title.includes("cover")) {
                        //                          if (arrayPage[l].productsOfThePage[n].title.includes("+")) {


                        console.log(arrayPage[l].productsOfThePage[n].title)
                        console.log(arrayPage[l].productsOfThePage[n].price)
                        console.log(arrayPage[l].productsOfThePage[n].link)
                        console.log(arrayPage[l].productsOfThePage[n].km)
                        console.log("*************************************")
                        console.log("")

                    }

                }
                //                    } else {
                //                      console.log(arrayPage[l].productsOfThePage[n].title)
                //                    console.log(arrayPage[l].productsOfThePage[n].price)
                //                  console.log(arrayPage[l].productsOfThePage[n].link)
                //                console.log("*************************************")
                //              console.log("")
                //        }
                //
                //                      }
                //                }
                //        }


            }


        }).catch((e) => {

            console.log("errore 2");
            console.log(arrayPage[l].link)
            console.log(e);
        })
    }

}

got(mainUrl).then(res => {
    console.log("ALL STARTS HERE")
    let parentPageRSrc = new JSDOM(res.body.toString()).window.document
    let btn = parentPageRSrc.querySelectorAll('.pagination__btn')
    // console.log(sel.textContent)



    for (let i of btn) {
        // console.log(i.textContent);
        counter++;
        if (counter === 3) final = parseInt(i.textContent)
    }
    // console.log(urlSon);

    counter = 0


    index(final, counter);


}).catch(err => {
    console.log('does not work')
    console.log(err)
})


