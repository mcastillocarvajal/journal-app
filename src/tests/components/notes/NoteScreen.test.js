import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: '1234',
            date: 2321445,
            title: 'title',
            url: 'http://nkanklf.com',
            body: 'body'
        },
        notes: []
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
            <NoteScreen />
    </Provider>
);

describe('test for <NoteScreen />', () => {
    
    test('should match snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('should trigger the activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello test'
            }
        })

        expect( activeNote ).toHaveBeenLastCalledWith(
            '1234',
            {
                date: 2321445,
                id: '1234',
                title: 'Hello test',
                url: 'http://nkanklf.com',
                body: 'body'
            }
        );
    })
    
})
