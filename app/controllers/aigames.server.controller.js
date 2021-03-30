//ref: https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4


const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

//loading iris training and testing data
const iris = require('../../health.json');
var irisTesting = require('../../health-testing.json');

// build neural network using a sequential model
const model = tf.sequential();

exports.isTrained = function (req, res) {
  if (model.isTraining) {
    res.json({ status: 'Trained'});

  } else {
    res.json({ status: 'not tranined yet'});
  }
  
};

exports.train = function (req, res) {
    //console.log(irisTesting);

// convert/setup our data for tensorflow.js
//tensor of features for training data
// include only features, not the output

const trainingData = tf.tensor2d(iris.map(item => [
  item.body_temperature, item.heart_rate, item.respiratory_rate, item.high_blood_pressure,
]))

 //   console.log(trainingData.dataSyn());
//tensor of output for traning data
// the values for species will be
// Heart disease: 1,0,0
// Hypertension: 0,1,0
// Diabetes: 0, 0, 1

const outputData = tf.tensor2d(iris.map(item => [
  item.species === "Heart disease" ? 1 : 0,
  item.species === "Hypertension" ? 1 : 0,
  item.species === "Diabetes" ? 1 : 0,
]))
 //   console.log(trainingData.dataSyn());

// const testingData = tf.tensor2d(irisTesting.map(item => [
//   item.body_temperature, item.heart_rate,
//   item.respiratory_rate, item.high_blood_pressure,
// ]))

 //   console.log(trainingData.dataSyn());

// build neural network using a sequential model
//const model = tf.sequential()
//add the first layer
model.add(tf.layers.dense({
  inputShape: [4],  //four input neurons
  activation: "sigmoid",
  units: 5,   //dimension of output space (first hidden layer)
}))

//add the hidden layer
model.add(tf.layers.dense({
  inputShape: [5],  //dimension of hidden layer
  activation: "sigmoid",
  units: 3, //dimension of final output  (Heart disease, Hypertension, Diabetes)
}))

////add output layer
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3,  //dimension of final output  (Heart disease, Hypertension, Diabetes)
}))

//compile the model with an MSE loss function and Adam algorithm
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})
//console.log(model.summary());

//train the model and predict the results for testing data
//
//train/fit the model for the fixed number of epochs
async function run(){

    // train/fit our network
const startTime = Date.now();
await model.fit(trainingData, outputData, 
    {
        epochs: 100,
        callbacks:{
            onEpochEnd: async (epoch, log) =>{
                //lossValue = log.loss;
                //console.log (`Epoch ${epoch}: lossValue = ${log.loss}`);
                //elapsedTime =Date.now() -startTime;
                //console.log ("elapsed time: "+ elapsedTime);
            }
        }
    }).then(re => {
      res.json({ status: 'Trained!'});
    })
}; //end of run function

run();

};

exports.predict = function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  console.log("predict....");
  irisTesting[0].body_temperature = parseFloat(req.query.body_temperature);
  irisTesting[0].heart_rate = parseFloat(req.query.heart_rate);
  irisTesting[0].respiratory_rate = parseFloat(req.query.respiratory_rate);
  irisTesting[0].high_blood_pressure = parseFloat(req.query.high_blood_pressure);

  const testingData = tf.tensor2d(irisTesting.map(item => [
    item.body_temperature, item.heart_rate,
    item.respiratory_rate, item.high_blood_pressure,
  ]));

  //console.log("irisTesting ="+ irisTesting[0].body_temperature);
  console.log("testingData " + testingData);
  const results = model.predict(testingData);
  console.log('prediction results: ', results.dataSync());
  var temp = results.dataSync();
  var retunrValue = '';
  if(temp[0] > 0.5) 
    retunrValue = "Heart disease";
  if(temp[1] > 0.5) 
    retunrValue = "Hypertension";
  if(temp[2] > 0.5) 
    retunrValue = "Diabetes";
  res.send(retunrValue);
  //results.print();
 
};
