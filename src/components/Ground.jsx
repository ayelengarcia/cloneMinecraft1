import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures.js'
import { useStore } from '../hooks/useStore.jsx'

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z
    position: [0, -0.5, 0] // x, y, z
  }))
  const [addCube] = useStore(state => [state.addCube])

  const handleClickGround = event => {
    event.stopPropagation()

    const [x, y, z] = Object.values(event.point)
      .map(n => Math.ceil(n))
    addCube(x, y, z)
  }

  return (
    <mesh
      onClick={handleClickGround}
      ref={ref}
    >
      <planeGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}
