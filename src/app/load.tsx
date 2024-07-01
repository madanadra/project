export default function Load({size}: {size: 'small' | 'base' | 'large'}) {
    return (
        <div className={`${size === 'small' ? 'w-4 border-2' : size === 'base' ? 'w-6 border-4' : 'w-8 border-[6px]'} 
        aspect-square rounded-full border-slate-500 border-r-transparent opacity-50 animate-spin`} />
    )
}