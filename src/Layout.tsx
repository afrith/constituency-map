import type { PropsWithChildren } from 'react'
import { Container } from 'react-bootstrap'

export default function Layout ({ children }: PropsWithChildren): JSX.Element {
  return (
    <Container fluid>
      <div className='d-flex flex-column h-100'>
        <div className='d-flex flex-column flex-md-row align-items-start align-items-md-end'>
          <h2 style={{ flexGrow: 1 }}>
            Hypothetical demarcation of South Africa into single-member constituencies
          </h2>
          <div className='ms-md-3 mb-2 author'>
            by <a target='_blank' href='https://adrian.frith.dev/' rel='noreferrer'>Adrian Frith</a>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </Container>
  )
}
