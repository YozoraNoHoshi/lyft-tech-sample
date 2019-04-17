const express = require('express');
const app = express();

app.use(express.json());

app.post('/test', function(req, res, next) {
  try {
    // Goes to error handler if string_to_cut isnt provided
    if (!req.body.hasOwnProperty('string_to_cut')) {
      let error = new Error("Missing required property 'string_to_cut'");
      error.status = 400;
      throw error;
    }
    // Handles primitives, will not handle objects
    req.body.string_to_cut = req.body.string_to_cut.toString();
    let return_string = '';
    for (let i = 0; i < req.body.string_to_cut.length; i++) {
      // if clean divide by 3 then add it to our return string
      if ((i + 1) % 3 === 0) {
        return_string += req.body.string_to_cut[i];
      }
    }
    return res.status(200).json({ return_string });
  } catch (error) {
    return next(error);
  }
});

// 404's at any other route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Global Error Handler
app.use(function(err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;
