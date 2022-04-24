/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.remove({});
db.deleted_products.remove({});

const productsDB = [
  {
    id: 1,
    category: 'Shirts',
    price: 16.99,
    name: 'Blue Shirt',
    image: 'https://assets.ajio.com/medias/sys_master/root/hbc/hfc/15226682966046/-473Wx593H-460321527-blue-MODEL.jpg',
  },
  {
    id: 2,
    category: 'Accessories',
    price: 12.99,
    name: 'Logo Hat',
    image: 'https://i.pinimg.com/originals/dd/69/63/dd696369de06bb6db33a26fd6006af2b.jpg',
  },
  {
    id: 3,
    category: 'Jeans',
    price: 34.99,
    name: 'Regular Fit Jeans',
    image: 'https://cdn15.nnnow.com/web-images/large/styles/E3X6VEVQRUM/1584521840230/1.jpg',
  },
];

db.products.insertMany(productsDB);

const count = db.products.count();
print('Inserted', count, ' products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });

db.deleted_products.createIndex({ id: 1 }, { unique: true });
