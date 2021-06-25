import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Moises'
    },
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

const wrapper = mount( 
    <Provider store={ store }>
            <Sidebar />
    </Provider>
);

describe('test for <Sidebar />', () => {
    
    test('should match snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();
    })

    test('should trigger startLogout action', () => {

        wrapper.find('button').prop('onClick')();
    
        expect( startLogout ).toHaveBeenCalled();
    })
    
    test('should trigger startNewNote action', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    })
})
