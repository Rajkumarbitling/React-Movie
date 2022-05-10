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

// Edit movies
export const editListStart = () => ({
    type: 'EDIT_LIST_START'
})
export const editListSuccess = (list) => ({
    type: 'EDIT_LIST_SUCCESS',
    payload: list,
})
export const editListFailure = () => ({
    type: 'EDIT_LIST_FAILURE'
})

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