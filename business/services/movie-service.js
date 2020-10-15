module.exports = (db) => {
  return { 
    async getMovies(search, start = 0, offset = 20, order){
      let movies = await db.read('movies');
      if(search){
        let regex = new RegExp(search, "i");
        movies = movies.filter(movie => movie.movie_title.match(regex));
      }
      if(order) {
        movies = movies.sort((a, b) => {
          if(a[order] < b[order]) { return -1; }
          if(a[order] > b[order]) { return 1; }
          return 0;
        })
      }
      let total = movies.length;
      movies = movies.slice(start, start + offset);
      return {
        total: total,
        movies: movies
      }
    }
  }
}