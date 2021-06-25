import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebaseConfig';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();


describe('test for appRouter', () => {
    
    test('should trigger login function if auth = true', async() => {

        let user;

        await act( async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('testing@testing.com','123456');
            user = userCred.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        })

        expect( login ).toHaveBeenCalledWith( expect.any(String), null );

    })
    
})
