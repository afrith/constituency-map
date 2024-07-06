import './App.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Alert, Container, ProgressBar } from 'react-bootstrap'
import fetchProgress from './fetchProgress'
import Map from './Map'
import type { Topology } from 'topojson-specification'

const queryClient = new QueryClient()

export default function App (): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid>
        <div className='d-flex flex-column' style={{ height: '100%' }}>
          <div>
            <h2>Hypothetical demarcation of South Africa into single-member electoral districts</h2>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Main />
          </div>
        </div>
      </Container>
    </QueryClientProvider>
  )
}

function Main (): JSX.Element {
  const [progress, setProgress] = useState(0)

  const { isPending, error, data } = useQuery({
    queryKey: ['smd.topo'],
    queryFn: async () => {
      for await (const { progress, result } of fetchProgress('/smd.topo.json')) {
        setProgress(progress)
        if (result != null) {
          return result as Topology
        }
      }
    },
    staleTime: Infinity
  })

  if (error != null) {
    return (
      <Alert variant='danger'>
        Error: {error.toString()}
      </Alert>
    )
  }

  if (isPending) {
    return (
      <Container className='py-4'>
        <ProgressBar
          animated
          min={0}
          max={1}
          now={progress}
          label={`Loading: ${Math.round(progress * 100)}%`}
        />
      </Container>
    )
  }

  return <Map topology={data as Topology} />
}
