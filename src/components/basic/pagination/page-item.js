import React from 'react';
import PropTypes from 'prop-types';

const PageItem = props => {
    const {
        active,
        onChange,
        url,
        value,
    } = props;

    const onClick = () => {
        if (active) {
            return;
        }
        onChange(value);
    };
    const label = active
        ? (
            <span
                onClick={onClick}
                className='active'
                role='presentation'
            >
                {value}
            </span>
        )
        : (
            <a
                onClick={onClick}
                href={url}
            >
                {value}
            </a>
        );

    return (
        <li>
            {label}
        </li>
    );
};

PageItem.propTypes = {
    active: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default PageItem;
