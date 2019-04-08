import algoliasearch from 'algoliasearch'

const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;
const client = algoliasearch(process.env.ALGOLIA_APP_ID,  process.env.ALGOLIA_ADMIN_KEY);

export const onPostsCreated = (post) => {
    // Get the note document

  // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    console.log(post)
    return index.saveObject(post);
};

export const onPostsDeleted = (objectID) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(objectID);
};

export const onUserCreated = (userInfo) => {
  const index = client.initIndex('users');
  return index.saveObject(userInfo);
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
