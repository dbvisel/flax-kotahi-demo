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
    query: `query {
			manuscriptsPublishedSinceDate(startDate: 1624101179050, limit: null) {
				id
				shortId
				files {
					# attachments
					id
					label
					fileType
					filename
					url
					mimeType
					size
				}
				status
				meta {
					title
					source
					articleType
					declarations {
						openData
						openPeerReview
						preregistered
						previouslySubmitted
						researchNexus
						streamlinedReview
					}
					articleSections
					articleIds {
						pubIdType
						id
					}
					abstract
					subjects
					history {
						type
						date
					}
					publicationDates {
						type
						date
					}
					notes {
						notesType
						content
					}
					keywords
					manuscriptId
				}
				submission
				publishedDate
			}
		}     
      `,
  });
  // This is being done because "submission" comes in as stringified JSON which needs to be unstringified to use in templates
  const parsedArticles = data.manuscriptsPublishedSinceDate.map((article) => {
    return { parsedSubmission: JSON.parse(article.submission), ...article };
  });
  return {
    articles: parsedArticles,
  };
};

module.exports = getData;
