import * as React from 'react';

import './style.scss';

export interface HeaderProps {
}

export class Header extends React.Component<HeaderProps, undefined> {
    render() {
        return <h1>Header waka</h1>;
    }
}