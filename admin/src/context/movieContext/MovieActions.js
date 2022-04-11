export const getMoviesStart = () => ({
    type: 'GET_MOVIES_START'
})
export const getMoviesSuccess = (movies) => ({
    type: 'GET_MOVIES_SUCCESS',
    payload: movies,
})
export const getMoviesFailure = () => ({
    type: 'GET_MOVIES_FAILURE'
})

// Create new movies
export const createMovieStart = () => ({
    type: 'CREATE_MOVIE_START'
})
export const createMovieSuccess = (movie) => ({
    type: 'CREATE_MOVIE_SUCCESS',
    payload: movie,
})
export const createMovieFailure = () => ({
    type: 'CREATE_MOVIE_FAILURE'
})

// Edit movies
export const editMovieStart = () => ({
    type: 'EDIT_MOVIE_START'
})
export const editMovieSuccess = (movie) => ({
    type: 'EDIT_MOVIE_SUCCESS',
    payload: movie,
})
export const editMovieFailure = () => ({
    type: 'EDIT_MOVIE_FAILURE'
})

// Delete Movie Actions
export const deleteMovieStart = () => ({
    type: 'DELETE_MOVIE_START'
})
export const deleteMovieSuccess = (id) => ({
    type: 'DELETE_MOVIE_SUCCESS',
    payload: id,
})
export const deleteMovieFailure = () => ({
    type: 'DELETE_MOVIE_FAILURE'
})