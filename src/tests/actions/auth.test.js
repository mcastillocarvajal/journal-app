import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );


describe('test for auth actions', () => {

    beforeEach( () => {
        store = mockStore( initState );
    })

    test('login and logout should create their actions ', () => {

        const uid = 'ABC123';
        const displayName = 'Moises';

        const loginAction = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        })
        expect( logoutAction ).toEqual({
            type: types.logout
        })
    })
    
    test('startLogout should process the action', async() => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })
    })
    
    test('should init startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('testing@testing.com', '123456') );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: '1wE2WHRB9eQKaIZ2EJYKji8hKlG2',
                displayName: null
            }
        })
    })
    
})
