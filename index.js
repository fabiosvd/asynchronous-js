const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File could not be found');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) reject('Could not write file');
      resolve('Sucess');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return 'READY 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('2: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then(() => {
//     console.log('2: Done getting dog pics!');
//   })
//   .catch(err => {
//     console.log('ERROR 💥');
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
