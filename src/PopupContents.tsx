import type { ConstFeature } from './types'

interface PopupContentsProps {
  feature: ConstFeature
}

export default function PopupContents ({ feature }: PopupContentsProps): JSX.Element {
  const { name, winner, regpop } = feature.properties
  return (
    <>
      <h4>{name}</h4>
      <div><em>Registered voters (2021):</em> {regpop}</div>
      <div><em>Winner (2024 regional ballot):</em> {winner}</div>
    </>
  )
}
