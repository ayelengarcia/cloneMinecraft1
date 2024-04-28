import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard.jsx'
// grass, dirt, glass, log, wood

const CHARACTER_SPEED = 4
const CHARACTER_JUMP = 4

export const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0]
  }))

  // Copio la posicision del pj
  const posUser = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe(pos => {
      posUser.current = pos
    })
  }, [api.position])

  // Copio la velocidad del pj
  const velUser = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe(vel => {
      velUser.current = vel
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        posUser.current[0], // x
        posUser.current[1], // y
        posUser.current[2] // z
      )
    )

    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)) // adelante - atras
    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0) // izquierda - derecha

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) // walk: 2, run: 5
      .applyEuler(camera.rotation)

    api.velocity.set(
      direction.x, // x
      velUser.current[1], // y saltar
      direction.z // z
    )

    if (jump && Math.abs(velUser.current[1]) < 0.03) {
      api.velocity.set(
        velUser.current[0], // X
        CHARACTER_JUMP, // Y
        velUser.current[2] // z
      )
    }
  })

  return (
    <mesh ref={ref} />
  )
}
