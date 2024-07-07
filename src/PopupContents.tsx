import { Table } from 'react-bootstrap'
import type { ConstFeature } from './types'
import { formatInt, formatPerc } from './utils'

interface PopupContentsProps {
  feature: ConstFeature
}

export default function PopupContents ({ feature }: PopupContentsProps): JSX.Element {
  const { name, regpop, votes } = feature.properties

  const sortedVotes = votes.map(v => ({ party: v[0], votes: v[1] }))
    .sort((a, b) => b.votes - a.votes)

  const totalVotes = votes.reduce((previous, current) => previous + current[1], 0)

  return (
    <>
      <h5>{name}</h5>
      <div><em>Registered voters (2021):</em> {formatInt(regpop)}</div>
      <div className='my-2 popup-vote-table'>
        <div className='table-head'>
          Votes (2024 regional ballot):
        </div>
        <Table size='sm' striped>
          <thead>
            <tr>
              <th>Party</th>
              <th className='num-col'>Votes</th>
              <th className='num-col'>Percent</th>
            </tr>
          </thead>
          <tbody>
            {sortedVotes.map(({ party, votes }) => (
              <tr key={party}>
                <td>{party}</td>
                <td className='num-col'>{formatInt(votes)}</td>
                <td className='num-col'>{formatPerc(votes / totalVotes)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th className='num-col'>{formatInt(totalVotes)}</th>
              <th className='num-col' />
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  )
}
