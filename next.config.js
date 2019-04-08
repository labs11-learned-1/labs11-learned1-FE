
   

    module.exports = {
     
      target: 'serverless',
      env: {
        "FIREBASE_KEY": process.env.FIREBASE_KEY,
        "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
        "DATABASE_URL": process.env.DATABASE_URL,
        "PROJECT_ID": process.env.PROJECT_ID,
        "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
        "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
        "UDEMY_CLIENT_ID": process.env.UDEMY_CLIENT_ID,
        "UDEMY_CLIENT_SECRET": process.env.UDEMY_CLIENT_SECRET
      }
      
    };