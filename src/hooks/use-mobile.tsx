
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // 初始检查
    checkMobile()
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile)
    
    // 清理
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isClient ? isMobile : false
}
