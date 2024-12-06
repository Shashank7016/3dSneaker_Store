import dynamic from 'next/dynamic'

const DynamicShoeStore = dynamic(() => import('./components/ShoeStore'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Shoe Store...</p>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <main>
      <DynamicShoeStore />
    </main>
  )
}