import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import EstabelecimentosMap from './pages/EstabelecimentosMap'
import Estabelecimento from './pages/Estabelecimento'
import CreateEstabelecimento from './pages/CreateEstabelecimento'

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Landing} exact />
				<Route path="/app" component={EstabelecimentosMap} />
				<Route path="/estabelecimentos/create" component={CreateEstabelecimento} />
				<Route path="/estabelecimentos/:id" component={Estabelecimento} />
			</Switch>
		</BrowserRouter>
	)
}

export default Routes