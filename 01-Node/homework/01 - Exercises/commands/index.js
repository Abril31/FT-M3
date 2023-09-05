const fs = require("fs");
const request = require("../utils/request");
const process = require("process");

function pwd(print) {
  print(process.cwd());
}

function date(print) {
    currentDate = new Date().toString();
  print(date());
}

function echo(print, args) {
  print(args);
}

function ls(print) {
  
    fs.readdir(".", (error, files) => {
    if(error){
        throw error;
    }else{     
   
    print(files.join("\n"));
}
    });
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error){
            throw error;
        }else{
            print(data)
        }
    })
    
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error){
            throw error;
        }else{
            let lines = data.split('\n')
            print(lines[0]); 
        }
    })
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error){
            throw error;
        }else{
            let lines = data.split('\n');
      const lastLines = lines.slice(-5); //
      print(lastLines.join('\n'));
        }
    })
}

function curl(print, args) {
    request(args, (error, response)=>{
        if(error){
            throw error;
        }else{
            print(response);
        }
    } )
}

module.exports = {
  pwd,
  date,
  echo,
  ls,
  cat,
  head,
  tail,
  curl
};
