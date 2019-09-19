import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialMovie = {
    id: 5,
    title: 'Tombstone',
    director: 'GPC',
    metascore: 89,
    starts: ['KR', 'BP', 'SE'],
}
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const {match, movies} = props;
    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = movies.find(movie => `${movie.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [match, movies]);
    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'price') {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            props.updateMovie(res.data);
            props.history.push(`/movie-list/${movie.id}`);
            setMovie(initialMovie);
        })
        .catch(err => console.log(err.response));
    };
    return (
        <div>
            <h2>Update</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="Title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />
                <input
                type="text"
                name="Director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
                />
                <input
                type="text"
                name="Metascore"
                onChange={changeHandler}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <input
                type="text"
                name="Movie Stars"
                onChange={changeHandler}
                placeholder="Movie Stars"
                value={movie.moviestars}
                />
                <button>Update!</button>
            </form>
        </div>
    )
}

export default UpdateMovie;