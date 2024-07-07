import type { PropsWithChildren } from 'react'
import { Container } from 'react-bootstrap'

export default function Layout ({ children }: PropsWithChildren): JSX.Element {
  return (
    <Container fluid>
      <div className='d-flex flex-column h-100'>
        <div className='d-none d-md-flex flex-row align-items-baseline justify-content-between'>
          <h2>
            Imagining single-member constituency elections in South Africa
          </h2>
          <div className='ms-4 more-info'>
            <a target='_blank' href='https://adrian.frith.dev/single-member-constituencies/' rel='noreferrer'>more info</a>
          </div>
          <div className='ms-4 author'>
            by <a target='_blank' href='https://adrian.frith.dev/' rel='noreferrer'>Adrian Frith</a>
          </div>
        </div>

        <div className='d-block d-md-none flex-column align-items-start'>
          <h2>
            Imagining single-member constituency elections in South Africa
          </h2>
          <div className='mb-2 d-flex flex-row align-items-baseline justify-content-between'>
            <div className='more-info'>
              <a target='_blank' href='https://adrian.frith.dev/single-member-constituencies/' rel='noreferrer'>more info</a>
            </div>
            <div className='author'>
              by <a target='_blank' href='https://adrian.frith.dev/' rel='noreferrer'>Adrian Frith</a>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </Container>
  )
}
