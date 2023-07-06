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

const upsert = async (str, str2, id) => {
  const start = Date.now();
  pinecone = await init();
  // eslint-disable-next-line new-cap
  const index = pinecone.Index('docs-search-x2');

  const data = await tokenize(str);
  const data2 = await tokenize(str2);

  const upsertRequest = {
    vectors: [
      {
        id: id,
        values: data.concat(data2),
        metadata: {
          text: str,
          filepath: id,
        },
      },
    ],
    namespace: 'testing-3+1-x2',
  };

  const upsertResponse = await index.upsert({upsertRequest: upsertRequest});
  const end = Date.now();
  return end - start;
};

const query = async (query) => {
  pinecone = await init();
  // eslint-disable-next-line new-cap
  const index = pinecone.Index('docs-search-x2');
  const query1 = query.slice(0, query.length/2);
  const query2 = query.slice(query.length/2);

  const vector1 = await tokenize(query1);
  const vector2 = await tokenize(query2);

  const queryRequest = {
    vector: vector1.concat(vector2),
    topK: 3,
    includeValues: true,
    includeMetadata: true,
    namespace: 'testing-3+1-x2',
  };

  const queryResponse = await index.query({queryRequest: queryRequest});
  console.log(queryResponse);
  return queryResponse;
};

module.exports = {upsert, query, init};
