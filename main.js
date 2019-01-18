//set up info needed for API calls
//the URL is specific to obtaining Text Analytics Sentiment Analysis
let apiURL = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
let apiKey = "put_your_key_here";

//get references to HTML elements
let frm = document.querySelector("#textToAnalyze");
let btn = document.querySelector(".btn");

//helper to create JSON, hardcoded for English only
function getApiInput(rawInput) {
    return {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": rawInput
            }
        ]
    };
}

//helper to update UI
function updateUser(score) {
    let placeToGo = document.querySelector("#showingOutput");
    let answer = document.createElement('p');

    if (score > .66) {
        answer.textContent = "That's great to hear! 😊"
    } else if (score > .33) {
        answer.textContent = "Hmmmmm... 🤔"
    } else {
        answer.textContent = "😢 I understand. The SwampHacks staff is friendly and would love to help if you have any concerns!"
    }

    placeToGo.appendChild(answer);
}

//where the magic happens!
async function getSentiment() {

    //convert input text to format API is expecting
    let rawInput = frm.value;
    console.log(rawInput);
    let cleanInput = getApiInput(rawInput);

    //create & execute post request to call API  
    const response = await fetch( apiURL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
        },
        body: JSON.stringify(cleanInput)
    });
    const data = await response.json();
    console.log(data);

    //extract score from returned results
    let score = data.documents[0].score;
    console.log(score);

    //do something on the UI based on the results
    updateUser(score);
    
    return data;
}

//connect magic to button
btn.addEventListener("click", getSentiment);
