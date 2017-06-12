import * as React from 'react';

import './style.scss';

export interface HeaderProps {
}

export class Header extends React.Component<HeaderProps, undefined> {
    render() {
        return <h1 className="header">Header waka</h1>;
    }
}