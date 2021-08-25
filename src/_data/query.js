// required packages
const axios = require("axios");
const config = require("./../../config");

const GRAPHQL_URL = config.url;

const graphqlQuery = async ({ query }) => {
  const response = await axios.post(GRAPHQL_URL, {
    query: query,
  });

  if (response.status == 200) {
    return response.data.data;
  }
  // Todo: fallback for failure
};

const getData = async () => {
  const data = await graphqlQuery({
    query: `query posts {
        posts: posts {
          nodes {
            content
            slug
            title
          }
        }
      }      
      `,
  });
  // console.log(data.posts.nodes.map((x) => x.slug));
  return {
    articles: data.posts.nodes,
  };
};

module.exports = getData;