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

const upsert = async (doc) => {
  pinecone = await init();
  // eslint-disable-next-line new-cap
  const index = pinecone.Index('docs-search');

  const str = reader(doc);
  const data = await tokenize(str);
  console.log(data);

  const upsertRequest = {
    vectors: [
      {
        id: doc,
        values: data,
        metadata: {
          filepath: doc,
        },
      },
    ],
    namespace: '',
  };

  const upsertResponse = await index.upsert({upsertRequest: upsertRequest});
  // console.log(upsertResponse);
};

module.exports = {upsert, init};
