const DB = {
  user: "ezugnvxarovemt",
  password: "c226393145e5218c9772a534e6f50a5b247965fc4237b78189a01346fa38bad3",
  database: "dcsd5t9s4crp8a",
  port: 5432,
  host: "ec2-44-196-174-238.compute-1.amazonaws.com",
  ssl: { require: true, rejectUnauthorized: false },
};

const pg = require("pg");
const pool = new pg.Pool(DB);

pool.connect((err) => {
  if (err) {
    console.log("error connecting to db", err.stack);
    process.exit(1);
  }
  console.log("Conneted to db...");
});

const excuteQuery = (query, arrayParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayParams, (err, data) => {
        if (err) {
          console.log("error excuting the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { excuteQuery };
