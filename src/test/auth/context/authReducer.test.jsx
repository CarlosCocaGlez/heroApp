import { authReducer } from '../../../auth';
import { types } from '../../../auth';

describe('Pruebas en el authReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });
    });

    test('debe de llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Charles',
            }
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({
            logged: true,
            user: action.payload,
        })
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: { id: '123', name: 'Charles' },
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer( state, action );
        expect(newState).toEqual({ logged: false });
    });
})