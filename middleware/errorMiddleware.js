app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  });