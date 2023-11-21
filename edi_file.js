// edi_file.js

function generateEdifact(orderData) {
  // Generate EDIFACT content based on orderData
  const edifactContent = `UNA:+.? '
  UNB+UNOC:3+SenderID+ReceiverID+YYMMDD:HHMM+ReferenceNumber'
  UNH+ReferenceNumber+ORDERS:D:96A:UN:EAN008'
  BGM+220+${orderData.ordernumber}+9'
  DTM+4:${orderData.orderdate}:102'
  NAD+BY+${orderData.customerid}::9'
  LIN+1++Item1:IN'
  PIA+1+UPC:8598456320123:EA'
  IMD+F+VANILLA ICE CREAM'
  QTY+21:10'
  UNS+S'
  CNT+1:1'
  UNT+7+ReferenceNumber'
  UNZ+ReferenceNumber'`;

  return edifactContent;
}

module.exports = { generateEdifact };
