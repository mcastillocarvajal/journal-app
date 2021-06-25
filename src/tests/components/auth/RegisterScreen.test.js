import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}
let store = mockStore( initState);

const wrapper = mount( 
    <Provider store={store} >
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('test for <RegisterScreen />', () => {

    test('should show match snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('should dispatch the action', () => {
        
        const email = wrapper.find('input[name="email"]');
        
        email.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Name is required'
        })
    })
    
    test('should show alert with msg error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid'
            }
        }
        const store = mockStore( initState);

        const wrapper = mount( 
            <Provider store={store} >
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );

        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );
    })
    
})
