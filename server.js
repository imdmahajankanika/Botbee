'use strict';
const conf = require('./config')
const tmbd = require('./tmbd')
const express = require ('express') ;
const server = express() ;
const bodyparser = require('body-parser');
const matcher = require ('./vanilla/matcher') ; // to use the matcher module here
const weather = require ('./vanilla/weather'); // to use the weather module here
const forecast = require ("./vanilla/forecast"); // to use the forecast module
const PORT = process.env.PORT || 3000;
//server.get('/', (req, res ) => res.send ("hello!!")) ;
server.listen (PORT, () => console .log ('The bot server is running on port', PORT)) ;
const fBeamer = require('./fbeamer');
const { createPrivateKey } = require('crypto');
const { response } = require('express');
const f = new fBeamer(conf.FB)
server.get ('/', (req , res )  => f.registerHook (req , res )) ;
server.post ('/', bodyparser.json ({
    verify : f.verifySignature.call(f)
    })) ;

server.post ('/', (req , res , next ) =>{
    // message will be received here if the signature is verified
    // the message will be passed to FBeamer for parsing
    return f.incoming(req, res,async data=>{
        const {message,sender} = data;
        data=f.messageHandler(data);
        //console.log(data)
        try {
            if (data.content === 'the given text in facebook !'){
                await f.txt(data.sender , 'hey there I finally recieved your message in my chatbot :)') ;
            }
            else if(data.type==='image') {
                await f.img(data.sender , 'https://scontent.xx.fbcdn.net/v/t39.1997-6/s168x128/141389264_898324984040408_6756971258327637623_n.png?_nc_cat=105&ccb=2&_nc_sid=0572db&_nc_ohc=qZaZIyiAP8gAX-ltJHK&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_tp=30&oh=3fb421890e35317db764c1cb60b125cf&oe=603EBB69') ;
            }
            else if(message.nlp.intents.length&&(message.nlp.intents[0].name=="movieinfo"||message.nlp.intents[0].name=="releaseYear")){
                tmbd(message.nlp).then(async result=> {
                    var resp=`Movie Release Date: ${result[0]}\nMovie Original title: ${result[1]}\nMovie ID: ${result[2]}\nOverview: ${result[3]}`
                    await f.txt(data.sender , resp) ;
                    await f.img(data.sender , result[4]) ;
                    
                })
                .catch(async error => {
                    //console.log(error)
                await f.txt(data.sender , "No data found, search again!") ;
                });
            }
            else if(message.nlp.intents.length&&(message.nlp.intents[0].name=="movieinfo"||message.nlp.intents[0].name=="director")){
                tmbd(message.nlp).then(async result=> {
                    await f.txt(data.sender , result) ;
                    
                })
                .catch(async error => {
                    //console.log(error)
                await f.txt(data.sender , "No data found, search again!") ;
                });
            }
            else{
            matcher (data.content , async cb => {
                switch(cb.intent){
                    case 'Hello':
                        //console.log('BOT: Hello and welcome to chatbot!');
                        //console.log('Entities:',cb.entities.greeting)
                        await f.txt(data.sender , 'Welcome to chatbot! :)') ;
                        break;
                    case 'Exit':
                        //console.log('BOT: Bye Bye!')
                        await f.txt(data.sender , 'Bye Bye!') ;
                        process.exit(0)
                    
                    default:
                        console.log('No intent identified');
                        await f.txt(data.sender , "Sorry! I couldn't understand... :(") ;
                }
            }) ;
            }
            
        }
        catch(e){
            console.log(e) ;
        }
    });
}) ;




