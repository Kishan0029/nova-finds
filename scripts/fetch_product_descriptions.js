const fs = require('fs');

const products = [
  // Home & Org
  { name: 'Multi-purpose Rotating Storage Tray', query: 'Rotating Storage' },
  { name: 'Transparent Stackable Shoe Storage (6 pcs)', query: 'Shoe Storage' },
  { name: 'Wall-Mounted Magnetic Key & Mail Holder', query: 'Magnetic Key' },
  { name: 'Foldable Laundry Basket with Handles', query: 'Laundry Basket' },
  { name: 'Under-Sink Telescopic Rack Organizer', query: 'Sink Rack' },
  { name: 'Silicone Cable Organizers (10 pcs)', query: 'Cable Organizer' },
  { name: 'Vacuum Storage Bags with Hand Pump (5 pcs)', query: 'Vacuum Storage Bags' },
  { name: 'Automatic Toothpaste Dispenser', query: 'Toothpaste Dispenser' },
  { name: 'Reusable Lint Roller with Telescopic Pole', query: 'Lint Roller' },
  { name: 'Honeycomb Drawer Organizers (4 pcs)', query: 'Drawer Organizer' },
  { name: 'Adhesive Cable Management Clips', query: 'Cable Management' },
  { name: 'Expandable Over-the-Door Hooks', query: 'Door Hooks' },

  // Kitchen
  { name: '14-in-1 Vegetable Chopper and Slicer', query: 'Vegetable Chopper' },
  { name: 'Automatic Oil Dispenser with Silicone Brush', query: 'Oil Dispenser' },
  { name: 'Rechargeable Mini Garlic Chopper', query: 'Garlic Chopper' },
  { name: 'Extendable Stainless Steel Sink Colander', query: 'Colander' },
  { name: 'Silicone Stretch Lids (Set of 6)', query: 'Stretch Lids' },
  { name: '360-Degree Rotating Faucet Extender', query: 'Faucet Extender' },
  { name: 'Tiered Spice Rack Organizer', query: 'Spice Rack' },
  { name: 'Anti-Spill Silicone Funnel for Pots', query: 'Silicone Funnel' },
  { name: 'Multi-Layer Food Preservation Cover', query: 'Food Preservation' },

  // Smart Gadget
  { name: 'Motion Sensor Wireless LED Night Light', query: 'Motion Sensor Light' },
  { name: '3-in-1 Foldable Magnetic Wireless Charger', query: 'Wireless Charger' },
  { name: 'Portable Neck Fan (Rechargeable)', query: 'Neck Fan' },
  { name: 'Sunset Projection Lamp', query: 'Sunset Lamp' },
  { name: 'Electronic Measuring Spoon with LCD', query: 'Measuring Spoon' },
  { name: 'Smart LED Desk Lamp with Wireless Charging', query: 'Desk Lamp' },

  // Travel & Life
  { name: 'Electronic Organizer Travel Cable Pouch', query: 'Travel Pouch' },
  { name: 'Portable Mini Car Vacuum Cleaner', query: 'Car Vacuum' },
  { name: '4-in-1 Travel Dispenser Bottle', query: 'Dispenser Bottle' },
];

function cleanHtml(html) {
  if (!html) return '';
  let text = html
    .replace(/<style[^>]*>.*<\/style>/gi, '') // Remove style tags and content
    .replace(/<[^>]*>?/gm, ' ') // Replace tags with space
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
    
  // Escape single quotes for SQL
  return text.replace(/'/g, "''");
}

async function main() {
  console.log("Fetching descriptions from Deodap...");
  
  let sql = `-- Update product descriptions to match Deodap\n\n`;

  for (const p of products) {
    try {
      const res = await fetch(`https://deodap.in/search/suggest.json?q=${encodeURIComponent(p.query)}&resources[type]=product`);
      const data = await res.json();
      
      const results = data.resources?.results?.products;
      if (results && results.length > 0) {
        const item = results[0];
        const handle = item.handle;
        
        const prodRes = await fetch(`https://deodap.in/products/${handle}.json`);
        const prodData = await prodRes.json();
        
        const shopifyProduct = prodData.product;
        
        if (shopifyProduct && shopifyProduct.body_html) {
          // Clean the HTML to get raw text
          let description = cleanHtml(shopifyProduct.body_html);
          
          // Truncate to reasonable length so it doesn't break UI (first 400 chars, try not to cut mid-word)
          if (description.length > 400) {
             description = description.substring(0, 400).replace(/\s+\S*$/, '') + '...';
          }
          
          sql += `UPDATE products SET description = '${description}' WHERE name = '${p.name.replace(/'/g, "''")}';\n`;
          console.log(`✅ Generated SQL for ${p.name}`);
        } else {
          console.log(`⚠️ No description found for ${p.name}`);
        }
      } else {
        console.log(`❌ Product not found for ${p.name}`);
      }
      
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`💥 Failed to fetch for ${p.name}`, err);
    }
  }

  const outputPath = 'e:/08_Miscellanious Projects/Nova Finds/supabase/update_all_descriptions.sql';
  fs.writeFileSync(outputPath, sql);
  console.log(`\n🎉 Success! SQL script generated at ${outputPath}`);
}

main();
