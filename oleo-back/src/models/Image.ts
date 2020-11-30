import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Estabelecimento from './Estabelecimento'

@Entity('images')
export default class Image {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	path: string

	@ManyToOne(() => Estabelecimento, estabelecimento => estabelecimento.images)
	@JoinColumn({ name: 'estabelecimento_id' })
	estabelecimento: Estabelecimento
}