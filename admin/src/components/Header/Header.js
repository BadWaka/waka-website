import React from 'react';

import style from './style.scss';

const Header = (props) => {
    return <section className={style.headerWrapper}>
        <div className={style.header}>
            <span className={style.title}>
                {props.title}
            </span>
        </div>
    </section>;
};

export default Header;