// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
    DEFAULT_PLACEHOLDER_FILTERS,
} from 'constants/basic';
import {
    statesData,
    citiesData,
    typesData,
    tagsData,
} from 'constants/data';
import {
    listGetRequest,
    listStateSelect,
    listCitySelect,
    listTypeSelect,
    listTagsSelect,
    listNameSelect,
    listKeywordSelect,
    listClearAllFilters,
    listSearchGetRequest,
} from 'actions/list-actions';
import { getListToolbarFilters } from 'selectors/list-selectors';

class ListToolbar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        };
    }

    render () {
        const {
            listGetRequest,
            listSearchGetRequest,
            listStateSelect,
            listCitySelect,
            listTypeSelect,
            listTagsSelect,
            listNameSelect,
            listClearAllFilters,
            listKeywordSelect,
            filters: {
                state,
                city,
                type,
                tags,
                name,
                keyword,
            },
        } = this.props;

        return (
            <React.Fragment>
                <div className='flex-row'>
                    <h2 className='h4 p-l-1'>Filters</h2>
                    <button
                        className='btn btn-link m-l-half'
                        type='button'
                        onClick={listClearAllFilters}
                    >
                        Clear all filters
                    </button>
                </div>
                <div className='row m-b-half'>
                    <div className='col-sm-3 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='name'
                        >
                            Company name
                        </label>
                        <input
                            className='form-control'
                            id='name'
                            name='name'
                            onChange={e => listNameSelect(e.target.value)}
                            placeholder='Type company name...'
                            value={name}
                        />
                    </div>
                    <div className='col-sm-3 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='state'
                        >
                            State
                        </label>
                        <Select
                            className='d-xs-block select-dropdown'
                            labelKey='name'
                            valueKey='name'
                            name='state'
                            value={state}
                            options={statesData}
                            onBlurResetsInput={false}
                            onChange={listStateSelect}
                            onCloseResetsInput={false}
                            optionClassName='font-size-sm'
                            placeholder={DEFAULT_PLACEHOLDER_FILTERS.state}
                            searchable
                        />
                    </div>

                    <div className='col-sm-3 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='city'
                        >
                            City
                        </label>
                        <Select
                            className='d-xs-block select-dropdown'
                            labelKey='city'
                            name='city'
                            valueKey='city'
                            value={city}
                            options={citiesData}
                            onBlurResetsInput={false}
                            onChange={listCitySelect}
                            onCloseResetsInput={false}
                            optionClassName='font-size-sm'
                            placeholder={DEFAULT_PLACEHOLDER_FILTERS.city}
                            searchable
                        />
                    </div>

                    <div className='col-sm-3 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='type'
                        >
                            Type
                        </label>
                        <Select
                            className='d-xs-block select-dropdown'
                            labelKey='type'
                            name='type'
                            valueKey='type'
                            value={type}
                            options={typesData}
                            onBlurResetsInput={false}
                            onChange={listTypeSelect}
                            onCloseResetsInput={false}
                            optionClassName='font-size-sm'
                            placeholder={DEFAULT_PLACEHOLDER_FILTERS.type}
                            searchable
                        />
                    </div>
                </div>
                <div className='row m-b-1'>
                    <div className='col-sm-6 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='tags'
                        >
                            Tags
                        </label>
                        <Select
                            className='d-xs-block select-dropdown'
                            labelKey='tag'
                            name='tag'
                            valueKey='tag'
                            value={tags}
                            options={tagsData}
                            onBlurResetsInput={false}
                            onChange={listTagsSelect}
                            onCloseResetsInput={false}
                            optionClassName='font-size-sm'
                            placeholder={DEFAULT_PLACEHOLDER_FILTERS.tags}
                            searchable
                            multi
                        />
                    </div>
                    <div className='col-sm-3 col-xs-12'>
                        <label
                            className='form-control-label'
                            htmlFor='naapply-filtersme'
                        >
                            &nbsp;
                        </label>
                        <button
                            id='apply-filters'
                            className='btn btn-primary d-xs-block'
                            type='button'
                            onClick={listGetRequest}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
                <div className='flex-row m-b-half'>
                    <div className='col-sm-3 col-xs-12'>
                        <h2 className='h4'>Keyword search</h2>
                    </div>
                </div>
                <div className='row m-b-3'>
                    <div className='col-sm-3 col-xs-12'>
                        <input
                            className='form-control'
                            id='keyword'
                            onChange={e => listKeywordSelect(e.target.value)}
                            value={keyword}
                            placeholder='Type keyword...'
                        />
                    </div>
                    <div className='col-sm-3 col-xs-12'>
                        <button
                            id='search'
                            className='btn btn-primary d-xs-block'
                            type='button'
                            onClick={listSearchGetRequest}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: getListToolbarFilters(state),
    };
};

const mapDispatchToProps = {
    listGetRequest,
    listSearchGetRequest,
    listStateSelect,
    listCitySelect,
    listTypeSelect,
    listTagsSelect,
    listNameSelect,
    listClearAllFilters,
    listKeywordSelect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListToolbar);
