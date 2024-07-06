import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Layout'
import MapLoader from './MapLoader'

const queryClient = new QueryClient()

export default function App (): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MapLoader />
      </Layout>
    </QueryClientProvider>
  )
}
