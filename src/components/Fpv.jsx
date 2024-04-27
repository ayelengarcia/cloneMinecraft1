import { PointerLockControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

// First person view - camara primera persona
export const Fpv = () => {
  const { camara, gl } = useThree()
  return (
    <PointerLockControls args={[camara, gl.domElement]} />
  )
}
