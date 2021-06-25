import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );
store.dispatch = jest.fn();

const note = {
    id: '1234',
    title: 'title',
    body: 'body',
    url: 'url',
    date: 0
}

const wrapper = mount( 
    <Provider store={ store }>
            <JournalEntry { ...note } />
    </Provider>
);

describe('test for <JournalEntry />', () => {
    
    test('should match snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('should trigger activeNote', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    })
    
})
