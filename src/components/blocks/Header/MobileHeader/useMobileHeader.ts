import { useState } from 'react'

/**
 * Mobile Header Logic
 */
const useMobileHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return {
    drawerOpen,
    setDrawerOpen,
  }
}

export default useMobileHeader
