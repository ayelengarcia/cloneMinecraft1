import { useStore } from '../hooks/useStore.jsx'
import { useEffect } from 'react'

export const TerrainGenerator = () => {
  const addCube = useStore(state => state.addCube)

  // Generar terreno predeterminado - Agregar cubos iniciales
  useEffect(() => {
    for (let x = -10; x < 10; x++) {
      for (let z = -10; z < 10; z++) {
        for (let y = 0; y < 1; y++) {
          addCube(x, y, z)
        }
      }
    }
  }, [addCube])

  return true
}

// useEffect(() => {
//   const mountainHeight = 10
//   const mountainSize = 10

//   for (let x = -5; x < mountainSize; x++) {
//     for (let z = 0; z < mountainSize; z++) {
//       const distanceFromCenter = Math.sqrt((x - mountainSize / 2) ** 2 + (z - mountainSize / 2) ** 2)
//       const y = Math.floor(Math.max(0, mountainHeight - distanceFromCenter))
//       for (let i = 0; i <= y; i++) {
//         addCube(x, i, z)
//       }
//     }
//   }
// }, [addCube])
