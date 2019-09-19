import React from 'react';

class UpdateMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            movieCard: {
                Director: '',
                Metascore: '',
                MovieStars: []

            }
        };
    }
    handleChange = e => {
        this.setState({
            movieCard: {
                ...this.state.movieCard,
                [e.target.name]: e.target.value
            }
        });
    };
    putMessage = e => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/movies', e)
        .then(res => {
            this.setState({
                SuccessMessage: res.data,
                Error: ''
            });
        })
        .catch(err => {
            this.setState({
                SuccessMessage: '',
                Error: err.response.data
            });
        });
    };
    render(){
        return(
            <div>
                <h1>Update Movie</h1>
                <form onSubmit={this.putMessage}>
                    <input
                    type="text"
                    name="Director"
                    placeholder="Director"
                    onChange={this.handleChange}
                    value={this.state.movieCard.Director}
                    />
                    <input
                    type="text"
                    name="Metascore"
                    placeholder="Metascore"
                    onChange={this.handleChange}
                    value={this.state.movieCard.Metascore}
                    />
                    <input
                    type="text"
                    name="Movie Stars"
                    placeholder="Movie Stars"
                    onChange={this.handleChange}
                    value={this.state.movieCard.MovieStars}
                    />
                    <button type="submit">Update!</button>
                </form>
            </div>
        );
    }
}

export default UpdateMovie;