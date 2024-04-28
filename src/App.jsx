import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Fpv } from './components/Fpv.jsx'
import { Ground } from './components/Ground.jsx'
import { Player } from './components/Player.jsx'
import { Cubes } from './components/Cubes.jsx'
import { TextureSelect } from './components/TextureSelect.jsx'
import { Menu } from './components/Menu.jsx'

function App () {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Ground />
          <Cubes />
          <Player />
        </Physics>
      </Canvas>
      <TextureSelect />
      <div className='info'>
        <p>Presione ESC para ver el cursor</p>
        <p>Presione ESC nuevamente para ver el menu</p>
      </div>
      <div className='pointer'>+</div>
      <Menu />
    </>
  )
}

export default App
