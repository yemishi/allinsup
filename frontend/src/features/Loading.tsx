export default function Loading() {
    return <div className="w-full h-screen backdrop-brightness-50 absolute z-30 text-white flex items-center justify-center">
        <span className="w-14 h-14 rounded-full border-4 border-transparent border-l-secondary-200 border-r-emerald-500 animate-spin" />
    </div>
}