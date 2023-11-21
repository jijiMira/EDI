const { generateEdifact } = require("./edi_file");

// Assuming you have the order data
const orderData = {
  ordernumber: "542380",
  orderdate: "2012-07-04",
  customerid: "85",
  // Add any other relevant order data here
};

// Generate the EDIFACT content
const edifactContent = generateEdifact(orderData);

// Write the EDIFACT content to a file (e.g., edifact_output.edi)
const fs = require("fs");
fs.writeFileSync("edifact_output.edi", edifactContent);

console.log("EDIFACT file has been generated.");
