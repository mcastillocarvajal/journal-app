import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">

                <p className="journal__entry-title">
                    First day
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>25</h4>
            </div>

        </div>
    )
}
