const crypto = require('crypto');
const fs = require('fs');
const {parse} = require('csv-parse/sync');


/**
 *
 * @param {number[]}range
 * @returns {number}
 */
function secure_random(range) {
    const nBytes   = 4;
    const randomBytes = crypto.randomBytes(nBytes);
    const r = randomBytes.readUIntBE(0, nBytes);
    return (r % (range[1]))+range[0];
}

const main = ()=>{
    const data = fs.readFileSync('member_list.csv');
    const records = parse(data, { columns: true, delimiter: ','});

    const ramdom_num = secure_random([0, records.length]);

    console.log(`${records[ramdom_num].student_id} ${records[ramdom_num].name}さん`);
}

main()