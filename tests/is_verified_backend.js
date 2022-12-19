require("dotenv").config();
const axios = require("axios");

const client = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3000}`,
  timeout: 10 * 1000,
});

const getItems = async () => {
  const results = await client.get('/api/items?limit=1000&offset=0');
  return results.data?.items;
};

const testItems = async () => {
  const items = await getItems();
  const notVerifiedSellerItem = items.find(i => i.slug === 'not_verified_seller_item');
  if (!notVerifiedSellerItem) {
    console.log(`=!=!=!=!= ERROR: could not find item for non verified seller when calling /api/items`);
    return false;
  }

  if (notVerifiedSellerItem?.seller?.isVerified === undefined) {
    console.log(`=!=!=!=!= ERROR: the item's seller doesn't have the "isVerified" field when calling /api/items`);
    return false;
  }

  if (notVerifiedSellerItem?.seller?.isVerified !== false) {
    console.log(`=!=!=!=!= ERROR: "isVerified" is not set to "false" a non verified seller when calling /api/items`);
    return false;
  }

  const verifiedSellerItem = items.find(i => i.slug === 'verified_seller_item');
  if (!verifiedSellerItem) {
    console.log(`=!=!=!=!= ERROR: could not find item for verified seller when calling /api/items`);
    return false;
  }

  if (verifiedSellerItem?.seller?.isVerified !== true) {
    console.log(`=!=!=!=!= ERROR: "isVerified" is not set to "true" a verified seller when calling /api/items`);
    return false;
  }

  console.log('==========All tests passed==========');
  return true;
};

testItems()
  .then((res) => process.exit(res ? 0 : 1))
  .catch((e) => {
    console.log("error while checking api: " + e);
    process.exit(1);
  });
