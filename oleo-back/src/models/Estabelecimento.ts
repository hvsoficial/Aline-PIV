import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Image from './Image'

@Entity('estabelecimentos')
export default class Orphanage {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	name: string

	@Column()
	telefone: string

	@Column()
	latitude: number

	@Column()
	longitude: number

	@Column()
	about: string

	@Column()
	instructions: string

	@Column()
	opening_hours: string

	@Column()
	zap: boolean

	@Column()
	open_on_weekends: boolean

	@OneToMany(() => Image, image => image.estabelecimento, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'estabelecimento_id' })
	images: Image[]
}