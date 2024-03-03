import React from 'react';
import { useLocation } from 'react-router-dom';

function Horror() {
	const loc = useLocation();

	if (loc.pathname === '/books' && loc.search === '?genre=horror')
		return <div>HORROR</div>;
}

export default Horror;
