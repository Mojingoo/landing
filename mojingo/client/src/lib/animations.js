export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
}

export const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

export const hoverWobble = {
    rotate: 2,
    transition: { duration: 0.2, ease: 'easeOut' }
}

export const hoverCardScale = (borderColor) => ({
    y: -5,
    scale: 1.02,
    ...(borderColor ? { borderColor } : {}),
    boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
    transition: { duration: 0.1, ease: 'easeOut' }
})