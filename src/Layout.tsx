import type { PropsWithChildren } from 'react'
import { Container } from 'react-bootstrap'

export default function Layout ({ children }: PropsWithChildren): JSX.Element {
  return (
    <Container fluid>
      <div className='d-flex flex-column' style={{ height: '100%' }}>
        <div className='d-flex flex-row'>
          <h2 style={{ flexGrow: 1 }}>
            Hypothetical demarcation of South Africa into single-member constituencies
          </h2>
          <div style={{ textWrap: 'nowrap' }}>
            by Adrian Frith
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </Container>
  )
}
