import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


describe('test for authReducer', () => {

    test('should process the login ', () => {
        
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Moises'
            }
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Moises'
        });
    })

    test('should process the logout', () => {
        
        const initialState = {
            uid: '1515bgf515ghfns',
            name: 'Moises'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({});
    })

    test('should return the state with any changes', () => {
        
        const initialState = {
            uid: '1515bgf515ghfns',
            name: 'Moises'
        };

        const action = {
            type: 'this type does not exist'
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual( initialState );
    })
})
