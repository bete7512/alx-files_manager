/* eslint-disable import/extensions */
import dbClient from './utils/db.js';

const waitConnection = () => new Promise((resolve, reject) => {
  let i = 0;
  const repeatFct = async () => {
    await setTimeout(() => {
      i += 1;
      if (i >= 10) {
        reject();
      } else if (!dbClient.isAlive()) {
        repeatFct();
      } else {
        resolve();
      }
    }, 1000);
  };
  repeatFct();
});

(async () => {
  await waitConnection();
  console.log(dbClient.isAlive());
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
