import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input  
                    type="text"
                    className="notes__title-input"
                    placeholder="Some awesome words"
                    autoComplete="off"
                />

                <textarea 
                    placeholder="What happened today?"
                    className="notes__textarea"
                ></textarea>
            </div>

            <div className="notes-image">

                <img
                    src="https://www.businessinsider.in/photo/81769906/How-to-reverse-image-search-on-Google-to-find-information-related-to-a-specific-photo.jpg?imgsize=297676"
                    alt="img"
                />
            </div>

        </div>
    )
}
