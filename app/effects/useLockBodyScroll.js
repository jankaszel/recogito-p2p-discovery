import {useLayoutEffect} from 'react'

// <https://usehooks.com/useLockBodyScroll/>
export default function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
