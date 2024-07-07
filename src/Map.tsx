import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import type { Map as LeafletMap, LeafletMouseEventHandlerFn, StyleFunction, LatLng } from 'leaflet'
import type { Topology } from 'topojson-specification'
import * as topojson from 'topojson-client'
import type { ConstProperties, ConstFeature, ConstCollection } from './types'
import PopupContents from './PopupContents'

interface MapProps {
  topology: Topology
}

const partyColors: Record<string, string> = {
  ANC: '#4daf4a',
  DA: '#377eb8',
  IFP: '#a65628',
  MK: '#f781bf'
}

const styleFn: StyleFunction<ConstProperties> = (feature) => feature != null
  ? {
      stroke: true,
      color: 'black',
      weight: 2,
      fill: true,
      fillColor: partyColors[feature.properties.winner] ?? '#7f7f7f',
      fillOpacity: 0.4
    }
  : {}

export default function Map (props: MapProps): JSX.Element {
  const { topology } = props

  const features = useMemo(
    () => topojson.feature(topology, topology.objects.constituencies) as ConstCollection,
    [topology]
  )

  const [map, setMap] = useState<LeafletMap | null>(null)
  const [popupPos, setPopupPos] = useState<LatLng | null>(null)
  const [popupFeature, setPopupFeature] = useState<ConstFeature | null>(null)

  useEffect(() => {
    if (map != null) {
      map.fitBounds([[-35, 16], [-22, 33]])
    }
  }, [map])

  const handleClick: LeafletMouseEventHandlerFn = (event) => {
    if (event.propagatedFrom?.feature == null) return
    const feature = event.propagatedFrom.feature as ConstFeature
    setPopupPos(event.latlng)
    setPopupFeature(feature)
  }

  return (
    <MapContainer ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <GeoJSON data={features} style={styleFn} eventHandlers={{ click: handleClick }} />
      {(popupPos != null && popupFeature != null) && (
        <Popup key={popupFeature.id} position={popupPos}><PopupContents feature={popupFeature} /></Popup>
      )}
    </MapContainer>
  )
}
