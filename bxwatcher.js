const notifier = require('node-notifier');
const https = require('https');
const sleep = require('sleep');
var rp = require('request-promise');

// node .js paringid below above
var argv = process.argv;
var pairId = argv[2] || 26;
var below = argv[3] || 240;
var above = argv[4] || 300;

var lowest =1e10;
var highest = 0;



// console.log("watch id",pairId,"on below",below,"above",above);

var url='https://bx.in.th/api/';

cb = function(res){
  // console.log("db");
  var str = ''
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
    var obj = JSON.parse(str);
    var watched = obj[pairId]; 
    var last_price = watched["last_price"];
    var prim = watched["primary_currency"];
    var sec = watched["secondary_currency"];

    var text = prim+" to "+sec+" : "+last_price;
    // console.log(text);
  
    var date = new Date();

    if(last_price>highest){
      highest = last_price;
      // lowest = highest;
      var text1 = date + "^^^^ Highest :"+text;
      notifier.notify({
        title: 'Highest',
        message: text1,
        sound: true,
        wait: false,
      },(err,res)=>{
        // console.log(err,res);
      })
      console.log(text1);
    }else if(last_price<lowest){
      lowest = last_price;
      // highest = last_price;
      var text1 = date + ">>>> Lowest :"+text;
      notifier.notify({
        title: 'Lowest',
        message: text1,
        sound: true,
        wait: false,
      },(err,res)=>{
        // console.log(err,res);
      })
      console.log(text1);
    }

    // noti
//    if (last_price >= above){
//      notifier.notify({
//        title: 'High price',
//        message: text,
//        sound: true,
//        wait: true,
//     },(err,res)=>{
//        // console.log(err,res);
//      })
//    }

//    if (last_price <= below){

//      notifier.notify({
//        title: 'Low price',
//        message: text,
//        sound: true,
//        wait: true,
//      },(err,res)=>{
//        // console.log(err,res);
//      })
//    }

    sleep.sleep(60);
    https.get(url,cb);
  });
}

https.get(url,cb)

// rp.get(url)
    // .then((resp)=>{
      // console.log("resp",resp)
    // })
    // .catch((err)=>{
      // console.log("err",err);
    // });

// runAPI = function(){
  // console.log("do");
  // rp.get(url)
    // .then((resp)=>{
      // console.log("resp",resp)
    // })
    // .catch((err)=>{
      // console.log("err",err);
    // });
// }
// 
// while (true){
  // console.log("watch id",pairId,"on below",below,"above",above);
  // sleep.sleep(5);
  // runAPI();
// }

