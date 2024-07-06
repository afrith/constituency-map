import type { PropsWithChildren } from 'react'
import { Container } from 'react-bootstrap'

export default function Layout ({ children }: PropsWithChildren): JSX.Element {
  return (
    <Container fluid>
      <div className='d-flex flex-column' style={{ height: '100%' }}>
        <div>
          <h2>Hypothetical demarcation of South Africa into single-member electoral districts</h2>
        </div>
        <div style={{ flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </Container>
  )
}
