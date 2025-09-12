"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  TooltipProvider,
} from "@radix-ui/react-tooltip"

type SidebarContextProps = {
  isMobile: boolean
  isCollapsed: boolean
  isCollapsible: boolean
  onCollapse: () => void
  onExpand: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

type SidebarProviderProps = {
  children: React.ReactNode
  defaultCollapsed?: boolean
  collapsible?: "icon" | "button"
  onCollapse?: () => void
  onExpand?: () => void
}

function SidebarProvider({
  children,
  defaultCollapsed = false,
  collapsible = "icon",
  onCollapse,
  onExpand,
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const isCollapsible = !!collapsible

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  React.useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(defaultCollapsed)
    }
  }, [isMobile, defaultCollapsed])

  const handleCollapse = () => {
    setIsCollapsed(true)
    onCollapse?.()
  }

  const handleExpand = () => {
    setIsCollapsed(false)
    onExpand?.()
  }

  const value = React.useMemo(
    () => ({
      isMobile,
      isCollapsed,
      isCollapsible,
      onCollapse: handleCollapse,
      onExpand: handleExpand,
    }),
    [isMobile, isCollapsed, isCollapsible, handleCollapse, handleExpand]
  )

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "hidden h-full flex-col transition-all duration-300 ease-in-out md:flex",
  {
    variants: {
      isCollapsed: {
        true: "w-14",
        false: "w-64",
      },
    },
    defaultVariants: {
      isCollapsed: false,
    },
  }
)

type SidebarProps = React.ComponentProps<"aside"> & {
  collapsible?: "icon" | "button"
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed, isCollapsible, isMobile } = useSidebar()
    const collapsibleType = isCollapsible ? "icon" : undefined

    if (isMobile) {
      return null
    }

    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ isCollapsed }), className)}
        data-collapsible={collapsibleType}
        {...props}
      >
        <div className="flex h-full flex-col">{children}</div>
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn("flex items-center", isCollapsed ? "h-14 justify-center" : "h-14 px-4", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-auto flex flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const sidebarInsetVariants = cva("transition-all duration-300 ease-in-out", {
  variants: {
    isCollapsed: {
      true: "md:pl-14",
      false: "md:pl-64",
    },
  },
})

type SidebarInsetProps = React.ComponentProps<"div">

const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => {
    const { isCollapsed, isMobile } = useSidebar()

    if (isMobile) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(sidebarInsetVariants({ isCollapsed }), className)}
        {...props}
      />
    )
  }
)
SidebarInset.displayName = "SidebarInset"

type SidebarTriggerProps = ButtonProps

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ className, ...props }, ref) => {
  const { isMobile } = useSidebar()
  if (!isMobile) return null
  return <SheetTrigger ref={ref} className={cn(className)} {...props} />
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarSheet = React.forwardRef<
  React.ElementRef<typeof Sheet>,
  React.ComponentPropsWithoutRef<typeof Sheet>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = useSidebar();
  if (!isMobile) {
    const childrenArray = React.Children.toArray(children);
    const mainContent = childrenArray.find(
      (child) => (child as React.ReactElement).type !== SidebarSheetContent
    );
    return <>{mainContent}</>
  }
  return (
    <Sheet ref={ref} {...props}>
      {children}
    </Sheet>
  );
});
SidebarSheet.displayName = "SidebarSheet"


const SidebarSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent>
>(({ className, children, ...props }, ref) => (
  <SheetContent ref={ref} className={cn("w-64 p-0", className)} {...props}>
    {children}
  </SheetContent>
))
SidebarSheetContent.displayName = "SidebarSheetContent"

const SidebarSheetHeader = React.forwardRef<
  React.ElementRef<typeof SheetHeader>,
  React.ComponentPropsWithoutRef<typeof SheetHeader>
>(({ className, ...props }, ref) => (
  <SheetHeader
    ref={ref}
    className={cn("h-14 flex-row items-center gap-2.5 px-4", className)}
    {...props}
  />
))
SidebarSheetHeader.displayName = "SidebarSheetHeader"

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1 p-2", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

type SidebarMenuButtonProps = ButtonProps & {
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, isActive, tooltip, children, ...props }, ref) => {
  const { isCollapsed } = useSidebar()

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            className={cn("size-10", className)}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Button
      ref={ref}
      variant={isActive ? "secondary" : "ghost"}
      className={cn("w-full justify-start", className)}
      {...props}
    >
      {children}
    </Button>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSheet,
  SidebarSheetContent,
  SidebarSheetHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}
