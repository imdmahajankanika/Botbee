const axios = require ("axios") ;
const config = require('../config')
const apikey= "7fa0c35103d70d16a05ec9db5b02bffa";
const extractEntity = (nlp , entity ) =>{
    // should be filled by you .

    if(nlp.intents[0].confidence > 0.8){
        if(entity == 'intent'){
            return nlp.intents[0].name
        }
        else{
            try{
                return nlp.entities[entity+':'+entity][0].body
            }
            catch(error){//If entity does not exist
                return null;
            }

        }
    }else{
        return null
    } 
}

const getMovieData = (movie , releaseYear = null ) => {
    // filled by you
    return new Promise (async( resolve , reject ) => {
        var movied ,movieRes;
        try {
            if(releaseYear == null){
                 movied = await axios.get( 'https://api.themoviedb.org/3/search/movie/',{
        
                    params : {
                    api_key: apikey ,
                    query:movie
                    }
                });
                for(var i=0;i<movied.data.results.length;i++){
                    if(movied.data.results[i].overview&&movied.data.results[i].poster_path){
                        movieRes=movied.data.results[i]
                        break;

                    }
                }
            }
            else{
                 movied = await axios.get( 'https://api.themoviedb.org/3/search/movie/',{
        
                    params : {
                    api_key: apikey ,
                    query:movie,
                    year:releaseYear
                    }
                });
                for(var i=0;i<movied.data.results.length;i++){
                    if(movied.data.results[i].release_date.includes(releaseYear)&&movied.data.results[i].overview&&movied.data.results[i].poster_path){
                        movieRes=movied.data.results[i]
                        break;

                    }
                }
            }
                
            resolve(movieRes) 
                
        }
        catch(error){
            console.log(error)
            reject(error);
        }
    }) ;
    }
    
    const getDirector = (movieId) => {
        return new Promise(async (resolve, reject) => {
            var dir
            try{
                dir = await axios.get( `https://api.themoviedb.org/3/movie/${movieId}/credits`,{
                params : {
                api_key: apikey
                }
            });
            resolve(dir.data)
            }
            catch(error){
                reject(error)
            }
            
        });
    }

    module.exports = nlpData => {
        return new Promise(async (resolve, reject) => {
            let intent = extractEntity(nlpData, 'intent')
            if(intent){
                let movie = extractEntity(nlpData, 'movie')
                let releaseYear = extractEntity(nlpData, 'releaseYear')
                try{
                    let movieData = await getMovieData(movie, releaseYear)
                    var response,img_path;
                    if(nlpData.intents[0].name === 'director'){
                        let movie_res = await getDirector(movieData.id)
                        for(var i = 0; i < movie_res.crew.length; i++){
                            if(movie_res.crew[i].job == 'Director'){
                                response = `Director of the movie "${movie}" is "${movie_res.crew[i].name}"`
                            }
                            
                        }
                        resolve (response) ;
                    }
                    else{
                        img_path=`https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                        response= {}
                        response["MovieReleaseYear"]=movieData.release_date
                        response["MovieOriginalTitle"]=movieData.original_title
                        response["MovieID"]=movieData.id
                        response["Overview"]=movieData.overview
                        response["Poster_path"]=img_path
                        //response=`Movie Release year: ${movieData.release_date}\nMovie Original title: ${movieData.original_title}\nMovie ID: ${movieData.id}\nOverview: ${movieData.overview}\n${img_path}`
                        resolve (Object.values(response)) ;
                    }
                        
                    }
    
                catch (error){
                    reject(error)
                }
            }
            else{
                resolve({
                    txt: "I'm not sure I understand you"
                })
            }
        })
    }