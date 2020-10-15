const db = require('@db/connection/json-db.js');
const movieService = require('@services/movie-service')(db);

const template = require('./template.marko');
const EventEmitter = require('events').EventEmitter;



module.exports = function(input, out) {
    console.log("search-stream inputs:")
    console.log(input);
    
    var asyncOut = out.beginAsync({
        timeout: 0 /* disable the timeout */
    });

    var searchResultsStream = getSearchResultsStream(input.q, input.order, input.start, input.offset);

    searchResultsStream
        .on('data', function(items) {
            // Render out the current page of results to our
            // async fragment.
            console.log("search-stream before flush:")
            template.render({
                total: items.total,
                start: input.start||0,
                offset: input.offset||20,
                items: items.items
            }, asyncOut);
            // Force the output HTML to be flushed (it is buffered by default)
            asyncOut.flush();
        })
        .on('end', function() {
            // If there are no more search results then end the async ragment
            asyncOut.end();
        });
};

function getSearchResultsStream(q, order, start, offset) {
    var ee = new EventEmitter();

    movieService.getMovies(q, start, offset, order).then(result => {
        // if(result.movies.length <= 0){
        //     ee.emit('data', {
        //         total: result.total,
        //         items: []
        //     });
        // }
        ee.emit('data', {
            total: result.total,
            items: result.movies
        });
        // for(let i = 0; i < result.movies; i++){
        //     ee.emit('data', {
        //         total: result.total,
        //         items: [result.movies[i]]
        //     });
        // }
        setTimeout(()=> {
            ee.emit('end');
        }, 1000);
        
    }).catch(reason => {throw reason});

    return ee;
}
