const prompt = args[0]

if (!secrets.openaiKey) {
  throw Error("Need to set OPENAI_KEY environment variable to run this example; " + secrets.openaiKey)
}

const openAIRequest = Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/chat/completions",
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.openaiKey}`,
  },
  data: {
    model: "gpt-4",

    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
      { role: "user", content: "Where was it played?" },
    ],
  },
})

const openAIResponse = await openAIRequest

console.log("raw response", openAIResponse)

if (openAIResponse && openAIResponse.response && openAIResponse.response.data && openAIResponse.response.data.error) {
  console.log("raw response data", openAIResponse.response.data.error)
} else {
  console.log(
    "Either openAIResponse, openAIResponse.response, openAIResponse.response.data, or openAIResponse.response.data.error is undefined"
  )
}

//console.log("raw response data", JSON.stringify(openAIResponse.data.error, null, 2));

let openAIresponse = openAIResponse.data.choices[0]

console.log("openAIresponseUrl: ", openAIresponse)

return Functions.encodeString(openAIresponse)
