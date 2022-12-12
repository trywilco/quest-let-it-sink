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
      isVerified: true
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

const getProfile = async ( username) => {
  const results = await client.get(`/api/profiles/${username}`);
  return results.data?.profile;
};

const testUser = async () => {
  await createUser();
  const profile = await getProfile(USERNAME);

  if (profile?.isVerified !== false) {
    console.log(`=!=!=!=!= ERROR: user doesn't have the "isVerified" field`);
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
