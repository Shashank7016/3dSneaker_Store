import dynamic from 'next/dynamic'

const DynamicShoeStore = dynamic(() => import('../components/ShoeStore'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="w-16 h-16 border-[3px] border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-gray-400 text-sm font-medium tracking-wide">Loading your experience...</p>
      </div>
    </div>
  )
})

export default function StorePage() {
  return (
    <main>
      <DynamicShoeStore />
    </main>
  )
}
