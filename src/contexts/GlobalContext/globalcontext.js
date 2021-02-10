import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  journalList: [ ]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteJournal(id) {
    dispatch({
      type: 'DELETE_JOURNAL',
      payload: id
    });
  }

  function addJournal(journal) {
    dispatch({
      type: 'ADD_JOURNAL',
      payload: journal
    });
  }

  return (<GlobalContext.Provider value={{
    journalList: state.journalList,
    deleteJournal,
    addJournal
  }}>
    {children}
  </GlobalContext.Provider>);
}