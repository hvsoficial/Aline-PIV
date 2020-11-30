import React, { ChangeEvent, FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet"
import { FiPlus } from "react-icons/fi"

import api from "../services/api"
import mapIcon from "../utils/mapIcon"
import Sidebar from "../components/Sidebar"

import '../styles/pages/create-estabelecimento.css'

const CreateEstabelecimento: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [telefone, setFone] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [zap, setZap] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [selectedImagesPreview, setSelectedImagesPreview] = useState<string[]>([])

  const { push } = useHistory()

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({ latitude: lat, longitude: lng })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) { return }

    const files = Array.from(event.target.files)

    setImages(files)

    const imagesPreview = files.map(file => {
      return URL.createObjectURL(file)
    })

    setSelectedImagesPreview(imagesPreview)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('telefone', telefone)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('zap', String(zap))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    images.forEach(image => data.append('images', image))

    api.post('estabelecimentos', data)
      .then(() => {
        alert('Cadastro realizado com Sucesso!')

        push('/app')
      })
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar dados do estabelecimento!')
        }

        console.error(errors)
        alert(message)
      })
  }

  return (
    <div id="page-create-estabelecimento">
      <Sidebar />

      <main>
        <form className="create-estabelecimento-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map center={[-16.3325529, -48.9549526]} style={{ width: '100%', height: 280 }} zoom={14}
              onclick={handleMapClick}>
              <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
 />

              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos<span>Para a adição de mais de uma imagem deve selecionar todas antes de clicar em abrir </span></label>

              <div className="images-container">
                {selectedImagesPreview.map(image => (
                  <img key={image} src={image} alt="Local Estabelecimento" />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" id="image[]" multiple onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Dados para o Atendimento </legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de atendimento<span>Ex.: Das 8:00h as 16:00h</span></label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="telefone">Telefone<span>O numero tem que ser composto pelo DDI + DDD + numero de telefone Ex.: +55 62 99999 9999</span></label>
             <input id="telefone" value={telefone} onChange={event => setFone(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atendimento aos fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>

                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="zap">O número de telefone contém Whatzapp</label>

              <div className="button-select">
                <button type="button" className={zap ? 'active' : ''} onClick={() => setZap(true)}>
                  Sim
                </button>

                <button type="button" className={!zap ? 'active' : ''} onClick={() => setZap(false)}>
                  Não
                </button>
                </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit"> Confirmar </button>
        </form>
      </main>
    </div>
  )
}

export default CreateEstabelecimento