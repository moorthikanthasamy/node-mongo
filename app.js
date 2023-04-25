import { MongoClient } from "mongodb"
import { readFile } from "node:fs"

const URL = "mongodb://localhost:27017"
const client = new MongoClient(URL)

/**
 * @param {*} documentObj Object containing list of properties to manipulate
 * @returns Object to insert into the database
 */
const constructDocument = async documentObj => {
   const { name, year, artists, genres, copyrights } = documentObj
   return {
      name,
      year,
      artistsCount: artists?.length || 0,
      genres: genres?.map(genre => genre.name) || [],
      copyrights_song_id: copyrights?.[copyrights?.length - 1]?.id
   }
}
client.connect().then(function (databaseObj) {
   /**
    * Creating a new database and collection if it doesn't exist
    */
   const musicDb = databaseObj.db('Music')
   const songsCollection = musicDb.collection('songs')
   /**
    * Reading the songs documents from the data.json file
    */
   readFile('./data.json', 'utf8', async function (err, data) {
      if (err) console.error('error while reading the file ', err)
      /**
       * Construct the document to insert into the database
       */
      JSON.parse(data).forEach(async item => {
         const constructedDocument = await constructDocument(item)
         const insertedDocument = await songsCollection.insertOne(constructedDocument)
         console.log(`🔥 :: file: app.js:34 :: JSON.parse :: insertedDocument:`, insertedDocument)
      });
      console.log('outside program')
   })
   // Close connection
   // client.close()
}).catch(error => console.error('error while connecting to the database', error))
