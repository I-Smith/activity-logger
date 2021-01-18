import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide'
import { MenuItems } from './MenuItems';

import './sideBar.css';

class SideBar extends React.Component {
	render() {
		const {user} = this.props;
		return (
			<Menu
				right
				width={'80%'}
			>
				<MenuItems />
		  </Menu>
		);
	}
}

export { SideBar };