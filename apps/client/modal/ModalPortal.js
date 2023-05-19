import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const ModalPortal = ({ children, closePortal }) => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setMounted(true)
    if (document) {
      const dom = document.getElementById('modal-root')
      // @ts-ignore
      ref.current = dom
    }
    return () => {
      setMounted(false)
    }
  }, [])

  if (ref.current && mounted) {
    return createPortal(
      <div className="modal">
        <div className="modal-background" role="presentation" onClick={closePortal} />
        <div className="modal-content">
          <div className="modal-content__main">{children}</div>
        </div>
      </div>,
      ref.current
    )
  }
  return null
}
