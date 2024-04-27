import { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore.jsx'
import { useKeyboard } from '../hooks/useKeyboard.jsx'
import * as images from '../images/images'

export const TextureSelect = () => {
  const [visible, setVisible] = useState(false)
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

  const { grass, dirt, glass, log, wood } = useKeyboard()

  useEffect(() => {
    const visibilityTimeOut = setTimeout(() => {
      setVisible(false)
    }, 2000)
    setVisible(true)
    return () => {
      clearTimeout(visibilityTimeOut)
    }
  }, [texture])

  useEffect(() => {
    const options = { dirt, glass, grass, log, wood }

    const selectedTexture = Object
      .entries(options)
      .find(([texture, isEnabled]) => isEnabled)

    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, glass, grass, log, wood])

  if (!visible) return null

  return (
    <div className='texture_selector_container'>
      <div className='texture_selector'>
        {
        Object.entries(images).map(([imgKey, img]) => {
          return (
            <img className={`img_selector ${texture === imgKey.replace('Img', '') ? 'selected' : ''}`} key={imgKey} src={img} alt={imgKey} />
          )
        })
        }
      </div>
    </div>
  )
}
