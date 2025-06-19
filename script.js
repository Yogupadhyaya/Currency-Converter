const url = "https://latest.currency-api.pages.dev/v1/currencies/eur.json"
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
let dropdownselect = document.querySelectorAll(".dropdown select")

const msg = document.querySelector(".msg")

for (let code of dropdownselect) {
    for (let currcode in countryList) {
        let newopt = document.createElement("option")
        newopt.innerText = currcode
        newopt.value = currcode
        if(code.name==="from" && currcode==="USD")
        {
            newopt.selected="selected"
        }
        if(code.name==="to" && currcode==="NPR")
        {
            newopt.selected="selected"
        }
        code.append(newopt)
    }

    code.addEventListener("change",(event)=>{
        updateFlag(event.target)
    })
}


function updateFlag(element)
{
    let currcode=element.value
    let countrycode=countryList[currcode]
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`
  let img= element.parentElement.querySelector("img")
img.src=newsrc
}

let btn = document.querySelector("form button")
btn.addEventListener("click",async (event)=>{
event.preventDefault()
let amount = parseInt(document.querySelector("form input").value)
if(amount==="" || amount<1)
{
    amount =1
    document.querySelector("form input").value="1"

    
}

let response = await fetch(url)
let data = await response.json()
let a= data.eur[fromcurr.value.toLowerCase()]
let b = data.eur[tocurr.value.toLowerCase()]


let finalamount = (b/a)*amount
msg.innerText=`${amount} ${fromcurr.value} = ${finalamount} ${tocurr.value}`

})