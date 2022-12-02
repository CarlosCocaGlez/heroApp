import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../heroes';

describe('Pruebas en el SearchPage', () => {
    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del query string', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alertDanger = screen.getByLabelText('alert-danger');
        expect( alertDanger.style.display ).toBe('none')
    });

    test('debe de mostrar un error si no se encuentra el heroe (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const alertDanger = screen.getByLabelText('alert-danger');
        expect( alertDanger.style.display ).not.toBe('none')
    });

    // test('debe de llamar el navigate a la pantalla nueva', () => {
    //     render(
    //         <MemoryRouter initialEntries={['/search']}>
    //             <SearchPage />
    //         </MemoryRouter>
    //     );
    //
    //     const input = screen.getByRole('textbox');
    //     fireEvent.change( input, { target: { name: 'searchText', value: 'superman' } } );
    //
    //     const form = screen.getByLabelText('form');
    //     fireEvent.submit(form);
    //
    // });
})