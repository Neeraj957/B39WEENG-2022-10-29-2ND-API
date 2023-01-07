const apikey = "6bd3e47635cf702c5aab6f13278f146e"
const pvtKey = "cd249df6312bcae121668a0e66fb9b18b258a953"
const baseUrl = "https://gateway.marvel.com:443/v1/public/"





const resultArea = document.getElementById("result");
const sound = document.getElementById("sound");
const button = document.getElementById("search-button");


let result = "";



const getDefinitions = async () => {

    resultArea.innerHTML = '';

    let inputWord = document.getElementById("input-word").value;
    console.log(inputWord)

    const timeStamp = Date.now();

    let hash = createHash()

        function createHash() {
        hashValue = CryptoJS.MD5(timeStamp+pvtKey+apikey);
        return hashValue;
        }


    const characterUrl = `${baseUrl}characters?nameStartsWith=${inputWord}&ts=${timeStamp}&apikey=${apikey}&hash=${hash}`
        
    try {

        const response = await fetch(`${characterUrl}`)
        const details = await response.json();
        console.log(details);

        details.data.results.forEach(element => {

            result = `
            <div class="card m-4" style="width: 18rem;">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="img-fluid img-thumbnail my-1" alt="Oops! Image not found">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${details.attributionText}</h6>
                    <p class="card-text">${element.description}</p>
                </div>
            </div>`

            resultArea.innerHTML += result;

            })

        } catch (error) {

            result = `
            <div class="card m-4" style="width: 18rem;">
                <img src="" class="img-fluid img-thumbnail my-1" alt="Oops! Image not found">
                <div class="card-body">
                    <h5 class="card-title">Oops!</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Can't Find the hero</h6>
                    <p class="card-text">Please enter complete name, only when knowing all the characters exactly</p>
                </div>
            </div>`

            resultArea.innerHTML += result;
            
        }
}


button.addEventListener('click', getDefinitions)