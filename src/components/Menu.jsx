import { useStore } from '../hooks/useStore.jsx'

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld])

  const handleSave = (e) => {
    e.preventDefault()
    saveWorld()
    window.location.reload()
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetWorld()
  }

  return (
    <div className='menu'>
      <button className='btn_menu' onClick={handleSave}>GUARDAR</button>
      <button className='btn_menu' onClick={handleReset}>REINICIAR</button>
    </div>
  )
}
