require('dotenv').config();

const {XataClient} = require("./xata.js");
const db = new XataClient({ apiKey: process.env.XATA_API_KEY, branch:  process.env.XATA_BRANCH});

/*async function main() {
    const record = await xata.db.tableName.read("rec_xyz");
    console.log(record);
}

main().then(process.exit);*/

module.exports = {db}