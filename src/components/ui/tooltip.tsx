import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import * as React from "react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
  mobileClickable?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      mobileClickable = true,
      ...rest
    } = props

    const [isMobile, setIsMobile] = React.useState(false)
    const [isClickOpen, setIsClickOpen] = React.useState(false)

    React.useEffect(() => {
      const checkIfMobile = () => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        const isSmallScreen = window.innerWidth <= 768
        setIsMobile(hasTouch && isSmallScreen)
      }

      checkIfMobile()
      window.addEventListener('resize', checkIfMobile)
      return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const handleClick = React.useCallback((e: React.MouseEvent) => {
      if (isMobile && mobileClickable) {
        e.preventDefault()
        e.stopPropagation()
        setIsClickOpen(prev => !prev)
      }
    }, [isMobile, mobileClickable])

    const handleClickOutside = React.useCallback(() => {
      if (isClickOpen) {
        setIsClickOpen(false)
      }
    }, [isClickOpen])

    React.useEffect(() => {
      if (isClickOpen) {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
      }
    }, [isClickOpen, handleClickOutside])

    if (disabled) return children

    const triggerProps = isMobile && mobileClickable 
      ? { onClick: handleClick }
      : {}

    const rootProps = isMobile && mobileClickable
      ? { ...rest, open: isClickOpen }
      : rest

    return (
      <ChakraTooltip.Root {...rootProps}>
        <ChakraTooltip.Trigger asChild>
          <div {...triggerProps} style={{ display: 'inline-block' }}>
            {children}
          </div>
        </ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
