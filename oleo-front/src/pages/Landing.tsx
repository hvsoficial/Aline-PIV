import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logo from '../images/logo.svg'

import '../styles/pages/landing.css'

const Landing: React.FC = () => {
	return (
		<div id="page-landing">
			<div className="content-wrapper">
				{/*<img src={logo} alt="Logo Happy" />*/}

				<main>
					<h1>AJUDE A RECICLAR</h1>
					<p>"Reciclar é uma forma saudável de ajudar na preservação do meio ambiente."</p>
					<p>Contribua para um planeta melhor!</p>
				</main>

				<div className="location">
					<strong> </strong>
					<span> </span>
				</div>

				<Link to="/app" className="enter-app"><FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" /></Link>
			</div>
		</div>
	)
}

export default Landing