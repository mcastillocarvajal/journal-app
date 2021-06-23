import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

 
import { startNewNote } from "../../actions/notes";
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'testing'
    }
})


describe('test for notes actions', () => {
    
    test('should create a new note startNewNote', async() => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesNewEntry,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const { id } = actions[0].payload;

        await db.doc(`testing/journal/notes/${id}`).delete();
    })
})
