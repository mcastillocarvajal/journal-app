import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'


export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);

    const [ formValues, handleInputChange, reset ] = useForm( note );

    const { body, title } = formValues;

    const activeId = useRef( note.id )

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [ note, reset ]);

    useEffect(() => {

        dispatch( activeNote( formValues.id, { ...formValues} ) );

    }, [ formValues, dispatch ])


    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input  
                    type="text"
                    className="notes__title-input"
                    placeholder="Some awesome words"
                    autoComplete="off"
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea 
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name='body'
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
            </div>

            {
                (note.url) &&
                <div className="notes-image">

                    <img
                        src="https://www.businessinsider.in/photo/81769906/How-to-reverse-image-search-on-Google-to-find-information-related-to-a-specific-photo.jpg?imgsize=297676"
                        alt="img"
                    />
                </div>
            }

        </div>
    )
}
