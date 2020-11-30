import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Estabelecimentos from '../models/Estabelecimento'
import estabelecimentos_view from '../view/estabelecimentos_view'

export default {
	async create(request: Request, response: Response) {
		const { name, telefone, latitude, longitude, about, instructions, opening_hours, zap, open_on_weekends } = request.body
		const requestImages = request.files as Express.Multer.File[]

		const images = requestImages.map(image => ({ ...image, path: image.filename }))

		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const data = {
			name, telefone, latitude, longitude, about, instructions, opening_hours, zap: zap === 'true',
			open_on_weekends: open_on_weekends === 'true', images
		}

		const schema = Yup.object().shape({
			name: Yup.string().required('O campo "name" é obrigatório.'),
			telefone: Yup.string().required('O campo "telefone" é obrigatório.'),
			latitude: Yup.number().required('O campo "latitude" é obrigatório.'),
			longitude: Yup.number().required('O campo "longitude" é obrigatório.'),
			about: Yup.string().required('O campo "about" é obrigatório.').max(300, 'O campo "about" aceita até 300 caracteres.'),
			instructions: Yup.string().required('O campo "instructions" é obrigatório.'),
			opening_hours: Yup.string().required('O campo "opening_hours" é obrigatório.'),
			zap: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			open_on_weekends: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string()
				})).required('O campo "Images" é obrigatório.')
		})

		await schema.validate(data, { abortEarly: false })

		const estabelecimento = estabelecimentosRepository.create(data)

		await estabelecimentosRepository.save(estabelecimento)

		return response.status(201).json(estabelecimento)
	},

	async index(request: Request, response: Response) {
		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const estabelecimentos = await estabelecimentosRepository.find({ relations: ['images'] })

		return response.json(estabelecimentos_view.renderMany(estabelecimentos))
	},
	
	async show(request: Request, response: Response) {
		const { id } = request.params
		const estabelecimentosRepository = getRepository(Estabelecimentos)

		const estabelecimento = await estabelecimentosRepository.findOneOrFail(id, { relations: ['images'] })

		return response.json(estabelecimentos_view.render(estabelecimento))
	}
}