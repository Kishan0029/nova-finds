const fs = require('fs');

const products = [
  // Home & Org
  { name: 'Multi-purpose Rotating Storage Tray', price: 399, original: 599, cat: 'home', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Instantly turns messy cabinets into aesthetic, organized spaces.' },
  { name: 'Transparent Stackable Shoe Storage (6 pcs)', price: 999, original: 1499, cat: 'home', img: 'https://images.unsplash.com/photo-1600269450099-58dd51483321?q=80&w=600&auto=format&fit=crop', desc: 'High visual appeal for sneakerheads and aesthetic room makeovers.' },
  { name: 'Wall-Mounted Magnetic Key & Mail Holder', price: 349, original: 499, cat: 'home', img: 'https://images.unsplash.com/photo-1518342719231-50e50e123689?q=80&w=600&auto=format&fit=crop', desc: 'Solves a daily annoyance; sleek wooden/minimalist look.' },
  { name: 'Foldable Laundry Basket with Handles', price: 549, original: 799, cat: 'home', img: 'https://images.unsplash.com/photo-1627918331393-78f99e4f169c?q=80&w=600&auto=format&fit=crop', desc: 'Great "before and after" room cleaning transformation potential.' },
  { name: 'Under-Sink Telescopic Rack Organizer', price: 749, original: 999, cat: 'home', img: 'https://images.unsplash.com/photo-1581428982868-e410dd4477c8?q=80&w=600&auto=format&fit=crop', desc: 'Satisfying sink organization ASMR; huge problem solver.' },
  { name: 'Silicone Cable Organizers (10 pcs)', price: 249, original: 399, cat: 'accessories', img: 'https://images.unsplash.com/photo-1606213702587-f83130d2fcad?q=80&w=600&auto=format&fit=crop', desc: 'Perfect impulse buy. Fixes messy desk setups instantly.' },
  { name: 'Vacuum Storage Bags with Hand Pump (5 pcs)', price: 699, original: 999, cat: 'home', img: 'https://images.unsplash.com/photo-1544927237-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Extremely satisfying deflation demonstration; high utility.' },
  { name: 'Automatic Toothpaste Dispenser', price: 399, original: 599, cat: 'home', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Upgrades bathroom aesthetics; feels like a smart home hack.' },
  { name: 'Reusable Lint Roller with Telescopic Pole', price: 499, original: 699, cat: 'home', img: 'https://images.unsplash.com/photo-1627918331393-78f99e4f169c?q=80&w=600&auto=format&fit=crop', desc: 'Perfect for pet owners; highly visual cleaning demonstration.' },
  { name: 'Honeycomb Drawer Organizers (4 pcs)', price: 299, original: 499, cat: 'home', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop', desc: 'Perfect for aesthetic drawer organization videos.' },
  { name: 'Adhesive Cable Management Clips', price: 249, original: 399, cat: 'accessories', img: 'https://images.unsplash.com/photo-1596773539744-8854045f2f51?q=80&w=600&auto=format&fit=crop', desc: 'Easy add-on item for desk makeover content.' },
  { name: 'Expandable Over-the-Door Hooks', price: 449, original: 599, cat: 'home', img: 'https://images.unsplash.com/photo-1518342719231-50e50e123689?q=80&w=600&auto=format&fit=crop', desc: 'Zero installation required; instant space-saving hack.' },

  // Kitchen
  { name: '14-in-1 Vegetable Chopper and Slicer', price: 899, original: 1299, cat: 'home', img: 'https://images.unsplash.com/photo-1592688009964-b63e9b177d54?q=80&w=600&auto=format&fit=crop', desc: 'Classic viral product; loud, fast, and satisfying to watch.' },
  { name: 'Automatic Oil Dispenser with Silicone Brush', price: 499, original: 799, cat: 'home', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Looks premium, promotes healthy cooking, very aesthetic.' },
  { name: 'Rechargeable Mini Garlic Chopper', price: 549, original: 899, cat: 'home', img: 'https://images.unsplash.com/photo-1592688009964-b63e9b177d54?q=80&w=600&auto=format&fit=crop', desc: 'Huge time-saver, tech-enabled kitchen gadget.' },
  { name: 'Extendable Stainless Steel Sink Colander', price: 699, original: 999, cat: 'home', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop', desc: 'Very functional; great for aesthetic fruit washing videos.' },
  { name: 'Silicone Stretch Lids (Set of 6)', price: 249, original: 499, cat: 'home', img: 'https://images.unsplash.com/photo-1627918331393-78f99e4f169c?q=80&w=600&auto=format&fit=crop', desc: 'Eco-friendly alternative to plastic wrap; easy to demo.' },
  { name: '360-Degree Rotating Faucet Extender', price: 349, original: 599, cat: 'home', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Visually striking water flow modes; instant kitchen upgrade.' },
  { name: 'Tiered Spice Rack Organizer', price: 749, original: 1099, cat: 'home', img: 'https://images.unsplash.com/photo-1596773539744-8854045f2f51?q=80&w=600&auto=format&fit=crop', desc: 'Highly aesthetic kitchen restock/organization potential.' },
  { name: 'Anti-Spill Silicone Funnel for Pots', price: 299, original: 499, cat: 'home', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Simple, clever problem solver for boiling water/soups.' },
  { name: 'Multi-Layer Food Preservation Cover', price: 549, original: 899, cat: 'home', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop', desc: 'Solves fridge space issues; highly visual stacking demo.' },

  // Smart Gadget
  { name: 'Motion Sensor Wireless LED Night Light', price: 499, original: 799, cat: 'electronics', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop', desc: 'Makes any home look expensive and futuristic instantly.' },
  { name: '3-in-1 Foldable Magnetic Wireless Charger', price: 949, original: 1499, cat: 'electronics', img: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=600&auto=format&fit=crop', desc: 'Perfect for Apple ecosystem users; looks incredibly premium.' },
  { name: 'Portable Neck Fan (Rechargeable)', price: 699, original: 999, cat: 'electronics', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop', desc: 'Great summer impulse buy; futuristic aesthetic.' },
  { name: 'Sunset Projection Lamp', price: 549, original: 899, cat: 'electronics', img: 'https://images.unsplash.com/photo-1601314959190-27f8cc363821?q=80&w=600&auto=format&fit=crop', desc: 'Creates instant aesthetic room vibes for content creators.' },
  { name: 'Electronic Measuring Spoon with LCD', price: 449, original: 799, cat: 'electronics', img: 'https://images.unsplash.com/photo-1584061413809-7756f7ef0f62?q=80&w=600&auto=format&fit=crop', desc: 'Perfect for fitness/diet niches and aesthetic baking.' },
  { name: 'Smart LED Desk Lamp with Wireless Charging', price: 999, original: 1599, cat: 'electronics', img: 'https://images.unsplash.com/photo-1518342719231-50e50e123689?q=80&w=600&auto=format&fit=crop', desc: 'Premium desk setup essential; high perceived value.' },

  // Travel & Life
  { name: 'Electronic Organizer Travel Cable Pouch', price: 499, original: 799, cat: 'lifestyle', img: 'https://images.unsplash.com/photo-1606213702587-f83130d2fcad?q=80&w=600&auto=format&fit=crop', desc: 'Extremely relatable problem (tangled wires); great for packing ASMR.' },
  { name: 'Portable Mini Car Vacuum Cleaner', price: 799, original: 1299, cat: 'lifestyle', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop', desc: 'High-satisfaction cleaning content; strong utility.' },
  { name: '4-in-1 Travel Dispenser Bottle', price: 549, original: 899, cat: 'lifestyle', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop', desc: 'Clever, space-saving travel hack that surprises viewers.' },
];

let sql = `-- Clear existing products for fresh seed\nTRUNCATE TABLE products;\n\nINSERT INTO products (id, name, description, price, original_price, rating, reviews, category, image, stock) VALUES \n`;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomRating = () => (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);

const values = products.map(p => {
  const reviews = getRandomInt(40, 500);
  const stock = getRandomInt(20, 200);
  const rating = getRandomRating();
  return `(gen_random_uuid(), '${p.name.replace(/'/g, "''")}', '${p.desc.replace(/'/g, "''")}', ${p.price}, ${p.original}, ${rating}, ${reviews}, '${p.cat}', '${p.img}', ${stock})`;
});

sql += values.join(',\n') + ';\n';

fs.writeFileSync('e:/08_Miscellanious Projects/Nova Finds/supabase/deodap_seed.sql', sql);
console.log('SQL generated successfully.');
