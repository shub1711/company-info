const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pg = require("pg");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT;

const config = {
  database: "details",
};

const pool = new pg.Pool(config);

app.get("/company-details", async (req, res) => {
  try {
    pool.connect((err, client, done) => {
      if (err) throw err;
      pool.connect(async (err, client, done) => {
        if (err) throw err;
        const response = await client.query("SELECT * FROM company_detail");

        console.log("response: ", response.rows);
        res.json({ success: true, msg: "", payload: response.rows });
      });
    });
  } catch (e) {
    res
      .status(401)
      .json({ success: false, msg: "Could not get the company details.!" });
  }
});

app.post("/add-company-info", async (req, res) => {
  console.log("req:", req);
  const body = req.body;
  console.log("body: ", body);
  const { selectedCompany, CIN } = body;
  try {
    const query = `INSERT INTO company_detail (company_name, cin) VALUES ($1, $2) RETURNING *;`;

    pool.connect(async (err, client, done) => {
      if (err) throw err;
      const response = await client.query(query, [selectedCompany, CIN]);
      console.log("response: ", response.rows);

      res.json({ success: true, msg: "", payload: response });
    });
  } catch (e) {
    res
      .status(401)
      .json({ success: false, msg: "Could not make a new company entry!" });
  }
});

app.listen(PORT, () => {
  console.debug(`Server is live at http://localhost:${PORT}`);
});
