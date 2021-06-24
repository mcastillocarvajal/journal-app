/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

 
import { startNewNote, startLoadingNotes, startSaveNote } from "../../actions/notes";
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing'
    }
}
let store = mockStore( initState )


describe('test for notes actions', () => {

    beforeEach( () => {

        store = mockStore( initState );
    })
    
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

    test('startUploading should load the notes', async() => {
        
        await store.dispatch( startLoadingNotes('testing') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    })

    test('startSaveNote should update the note', async() => {

        const note = {
            id: '9bOATfdvCJC0YFTTwMA7',
            title: 'title',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`testing/journal/notes/${note.id}`).get();

        expect( docRef.data().title ).toBe( note.title );
    })
})
