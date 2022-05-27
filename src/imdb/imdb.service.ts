import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

@Injectable()
export class ImdbService {
    private movies: any[] = [];
    constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) { }

    async create(createMovieDto: any): Promise<Movie> {
        const createdMovie = new this.movieModel(createMovieDto);
        return createdMovie.save();
    }

    async findAll(): Promise<Movie[]> {
        return this.movieModel.find().exec();
    }

    async searchMovies(searchTerm: string) {
        this.movies = [];
        
        return fetch(`https://www.imdb.com/search/title/?title=${searchTerm}&title_type=feature`)
            .then(response => response.text())
            .then(body => {
                console.time('imdb-search')
                const $ = cheerio.load(body);
                const tempMovies = [];
                $('.lister-item').each((i, element) => {
                    const $element = $(element);
                    const $image = $element.find('.lister-item-image > a > img');
                    const $title = $element.find('.lister-item-header a');
                    const $year = $element.find('.lister-item-header .lister-item-year');

                    const imdbId = $title.attr('href').match(/title\/(.*)\//)[1];

                    const movie = {
                        image: $image.attr('loadlate'),
                        title: $title.text(),
                        imdbId
                    };
                    this.movies.push(movie);
                });
                console.timeEnd('imdb-search')
                return this.movies;
            }).catch(err => {
                // Logger.logError(`Error occured when searching for (${searchTerm}) in imdb. Error handled successfully`);
                console.log(`(${searchTerm}) in imdb. Error handled successfully`);
                return this.movies;
            }).catch(err => {
                console.log('??');
            });
    }
}
