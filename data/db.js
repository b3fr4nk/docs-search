/* eslint-disable no-unused-vars */
const {PineconeClient} = require('@pinecone-database/pinecone');
const reader = require('./reader');
const {tokenize} = require('./openai');

const init = async () => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT,
    apiKey: process.env.PINECONE_API_KEY,
  });
  return pinecone;
};

const upsert = async (str, id) => {
  pinecone = await init();
  // eslint-disable-next-line new-cap
  const index = pinecone.Index('docs-search');

  const data = await tokenize(str);
  console.log(data);

  const upsertRequest = {
    vectors: [
      {
        id: id,
        values: data,
        metadata: {
          text: str,
          filepath: id,
        },
      },
    ],
    namespace: '',
  };

  const upsertResponse = await index.upsert({upsertRequest: upsertRequest});
  // console.log(upsertResponse);
};

const query = async (query) => {
  pinecone = await init();
  // eslint-disable-next-line new-cap
  const index = pinecone.Index('docs-search');

  const vector = await tokenize(query);
  // console.log(vector);

  const queryRequest = {
    vector: vector,
    topK: 3,
    includeValues: true,
    includeMetadata: true,
    namespace: '',
  };

  const queryResponse = await index.query({queryRequest: queryRequest});
  // console.log(queryResponse.matches);
  return queryResponse;
};

module.exports = {upsert, query, init};
