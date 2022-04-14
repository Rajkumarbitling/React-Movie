export const getListsStart = () => ({
    type: 'GET_LISTS_START'
})
export const getListsSuccess = (lists) => ({
    type: 'GET_LISTS_SUCCESS',
    payload: lists,
})
export const getListsFailure = () => ({
    type: 'GET_LISTS_FAILURE'
})

// Create new movies
export const createListStart = () => ({
    type: 'CREATE_LIST_START'
})
export const createListSuccess = (list) => ({
    type: 'CREATE_LIST_SUCCESS',
    payload: list,
})
export const createListFailure = () => ({
    type: 'CREATE_LIST_FAILURE'
})

// // Edit movies
// export const editMovieStart = () => ({
//     type: 'EDIT_MOVIE_START'
// })
// export const editMovieSuccess = (movie) => ({
//     type: 'EDIT_MOVIE_SUCCESS',
//     payload: movie,
// })
// export const editMovieFailure = () => ({
//     type: 'EDIT_MOVIE_FAILURE'
// })

// Delete Movie Actions
export const deleteListStart = () => ({
    type: 'DELETE_LIST_START'
})
export const deleteListSuccess = (id) => ({
    type: 'DELETE_LIST_SUCCESS',
    payload: id,
})
export const deleteListFailure = () => ({
    type: 'DELETE_LIST_FAILURE'
})