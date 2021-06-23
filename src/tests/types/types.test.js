import { types } from "../../types/types"


describe('test for types', () => {
    
    test('should be equal to types object', () => {

        expect( types ).toEqual(
            {

                login: '[Auth] Login',
                logout: '[Auth] Logout',
            
                uiSetError: '[UI] Set Error',
                uiRemoveError: '[UI] Remove Error',
            
                uiStartLoading: '[UI] Start Loading',
                uiFinishLoading: '[UI] Finish Loading',
            
                notesNewEntry: '[Notes] New Note',
                notesActive: '[Notes] Set Active Note',
                notesLoad: '[Notes] Load Note',
                notesUpdated: '[Notes] Updated Note',
                notesFileUrl: '[Notes] Updated ImageUrl',
                notesDelete: '[Notes] Delete Note',
                notesLogoutCleaning: '[Notes] Logout Cleaning'
            }
        )
    })
    
})
