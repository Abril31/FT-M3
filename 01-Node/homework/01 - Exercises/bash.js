const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');


const print = (output) =>{
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
}

function bash() {
   process.stdout.write("prompt > ")
   process.stdin.on("data", (data)=>{
      let args = data.toString();
      args = args.trim();
      let argsSep = args.split(" ");
      let cmd = argsSep.shift();
         
      if(cmd in commands ){
         commands[cmd](print, args.join(" "));
      }else{
         print(`command not found: ${cmd}`)
      }
   })
   

}

bash();
module.exports = {
   print,
   bash,
};
