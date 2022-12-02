import { types } from "../../../auth";

describe('Pruebas en el "Types"', () => {
    test('debe de regresar estos types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
    });
})