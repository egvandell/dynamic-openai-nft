const prompt = args[0]

if (!secrets.openaiKey) {
        throw Error(
            "Need to set OPENAI_KEY environment variable to run this example; "+secrets.openaiKey
        )
    }

const openAIRequest = Functions.makeHttpRequest ({
    url: 'https://api.openai.com/v1/completions',
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${secrets.openaiKey}`
    },
    data: {
        "model": "text-davinci-003",
        "prompt": prompt,
        temperature: 1,
        max_tokens: 7, }
    })


const openAIResponse = await openAIRequest;

console.log("raw response", openAIResponse);

console.log("raw response data", openAIResponse.data.choices[0]);


let result = openAIResponse.data.choices[0].text.replace(/\n/g, "").replace(/\./g, "").trim();
console.log("Superhero Name: ", result);

return Functions.encodeString(result);