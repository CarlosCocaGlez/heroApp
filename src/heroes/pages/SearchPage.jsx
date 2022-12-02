import { useSearchParams } from 'react-router-dom';

import { HeroCard } from '../components';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();

    const q = searchParams.get( 'q' ) ?? '' ;
    const heroes = getHeroesByName( q );
    const showSearch = (q.length === 0)
    const showError = (q.length > 0) && (heroes.length === 0)

    const { searchText, onInputChange } = useForm({
        searchText: q
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ q: searchText });
    }

    return (
        <>
            <h1>Search</h1>
            <hr/>
            <div className='row'>
                <div className='col-5'>
                    <h4>Searching</h4>
                    <hr/>
                    <form
                        aria-label='form'
                        onSubmit={ onSearchSubmit }
                    >
                        <input
                            type='text'
                            placeholder='Search a hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={ searchText }
                            onChange={ onInputChange }
                        />
                        <button className='btn btn-outline-primary mt-1'>
                            Search
                        </button>
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr/>
                    <div
                        className='alert alert-primary animate__animated animate__fadeIn'
                        style={{ display: showSearch ? '' : 'none'}}
                    >
                        Search a hero
                    </div>
                    <div
                        aria-label='alert-danger'
                        className='alert alert-danger animate__animated animate__fadeIn'
                        style={{ display: showError ? '' : 'none'}}
                    >
                        Not known hero <b>{ q }</b>
                    </div>
                    {
                        heroes.map( hero => (
                            <HeroCard key={ hero.id } { ...hero } />
                        ))
                    }
                </div>
            </div>
        </>
    );
};