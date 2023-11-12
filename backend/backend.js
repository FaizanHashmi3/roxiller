const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a model for product transactions
const Transaction = mongoose.model('Transaction', {
  productId: String,
  productName: String,
  productDescription: String,
  productPrice: Number,
  dateOfSale: Date,
  quantity: Number,
});

// Create an API to initialize the database
app.get('/initialize', async (req, res) => {
  // Fetch the JSON from the third party API
  const response = await request('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

  // Parse the JSON response
  const transactions = JSON.parse(response.body);

  // Insert the transactions into the database
  transactions.forEach(async (transaction) => {
    const newTransaction = new Transaction(transaction);
    await newTransaction.save();
  });

  res.send('Database initialized successfully!');
});

// Create an API to list all transactions
app.get('/transactions', async (req, res) => {
  // Get the search and pagination parameters
  const search = req.query.search;
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  // Build the MongoDB query
  let query = {};
  if (search) {
    query = {
      $or: [
        { productName: { $regex: new RegExp(search, 'i') } },
        { productDescription: { $regex: new RegExp(search, 'i') } },
        { productPrice: { $eq: Number(search) } },
      ],
    };
  }

  // Paginate the results
  const transactions = await Transaction.find(query).skip(perPage * (page - 1)).limit(perPage);

  // Send the response
  res.send(transactions);
});

// Create an API for statistics
app.get('/statistics/:month', async (req, res) => {
  const month = req.params.month;

  // Get the total sale amount of the selected month
  const totalSaleAmount = await Transaction.aggregate([
    { $match: { dateOfSale: { $month: month } } },
    { $group: { _id: null, totalSaleAmount: { $sum: '$productPrice' } } },
  ])[0].totalSaleAmount;

  // Get the total number of sold items of the selected month
  const totalSoldItems = await Transaction.aggregate([
    { $match: { dateOfSale: { $month: month } } },
    { $group: { _id: null, totalSoldItems: { $sum: '$quantity' } } },
  ])[0].totalSoldItems;

  // Get the total number of not sold items of the selected month
  const totalNotSoldItems = await Transaction.estimatedDocumentCount({ dateOfSale: { $month: month } }) - totalSoldItems;

  // Send the response
  res.send({
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});


