import { useEffect } from 'react'

const useBeforeUnload = (value) => {
  const handleBeforeUnload = (e) => {
    let returnValue
    if (typeof value === 'function') {
      returnValue = value(e)
    } else {
      returnValue = value
    }
    if (returnValue) {
      e.preventDefault()
      e.returnValue = returnValue
    }
    return returnValue
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeuload', handleBeforeUnload)
  }, [])
}
export default useBeforeUnload;
