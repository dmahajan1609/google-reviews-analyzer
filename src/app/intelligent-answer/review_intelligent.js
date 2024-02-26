import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import axios from "axios"
import { PromptTemplate } from "langchain/prompts";

const SERPAPI_KEY = process.env['SERPAPI_KEY']

const getReviews = async (dataId, nextPageToken = null) => {
  try {
    const pagination = nextPageToken ? `&next_page_token=${nextPageToken}` : ''
    const { data } = await axios.get(`https://serpapi.com/search.json?data_id=${dataId}&engine=google_maps_reviews&hl=en&api_key=${SERPAPI_KEY}${pagination}`)
    // console.log("Google reviews", data);
    return data
  } catch(e) {
    console.log("Error", e)
    return null
  }
}

const getAllReviews = async (dataId) => {
  let result = []

  let nextPageToken = null
  let count = 0
  while (true) {
    const { reviews, serpapi_pagination } = await getReviews(dataId, nextPageToken)
    
    if (reviews) {
      result = [...result, ...reviews]
    }

    if (serpapi_pagination?.next_page_token) {
      nextPageToken = serpapi_pagination.next_page_token
    } else {
      break
    }

    count++
    if (count > 10) break
  }

  return result
}

export const intelligentlyAnalyseReview = async (dataId) => {
  const reviews = await getAllReviews(dataId)
  if (!reviews) return

  const text = reviews.map((review) => {
    return `- ${review.snippet}`
  }).join("\n")

  const prompt = new PromptTemplate({ 
    template: `Reviews:
    {text}
    
    ---
    Create 5 most common labels for these reviews and give rating of 1 to 5 ⭐, with 1 ⭐ being the lowest rating and 5 ⭐ being the highest rating, it should be based on the occurrence rate, and if the label is negative as 👎 or positive as 👍.
    Example:
    Label Name (positivity): ⭐ emoji
    `,
    inputVariables: ["text"] 
  });
  
  const model = new OpenAI({ temperature: 0.5 });
  console.log("Reached here - 1");
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  console.log("Reached here - 2");

  
  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model, { type: "map_reduce", combinePrompt: prompt });
  console.log("Chain", chain);
  console.log("Reached here - 3");

  const res = await chain.call({
    input_documents: docs,
  });
  console.log("response from chain.call()", res)
  return res
};