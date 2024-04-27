import { useStore } from '../hooks/useStore.jsx'
import { useEffect, useState } from 'react'

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowMenu(!showMenu)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showMenu])

  const handleSave = (e) => {
    e.preventDefault()
    saveWorld()
    window.location.reload()
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetWorld()
  }

  const handlePlay = () => {
    setShowMenu(false)
  }

  return (
    <div className={`menu ${showMenu ? '' : 'ocultarMenu'}`}>
      <div className='contain_controles'>
        <h2>CONTROLES</h2>
        <div className='subcontain_controles'>
          <div>
            <p>Adelante: <b>W</b></p>
            <p>Atrás: <b>S</b></p>
            <p>Izquierda: <b>A</b></p>
            <p>Derecha: <b>D</b></p>
            <p>Saltar: <b>Espacio</b></p>
            <p>Colocar: <b>Click</b></p>
          </div>
          <div>
            <p>Dígito 1: <b>Tierra</b></p>
            <p>Dígito 2: <b>Vidrio</b></p>
            <p>Dígito 3: <b>Pasto</b></p>
            <p>Dígito 4: <b>Tronco</b></p>
            <p>Dígito 5: <b>Madera</b></p>
            <p>Remover: <b>Click + Alt</b></p>
          </div>
        </div>
      </div>
      <div className='contain_buttons'>
        <button className='btn_menu' onClick={handleSave}>GUARDAR</button>
        <button className='btn_menu' onClick={handleReset}>REINICIAR</button>
        <button className='btn_menu' onClick={handlePlay}>JUGAR</button>
      </div>
    </div>
  )
}
