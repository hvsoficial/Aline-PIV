import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaWhatsapp, FaPhone } from "react-icons/fa"
import { FiClock, FiInfo } from "react-icons/fi"
import { Map, Marker, TileLayer } from "react-leaflet"

import api from "../services/api"
import mapIcon from "../utils/mapIcon"
import Sidebar from "../components/Sidebar"

import '../styles/pages/estabelecimento.css'

interface Estabelecimento {
	id: number,
	name: string,
	telefone: string,
	latitude: number,
	longitude: number,
	about: string,
	instructions: string,
	opening_hours: string,
	open_on_weekends: boolean,
	zap: boolean,
	images: {
		id: number,
		url: string
	}[]
}

interface RouteParams {
	id: string
}

const Estabelecimento: React.FC = () => {
	const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>()
	const [indexImageActive, setIndexImageActive] = useState(0)
	const params = useParams<RouteParams>()

	useEffect(() => {
		api.get(`/estabelecimentos/${params.id}`)
			.then(({ data }) => setEstabelecimento(data))
			.catch(({ response }) => {
				const { message, errors } = response.data

				if (!message) {
					console.log(response)
					return alert('Falha ao listar dados do estabelecimento!')
				}

				console.error(errors)
				alert(message)
			})
	}, [params.id])

	if (!estabelecimento) { return <p>Carregando...</p> }

	return (
		<div id="page-estabelecimento">
			<Sidebar />

			<main>
				<div className="estabelecimento-details">
					<img src={estabelecimento.images[indexImageActive].url} alt={estabelecimento.name} />

					<div className="images">
						{estabelecimento.images.map((image, index) => (
							<button type="button" key={image.id} className={indexImageActive === index ? 'active' : ''}
								onClick={() => setIndexImageActive(index)}>

								<img src={image.url} alt={estabelecimento.name} />
							</button>
						))}
					</div>

					<div className="estabelecimento-details-content">
						<h1>{estabelecimento.name}</h1>
						<p>{estabelecimento.about}</p>

						<div className="map-container">
							<Map center={[estabelecimento.latitude, estabelecimento.longitude]} zoom={16} style={{ width: '100%', height: 280 }}
								dragging={false} touchZoom={false} zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}>
								<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
								<Marker interactive={false} icon={mapIcon} position={[estabelecimento.latitude, estabelecimento.longitude]} />
							</Map>

							<footer>
								<a href={`https://www.google.com/maps/dir/?api=1&destination=${estabelecimento.latitude},${estabelecimento.longitude}`}
									target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
							</footer>
						</div>

						<hr />

						<h2>Instruções </h2>
						<p>{estabelecimento.instructions}</p>

						<div className="open-details">
							<div className="hour">
								<FiClock size={32} color="#15b6d6" />
                Segunda à Sexta <br /> {estabelecimento.opening_hours}
							</div>

							{estabelecimento.open_on_weekends
								? (
									<div className="open-on-weekends">
										<FiInfo size={32} color="#39cc83" />
                		Atendemos <br /> fim de semana
									</div>
								) : (
									<div className="open-on-weekends dont-open">
										<FiInfo size={32} color="#ff669d" />
                		Não atendemos <br /> fim de semana
									</div>
								)}
						</div>
						
						{estabelecimento.zap
								? (
									<a href={`http://wa.me/${estabelecimento.telefone}`} className="contact-button">
										<FaPhone size={20} color="#fff" />
										<FaWhatsapp size={20} color="#fff" />
                							 Entrar em contato : {estabelecimento.telefone}
										</a> 
								) : (
									<div className="contact-button-phone">
										<FaPhone size={20} color="#fff" />
                							Entrar em contato : {estabelecimento.telefone}
            						</div> 
								)}

					</div>
				</div>
			</main>
		</div>
	)
}

export default Estabelecimento