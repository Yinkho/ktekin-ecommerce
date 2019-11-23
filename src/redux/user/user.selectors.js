import { createSelector } from 'reselect'

const selectUser = state => state.user

const selecCart = state => state.cart

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)