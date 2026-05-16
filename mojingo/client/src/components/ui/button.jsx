import * as React from "react"

function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 px-4 py-2"

  const variants = {
    default: "bg-[#FF4F93] text-white hover:bg-[#e03f80]",
    outline: "border border-[rgba(190,190,190,0.4)] bg-white hover:bg-gray-50 text-[#3D3D3D]",
    ghost: "hover:bg-gray-100 text-[#3D3D3D]",
  }

  return (
    <button className={`${base} ${variants[variant] ?? variants.default} ${className}`} {...props}>
      {children}
    </button>
  )
}

export { Button }