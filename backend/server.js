const port = process.env.PORT || 5000;
const app = require('./app');

(async () => {
  try {
    app.listen(port, () => {
      return console.log(`-==::APP is running on ${port} port::==-`);
    });
  } catch (error) {
    console.error('Failed to initialize the app', error);
  }
})();