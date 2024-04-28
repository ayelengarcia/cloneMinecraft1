import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures.js'
import { useState } from 'react'
import { useStore } from '../hooks/useStore.jsx'

export const Cube = ({ id, position, texture }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[texture + 'Texture']

  const [isHovered, setIsHovered] = useState(false)

  const handleHover = (e, state) => {
    e.stopPropagation()
    setIsHovered(state)
  }

  const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube])

  const handleAddRemove = (e) => {
    e.stopPropagation()

    const clickFace = Math.floor(e.faceIndex / 2)
    const { x, y, z } = ref.current.position

    if (e.altKey) {
      removeCube(id)
    } else if (clickFace === 0) {
      addCube(x + 1, y, z)
    } else if (clickFace === 1) {
      addCube(x - 1, y, z)
    } else if (clickFace === 2) {
      addCube(x, y + 1, z)
    } else if (clickFace === 3) {
      addCube(x, y - 1, z)
    } else if (clickFace === 4) {
      addCube(x, y, z + 1)
    } else if (clickFace === 5) {
      addCube(x, y, z - 1)
    }
  }

  return (
    <mesh
      onClick={handleAddRemove}
      onPointerMove={(e) => handleHover(e, true)}
      onPointerOut={(e) => handleHover(e, false)}
      ref={ref}
    >
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovered ? 'grey' : 'white'} transparent attach='material' map={activeTexture} />
    </mesh>
  )
}
