const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tmdbmovieSchema = new Schema({
    adult: {
        type: 'boolean',
    },

    backdrop_path: {
        type: 'string',
    },
    belongs_to_collection: {
        type: mongoose.Schema.Types.Mixed
    },
    cast: {
        type: mongoose.Schema.Types.Mixed
    },
    crew: {
        type: mongoose.Schema.Types.Mixed
    },
    genres: {
        type: mongoose.Schema.Types.Mixed
    },
    homepage: {
        type: 'string',
    },
    id: {
        type: 'string',
        unique: true,
    },
    imdb_id: {
        type: 'string',
        unique: true,
    },
    original_language: {
        type: 'string',
    },
    original_title: {
        type: 'string',
    },
    overview: {
        type: mongoose.Schema.Types.Mixed
    },
    popularity: {
        type: mongoose.Schema.Types.Mixed
    },

    poster_path: {
        type: mongoose.Schema.Types.Mixed
    },
    production_companies: {
        type: mongoose.Schema.Types.Mixed
    },
    production_countries: {
        type: mongoose.Schema.Types.Mixed
    },
    release_date: {
        type: mongoose.Schema.Types.Mixed
    },
    revenue: {
        type: mongoose.Schema.Types.Mixed
    },
    runtime: {
        type: mongoose.Schema.Types.Mixed
    },
    spoken_languages: {
        type: mongoose.Schema.Types.Mixed
    },
    tagline: {
        type: mongoose.Schema.Types.Mixed

    },
    title: {
        type: mongoose.Schema.Types.Mixed
    },
    video: {
        type: mongoose.Schema.Types.Mixed
    },
    vote_average: { type: mongoose.Schema.Types.Mixed },
    vote_count: {
        type: mongoose.Schema.Types.Mixed
    }






}, { timestamps: true }, { versionKey: false });

const TmdbMovie = mongoose.model('TmdbMovie', tmdbmovieSchema);

module.exports = TmdbMovie;