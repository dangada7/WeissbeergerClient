
// ClassMovie
export class ClassMovieSearch {

    title
    year
    imdbID
    type
    poster

    constructor({title, year, imdbID, type ,poster}) {
        this.title = title
        this.year = year
        this.imdbID = imdbID
        this.type = type
        this.poster = poster

    }

}

export class ClassMovieInfo{

    image
    title
    release
    date
    genres
    director
    actors
    plot
    IMDBrating
    website


    constructor({ image, title, release, date, genres, director, actors, plot, IMDBrating,  website}) {
        this.image = image
        this.title = title
        this.release = release
        this.date = date
        this.genres = genres
        this.director = director
        this.actors = actors
        this.plot = plot
        this.IMDBrating = IMDBrating
        this.website = website && website !== "N/A" ? website : null

    }

}










