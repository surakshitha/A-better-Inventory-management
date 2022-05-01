const { getDb, getNextSequence } = require('./db');

async function add(_, { product }) {
  const db = getDb();
  const newProduct = Object.assign({}, product);
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);
  const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProduct;
}

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  return products;
}

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}

async function update(_, { id, changes }) {
  console.log('changes: ', changes);
  const db = getDb();
  if (changes.name || changes.category || changes.price || changes.image) {
    const product = await db.collection('products').findOne({ id });
    Object.assign(product, changes);
  }

  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('products').findOne({ id });
  console.log('Saved product: ', savedProduct);
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  product.deleted = new Date();

  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function findCount() {
  const db = getDb();
  const products = await db.collection('products')
    .aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]).toArray();
  return products[0].total;
}

module.exports = {
  list, add, get, update, delete: remove, findCount,
};
