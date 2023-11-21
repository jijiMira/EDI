const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
const port = 3000; // You can use any available port

// PostgreSQL database connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "edi",
  password: "562001",
  port: 5432,
});

// API endpoint to get data from the "order" table
const getOrder = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Order";');
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/Order", getOrder);

// search by order by id
const getOrderById = (req, res) => {
  const orderId = req.params.id;

  if (isNaN(orderId)) {
    return res.status(400).json({ error: "Invalid or missing 'id' parameter" });
  }

  const query = {
    text: 'SELECT * FROM "Order" WHERE id = $1',
    values: [orderId],
  };

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(result.rows);
  });
};

app.get("/Order/:id", getOrderById);

// add an order
// const createOrder = (request, response) => {
//   const { orderdate, ordernumber, customerid, totalamount } = request.body;

//   pool.query(
//     'INSERT INTO "Order" (orderdate, ordernumber, customerid, totalamount) VALUES ($1, $2, $3, $4);',
//     [orderdate, ordernumber, customerid, totalamount],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`Order added`);
//     }
//   );

//   // edi.createEDI(request.body)
// };

const insertOrder = async (req, res) => {
  const { id, orderdate, ordernumber, customerid, totalamount } = req.body; // Assuming the request body contains these properties

  try {
    const query = {
      text: 'INSERT INTO "Order" (id, orderdate, ordernumber, customerid, totalamount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [id, orderdate, ordernumber, customerid, totalamount],
    };

    const result = await pool.query(query);
    res.json(result.rows[0]); // Assuming you want to return the newly inserted order
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.post("/Order", insertOrder);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

//export methodes
module.exports = insertOrder;
module.exports = getOrder;
module.exports = getOrderById;
