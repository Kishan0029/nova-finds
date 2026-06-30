const fs = require('fs');

const products = [
  // Home & Org
  { name: 'Multi-purpose Rotating Storage Tray', query: 'Rotating Storage', ourPrice: 399 },
  { name: 'Transparent Stackable Shoe Storage (6 pcs)', query: 'Shoe Storage', ourPrice: 999 },
  { name: 'Wall-Mounted Magnetic Key & Mail Holder', query: 'Magnetic Key', ourPrice: 349 },
  { name: 'Foldable Laundry Basket with Handles', query: 'Laundry Basket', ourPrice: 549 },
  { name: 'Under-Sink Telescopic Rack Organizer', query: 'Sink Rack', ourPrice: 749 },
  { name: 'Silicone Cable Organizers (10 pcs)', query: 'Cable Organizer', ourPrice: 249 },
  { name: 'Vacuum Storage Bags with Hand Pump (5 pcs)', query: 'Vacuum Storage Bags', ourPrice: 699 },
  { name: 'Automatic Toothpaste Dispenser', query: 'Toothpaste Dispenser', ourPrice: 399 },
  { name: 'Reusable Lint Roller with Telescopic Pole', query: 'Lint Roller', ourPrice: 499 },
  { name: 'Honeycomb Drawer Organizers (4 pcs)', query: 'Drawer Organizer', ourPrice: 299 },
  { name: 'Adhesive Cable Management Clips', query: 'Cable Management', ourPrice: 249 },
  { name: 'Expandable Over-the-Door Hooks', query: 'Door Hooks', ourPrice: 449 },

  // Kitchen
  { name: '14-in-1 Vegetable Chopper and Slicer', query: 'Vegetable Chopper', ourPrice: 899 },
  { name: 'Automatic Oil Dispenser with Silicone Brush', query: 'Oil Dispenser', ourPrice: 499 },
  { name: 'Rechargeable Mini Garlic Chopper', query: 'Garlic Chopper', ourPrice: 549 },
  { name: 'Extendable Stainless Steel Sink Colander', query: 'Colander', ourPrice: 699 },
  { name: 'Silicone Stretch Lids (Set of 6)', query: 'Stretch Lids', ourPrice: 249 },
  { name: '360-Degree Rotating Faucet Extender', query: 'Faucet Extender', ourPrice: 349 },
  { name: 'Tiered Spice Rack Organizer', query: 'Spice Rack', ourPrice: 749 },
  { name: 'Anti-Spill Silicone Funnel for Pots', query: 'Silicone Funnel', ourPrice: 299 },
  { name: 'Multi-Layer Food Preservation Cover', query: 'Food Preservation', ourPrice: 549 },

  // Smart Gadget
  { name: 'Motion Sensor Wireless LED Night Light', query: 'Motion Sensor Light', ourPrice: 499 },
  { name: '3-in-1 Foldable Magnetic Wireless Charger', query: 'Wireless Charger', ourPrice: 949 },
  { name: 'Portable Neck Fan (Rechargeable)', query: 'Neck Fan', ourPrice: 699 },
  { name: 'Sunset Projection Lamp', query: 'Sunset Lamp', ourPrice: 549 },
  { name: 'Electronic Measuring Spoon with LCD', query: 'Measuring Spoon', ourPrice: 449 },
  { name: 'Smart LED Desk Lamp with Wireless Charging', query: 'Desk Lamp', ourPrice: 999 },

  // Travel & Life
  { name: 'Electronic Organizer Travel Cable Pouch', query: 'Travel Pouch', ourPrice: 499 },
  { name: 'Portable Mini Car Vacuum Cleaner', query: 'Car Vacuum', ourPrice: 799 },
  { name: '4-in-1 Travel Dispenser Bottle', query: 'Dispenser Bottle', ourPrice: 549 },
];

async function main() {
  console.log("Generating pricing report...");
  let markdown = `# Nova Finds - Product Pricing & Profitability Report\n\n`;
  markdown += `Below is the list of all 30 products currently configured on **Nova Finds**, showing the corresponding **Deodap Wholesale Price**, **Deodap Product Link**, **Nova Finds Selling Price**, and projected gross profit margins.\n\n`;
  
  markdown += `| Product Name (Nova Finds) | Deodap Product Name | Deodap Wholesale Price | Nova Finds Selling Price | Profit Margin (Gross) | Markup | Deodap Link |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const p of products) {
    try {
      const res = await fetch(`https://deodap.in/search/suggest.json?q=${encodeURIComponent(p.query)}&resources[type]=product`);
      const data = await res.json();
      
      const results = data.resources?.results?.products;
      if (results && results.length > 0) {
        const item = results[0];
        const deodapPrice = Math.round(parseFloat(item.price));
        const deodapName = item.title;
        const deodapLink = `https://deodap.in/products/${item.handle}`;
        
        const profit = p.ourPrice - deodapPrice;
        const markupPercent = Math.round((profit / deodapPrice) * 100);
        
        markdown += `| **${p.name}** | ${deodapName} | ₹${deodapPrice} | ₹${p.ourPrice} | ₹${profit} | ${markupPercent}% | [Deodap Link](${deodapLink}) |\n`;
      } else {
        markdown += `| **${p.name}** | *Not Found* | - | ₹${p.ourPrice} | - | - | - |\n`;
      }
      
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Failed to fetch for ${p.name}`, err);
      markdown += `| **${p.name}** | *Fetch Error* | - | ₹${p.ourPrice} | - | - | - |\n`;
    }
  }

  // Save to artifacts directory
  const artifactPath = 'C:/Users/kisha/.gemini/antigravity-ide/brain/36105b48-cc71-4a77-9d09-44f61c6502ac/artifacts/pricing_report.md';
  fs.writeFileSync(artifactPath, markdown);
  console.log(`Saved report to ${artifactPath}`);
}

main();
