const Datastore = require('nedb');
const auth = new Datastore({ filename: 'store/auth.db', autoload: true });

module.exports.collection = auth;

module.exports.insert = (data, callback) => {
  auth.insert(data, callback);
};

module.exports.update = (query, data) => {
  auth.update(query, data);    
};

module.exports.findOne = (query, callback) => {
  auth.findOne(query, callback);
};

module.exports.all = callback => {
  auth.find({}, callback);
};

module.exports.clear = () => {
  auth.remove({}, { multi: true }, (err, numRemoved) => {
    console.log(`numRemoved = ${numRemoved}`);
  });
}