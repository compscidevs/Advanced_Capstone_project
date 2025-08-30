const fs = require('fs').promises;
const path = require('path');
const AgreementModel = require('./models/agreementModel'); // Import the model

// Agreement class to structure data
class Agreement {
  constructor(sellerPhone, buyerPhone, sellerName, buyerName, description) {
    this.id = Date.now(); // Temporary ID generation (replace with model logic)
    this.sellerPhone = sellerPhone;
    this.buyerPhone = buyerPhone;
    this.sellerName = sellerName;
    this.buyerName = buyerName;
    this.description = description;
    this.extractedTerms = this.extractTerms(description);
    this.status = 'Pending Confirmation';
  }

  // Simple regex-based term extraction (simulating NLP)
  extractTerms(description) {
    const terms = {};

    // Quantity: e.g., "100kg"
    const quantityMatch = description.match(/(\d+(?:,\d+)?)\s*(kg|units|pieces|bags)/i);
    if (quantityMatch) {
      terms.quantity = quantityMatch[1];
      terms.unit = quantityMatch[2];
    }

    // Item: e.g., "maize"
    const itemMatch = description.match(/sell\s*(.*?)\s*to/i);
    if (itemMatch) {
      terms.item = itemMatch[1].trim();
    }

    // Price: e.g., "200,000 Ugandan Shillings" or "200000 UGX"
    const priceMatch = description.match(/(\d+(?:,\d+)?)\s*(Ugandan Shillings|UGX)/i);
    if (priceMatch) {
      terms.price = priceMatch[1];
      terms.currency = priceMatch[2];
    }

    // Deadline: e.g., "this Friday by 10 AM"
    const deadlineMatch = description.match(/(this|next)\s*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*by\s*(\d{1,2}(?::\d{2})?\s*(AM|PM))/i);
    if (deadlineMatch) {
      terms.deadline = `${deadlineMatch[1]} ${deadlineMatch[2]} by ${deadlineMatch[3]}`;
    }

    // Location: e.g., "Busega market"
    const locationMatch = description.match(/at\s*(the\s*)?([A-Za-z]+\s*market)/i);
    if (locationMatch) {
      terms.location = locationMatch[2];
    }

    return terms;
  }

  // Method to print terms
  printTerms() {
    console.log("Extracted Terms:", this.extractedTerms);
  }
}

// Controller function to read and process controller.json
async function processAgreementRequest() {
  try {
    // Read controller.json from file
    const filePath = path.join(__dirname, 'requests/controller.json');
    const data = await fs.readFile(filePath, 'utf8');
    const request = JSON.parse(data);

    // Validate request
    const { seller, buyer, description } = request;
    if (!seller || !buyer || !description) {
      throw new Error('Missing required fields: seller, buyer, description');
    }
    if (!seller.phone || !buyer.phone) {
      throw new Error('Phone numbers are required for both seller and buyer');
    }

    // Create new agreement
    const agreement = new Agreement(
      seller.phone,
      buyer.phone,
      seller.name || 'Unknown',
      buyer.name || 'Unknown',
      description
    );

    // Print terms immediately after creation
    console.log("Terms extracted from controller.json:");
    agreement.printTerms();

    // Call model to save agreement
    const savedAgreement = await AgreementModel.createAgreement(agreement);

    // Update status (this could be moved to model logic later)
    savedAgreement.status = 'Confirmed';

    // Log result (simulating API response) and print terms again
    console.log({
      message: 'Agreement created',
      id: savedAgreement.id,
      agreement: {
        id: savedAgreement.id,
        sellerPhone: savedAgreement.sellerPhone,
        buyerPhone: savedAgreement.buyerPhone,
        extractedTerms: savedAgreement.extractedTerms,
        status: savedAgreement.status
      }
    });
    console.log("Final Extracted Terms after saving:", savedAgreement.extractedTerms);

    return savedAgreement;
  } catch (error) {
    console.error('Error processing request:', error.message);
    throw error;
  }
}

// Example usage to test with a manual agreement
const testAgreement = new Agreement(
  "123-456-7890",
  "987-654-3210",
  "John",
  "Jane",
  "Sell 100kg of maize to Jane at Busega market for 200,000 UGX by this Friday by 10 AM"
);
console.log("Terms from test agreement:");
testAgreement.printTerms();

module.exports = { processAgreementRequest };