const fakeDataPath = './fake-data.json';

module.exports = {
  async read(collection, options){
    let fakeData = require(fakeDataPath);
    return fakeData[collection];
  }
}