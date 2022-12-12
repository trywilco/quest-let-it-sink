require("dotenv").config();
const axios = require("axios");

const client = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3000}`,
  timeout: 10 * 1000,
});


const USERNAME = "usertest"

const createUser = async () => {
  const body = {
    user: {
      username: USERNAME,
      email: `${USERNAME}@wilco.work`,
      password: "wilco1234",
    },
  };

  try {
    const loginRes = await client.post(`/api/users/login`, body);
    if (loginRes.data?.user?.token) {
      return loginRes.data.user.token;
    }
  } catch (e) {
    //User doesn't exists yet
  }

  const userRes = await client.post(`/api/users`, body);
  return userRes.data?.user?.token;
};

const createItem = async () => {
  const body = {
    item: {
      title: "title",
      description: "description",
      tag_list: ["tag1"],
    },
  };
  const itemRes = await client.post(`/api/items`, body);
  return itemRes.data?.item;
};

const getItems = async () => {
  const results = await client.get('/api/items?limit=1000&offset=0');
  return results.data?.items;
};

const testUser = async () => {
  const token = await createUser();
  client.defaults.headers.common["Authorization"] = `Token ${token}`;
  await createItem();
  const items = await getItems();
  if (items[0]?.seller?.isVerified === undefined) {
    console.log(`=!=!=!=!= ERROR: the item's seller doesn't have the "isVerified" field`);
    return false;
  }

  if (items[0]?.seller?.isVerified !== false) {
    console.log(`=!=!=!=!= ERROR: "isVerified" is not set to false by default`);
    return false;
  }

  console.log('==========All tests passed==========');
  return true;
};

testUser()
  .then((res) => process.exit(res ? 0 : 1))
  .catch((e) => {
    console.log("error while checking api: " + e);
    process.exit(1);
  });
