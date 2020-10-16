const db = require('@db/connection/json-db.js');
const movieService = require('@services/movie-service')(db);

const template = require('./template.marko');
const EventEmitter = require('events').EventEmitter;



module.exports = function(input, out) {
    
    var asyncOut = out.beginAsync({
        timeout: 0 /* disable the timeout */
    });

    var searchResultsStream = getSearchResultsStream(input.q, input.order, input.start, input.offset);

    searchResultsStream
        .on('data', function(items) {
            // Render out the current page of results to our
            // async fragment.
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
        let currentIndex = 0;

        function getPage(){
            ee.emit('data', {
                total: result.total,
                items: result.movies.filter((m, i) => i >= currentIndex && i < currentIndex + 4)
            });
            
            if(result.movies.length <= currentIndex){
                ee.emit('end');
                return;
            }else{
                currentIndex += 4;
                getPage();
            }
        }

        process.nextTick(getPage);
    }).catch(reason => {throw reason});

    return ee;
}


