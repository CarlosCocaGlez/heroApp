import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../router/AppRouter';
import { AuthContext } from '../../auth';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en el AppRouter', () => {
    test('debe de mostrar el login si no esta auntenticado', () => {
        const contextValue = {
            logged: false,
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/marvel'] }>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Login') ).toBeTruthy();
        expect( screen.getAllByText('Login').length ).toBe(2);
    });

    test('debe de mostrar el componente de Marvel si esta auntenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Charles',
            },
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/marvel'] }>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getAllByText('Marvel') ).toBeTruthy();
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
    });
});