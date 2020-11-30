import Estabelecimento from "../models/Estabelecimento"
import imagesView from "./images_view"

export default {
	render(estabelecimento: Estabelecimento) {
		return {
			id: estabelecimento.id,
			name: estabelecimento.name,
			telefone: estabelecimento.telefone,
			latitude: estabelecimento.latitude,
			longitude: estabelecimento.longitude,
			about: estabelecimento.about,
			instructions: estabelecimento.instructions,
			opening_hours: estabelecimento.opening_hours,
			zap: estabelecimento.zap,
			open_on_weekends: estabelecimento.open_on_weekends,
			images: imagesView.renderMany(estabelecimento.images)
		}
	},

	renderMany(estabelecimentos: Estabelecimento[]) {
		return estabelecimentos.map(estabelecimento => this.render(estabelecimento))
	}
}