import './App.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Container, ProgressBar } from 'react-bootstrap'
import fetchProgress from './fetchProgress'
import Map from './Map'
import type { Topology } from 'topojson-specification'

export default function MapLoader (): JSX.Element {
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
