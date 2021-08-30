# flax-kotahi demo

This version is straight Eleventy – there's no React. Demo version is up at https://flax-kotahi-demo.netlify.app/ (which isn't this branch).

## localversion branch

To run this as of right now, you need to have Kotahi running locally on port 3000; additionally, you need to have manuscripts in the instance. The code should work (with a change to the URL set in `config.js`) for a remotely deployed instance (presumably Kotahi Dev), though that hasn't been tested yet. 

This is based on `flax-kotahi-demo-next`, the "localversion" branch (https://github.com/dbvisel/flax-kotahi-demo-next/tree/localversion).

Kotahi puts out a GraphQL playground at http://localhost:3000/graphql – making queries there is the best way to get a sense of the shape of the data.

To make a query for an individual article (which doesn't really seem to be needed yet, though it probably will), you can do this:

```
const graphqlVariableQuery = async ({ query, variables }) => {
  const response = await axios.post(GRAPHQL_URL, {
    query: query,
		variables: variables
  });

  if (response.status == 200) {
    return response.data.data;
  }
};

  const { data } = await graphqlVariableQuery({
    query: gql`
      query ($id: ID!) {
        publishedManuscript(id: $id) {
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
    variables: {
      id,
    },
  });
```

That's getting a manuscript with ID `id`; you could do the same thing with `shortId`, which is more human-readable.

One note: the manuscript's `submission` field comes in as a string, though it's actually stringified JSON. There's a lot of useful metadata in that, so `_data/articleQuery.js` parses it before adding it to the data store.

This version does not have /method/ and /package/ pages as the Next version does, though implementing them would be pretty trivial – those were just demonstrations, and I don't think they're actually useful with real data.

And a general note: metadata can vary wildly between Kotahi instances! Much of what you want, for example, is coming from the `submission` field, which is shaped differently from instance to instance. This is based on the Aperture instance. 

## what this does:

- connect to Kotahi API
- pull down manuscripts from Kotahi API
- create page for each manuscript with manuscript/metadata
- create index page listing all manuscripts

## remember (models, etc.): 

https://www.biorxiv.org/content/10.1101/2020.02.06.936302v5.full
https://elife.kotahi.cloud

