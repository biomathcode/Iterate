const AppReducer=(state, action) => {
    switch (action.type) {
        case 'DELETE_JOURNAL':
            return {
                ...state,
                journalList: state.journalList.filter(journal => journal.id !== action.payload)
            }
        case 'ADD_JOURNAL':
            return {
                ...state,
                journalList: [action.payload, ...state.journalList]
            }
        default:
            return state;
    }
}
export default AppReducer;