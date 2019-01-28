const mongoose = require('mongoose');
const Photo = require('./PhotoModel');
const faker = require('faker');

mongoose.connect('mongodb://localhost/trailPhotosDB', { useNewUrlParser: true });

let db = mongoose.connection;


db.once('open', () => {
  console.log('Connected successfully!');
}); 


// Create Photos
const photoUrlArray = [];

const getFakerPhotos = () => {
  for (let i = 0; i <= 1000; i++) {
    photoUrlArray.push(faker.image.imageUrl(1000, i));
  }
};

getFakerPhotos();

Photo.deleteMany({}, function(err) { 
  console.log('collection removed'); 

  // Batch configuration
  let batchLimit = 5000;
  let batch = 1;

  let photosBatch = [];

  // Photo creation set to 5 photos per trail i.e. record
  const createPhoto = (trailId) => {

    let photosPerTrail = 5;

    let hero = false;

    while ( photosPerTrail > 0) {

      if (photosPerTrail === 1) {
        hero = true;
      }

      let photo = new Photo({
        trail_id: trailId,  
        user_id: faker.random.number({'min': 1, 'max': 100}),
        upload_date: faker.date.past().toISOString(),
        photo_url: photoUrlArray[Math.floor(Math.random() * photoUrlArray.length)],
        caption: faker.lorem.words(),
        is_hero_photo: hero
      });

      photosBatch.push(photo);

      photosPerTrail--;
    }
  };


  // Batch saver
  const batchSaver = () => {
    return new Promise ((resolve, reject) => {
      Photo.insertMany(photosBatch, (err, docs) => {
        if (err) {
          reject('error occured in inserting to db: ', err);
        } else {
          resolve();
        }
      });
    }); 
  };


  // Number of total records to be saved to db
  let records = 1000000;

  const createRecords = async () => {
  // Loop to create 10m trail Ids 

    for (i = records; i > 0; i--) {

      createPhoto(i);

      if (photosBatch.length === batchLimit) {
   
        await batchSaver();

        photosBatch.length = 0;

      }
    }
    console.log(`Completed saving ${records} primary records to DB`);
  };


  createRecords();

});



