<div align="center">

  [![License: MIT](https://img.shields.io/github/license/serpapi/google-reviews-analyzer)](https://github.com/serpapi/review-analyzer/blob/master/LICENSE)

</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/serpapi/google-reviews-analyzer/main/public/logo.png" width="150" alt="Logo">
  <h3>Google Reviews Analyzer</h3>
</div>

## Introduction

It gather the reviews of businesses using [SerpApi](https://serpapi.com/). And then structure the data to feed into [OpenAI](https://openai.com/) LLM with the use of [Langchain](https://github.com/hwchase17/langchain) LLM framework. With custom prompting, we produce the result as below.

## Example Reults

<img src="https://raw.githubusercontent.com/serpapi/google-reviews-analyzer/main/public/sample.png" width="500" alt="Logo">

### Sample analysis
```
1. Food Quality (👍): ⭐⭐⭐⭐⭐
2. Service (👍): ⭐⭐⭐⭐
3. Cleanliness (👎): ⭐⭐
4. Price (👍): ⭐⭐⭐⭐
5. Taste (👍): ⭐⭐⭐⭐⭐
6. Portions (👍): ⭐⭐⭐⭐
7. Variety (👍): ⭐⭐⭐
8. Atmosphere (👍): ⭐⭐⭐⭐
9. Value (👍): ⭐⭐⭐⭐
10. Parking (👍): ⭐⭐⭐
```

## Prerequisite

Before running the application, we have to get the necessary API key:
1. Duplicate the file `.env.example` and rename it to `.env`
2. We need 2 API keys from [SerpApi](https://serpapi.com/) and [OpenAI](https://platform.openai.com/) for `SERPAPI_KEY` and `OPENAI_API_KEY` respectively.

## Installation

First, install the dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building Blocks

- [Next.JS](https://nextjs.org/) - React framework for the web application
- [Langchain](https://github.com/hwchase17/langchain) - Framework for the LLM
- [OpenAI](https://openai.com/) - LLM provider
- [SerpApi](https://serpapi.com/) - Data provider for the businesses reviews on Google. Related documentations: [Google Maps API](https://serpapi.com/google-maps-api) and [Google Maps Reviews API](https://serpapi.com/google-maps-reviews-api).

## Future Improvements

Quick analysis is fine, it helps you to understand the review as quick and intuitive as possible. But what if you can chat with it? Sort of like interviewing your customers. I believe we can get more in depth understanding out of it.