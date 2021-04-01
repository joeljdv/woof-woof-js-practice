document.addEventListener("DOMContentLoaded",()=> {
    addDog()
})

const pupsURL = " http://localhost:3000/pups"

function addDog() {
    fetch(pupsURL)
    .then(res => res.json())
    .then((data) => {
        for(const key in data){
            const divs = document.querySelector("#dog-bar")
            const spanTag = document.createElement("span")
            spanTag.innerText = `${data[key].name}`
            divs.appendChild(spanTag)
            spanTag.addEventListener("click", () => {
                const info = document.querySelector("#dog-info")
                const imgTags = document.createElement("img")
                const h2Tag = document.createElement("h2")
                const btn = document.createElement("button")
                imgTags.src= `${data[key].image}`
                h2Tag.innerText = `${data[key].name}`
                btn.innerHTML = `Good Dog!`
                info.appendChild(imgTags)
                info.appendChild(h2Tag)
                info.appendChild(btn)
                btn.setAttribute("id","good-bad")
                btn.addEventListener("click", () => {
                    const btn = document.querySelector("#good-bad")
                    let a = data[key].id
                    if(btn.innerHTML === "Good Dog!"){
                        btn.innerHTML = "Bad Dog!";
                        fetch(pupsURL+`/${a}`, {
                        method: 'PATCH',
                        body:JSON.stringify({
                            isGoodDog:false
                            }),
                        headers: {
                                "Content-type": "application/json"
                                }
                            })
                        .then(res => res.json())
                        .then((data) => {console.log(data)})
                    }else {
                        btn.innerHTML = "Good Dog!"
                        fetch(pupsURL+`/${a}`, {
                            method: 'PATCH',
                            body:JSON.stringify({
                                isGoodDog:true
                                }),
                            headers: {
                                    "Content-type": "application/json"
                                    }
                                })
                            .then(res => res.json())
                            .then((data) => {console.log(data)})
                    }
                })
                    
            })
        }
    })
}



    
