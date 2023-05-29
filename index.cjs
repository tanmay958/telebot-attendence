const { Telegraf } = require('telegraf');

var lastcommand ;
var curr={};

const bot = new Telegraf('6142548166:AAEFlV-aTsvml09721XIcxlGTgeq4hHx62o');
bot.start((ctx) => {lastcommand =  "start";ctx.reply('Welcome to Tanmay\'s created attendence system -- \n if you are new user create the list by giving the subject like dbms,oops\nif you are old user copy paste the last generated log')});
bot.hears(/\/update/, (ctx) => {

    lastcommand = "mark";
    ctx.reply("to update the value \n to increment subject.current=1\n to decrement subject.your=-1");
    ctx.reply("start updating");
  });
  bot.hears(/\/mark/, (ctx) => {

    lastcommand = "mark";
  });
  bot.hears(/\/display/, (ctx) => {
    // const beautifiedJson = JSON.stringify(curr, null, 2); 
    lastcommand = "display";// Adds 2 spaces for indentation
// ctx.reply(beautifiedJson);
  
    ctx.reply(JSON.stringify(curr));
  });

bot.use((ctx) => {
    const message = ctx.message.text;
    // ctx.reply(message.text);
    
   if(lastcommand==="start")
   {
     if(isConvertibleToObject(message))
     {
        curr =  JSON.parse(message);
     }
     else{
        if(commachecker(message))
        {
            curr =  fun(message);
            
        }
        
     
        else
        ctx.reply("INVALID TRY AGAIN");

     }
     if(curr!=undefined)
     ctx.reply(JSON.stringify(curr));


   }
   if(lastcommand==="mark")
   {

    if(regextester(message))
    {
        ctx.reply("updated successfully");
    }
    else{
        ctx.reply("try again");
    }
   }
    
  });

// bot.mark((ctx)=>{
//     lastcommand  = "mark";
//     ctx.reply("successfully update the last command");
// })
// bot.use((ctx)=>{
//     const message = ctx.message;
//     if(isObject(str))
//     {

//     }
//     else{

//     }
// })
function commachecker(str)
{
    const values = str.split(',');
    if (values.some((value) => value.trim() === '')) {
        return false;
      }
      return true;

}
 function fun(str) {
    const values = str.split(',');
    
  

 
    const obj = {};
    for (let i = 0; i < values.length; i++) {
      const key = values[i].trim();
      obj[key] = {'current':0,'your':0};
    }
    // const objString = JSON.stringify(obj);
  
    return obj;
  }
  function isConvertibleToObject(str) {
  try {
    const obj = JSON.parse(str);
    return typeof obj === 'object' && obj !== null;
  } catch (error) {
    return false;
  }

}



function regextester(str)
{
    const regex1 = /[A-Za-z]+\.current=[0-9]+/;
    const regex2 =  /[A-Za-z]+\.your=[0-9]+/;
    const values =  str.split('.');
    const digit = /=(.*)/;


if (regex1.test(str)) {
    const match = str.match(digit);
    const value = match[1];
    curr[values[0]]["current"]+=parseInt(value);
 return true;
} 
else if(regex2.test(str))
{ const match = str.match(digit);
    const value = match[1];
    curr[values[0]]["your"]+=parseInt(value);
 return true;
}
else {

  return false;
}
}



bot.launch();