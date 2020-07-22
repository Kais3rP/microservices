const fs = require('fs');
const readLine = require('readline');
var axios = require('axios');

function  getUsernames(threshold) {



var data = "hello";

axios.get('https://jsonmock.hackerrank.com/api/article_users?page=2')
 .then( res => console.log(res) )
     
console.log(data)




}

function main() {
 

    const threshold = 10;

    const result = getUsernames(threshold);
    console.log(result)

    
}

main();

console.log("hello")