const prompt = args[0]

if (!secrets.openaiKey) {
        throw Error(
            "Need to set OPENAI_KEY environment variable to run this example; "+secrets.openaiKey
        )
    }

const openAIRequest = Functions.makeHttpRequest ({
    url: 'https://api.openai.com/v1/images/generations',
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${secrets.openaiKey}`
    },
    data: {
        "prompt": prompt,
        n: 1,
        size: "256x256", 
        response_format: "url" },
    timeout: 9000
    })


const openAIResponse = await openAIRequest;

console.log("raw response", openAIResponse);
console.log("raw response data", openAIResponse.data.data);

let openAIresponseUrl = openAIResponse.data.data[0].url;

console.log("openAIresponseUrl: ", openAIresponseUrl);

return Functions.encodeString(openAIresponseUrl);