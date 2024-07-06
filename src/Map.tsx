import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import type { Map as LeafletMap, LeafletMouseEventHandlerFn, StyleFunction, LatLng } from 'leaflet'
import type { Topology } from 'topojson-specification'
import * as topojson from 'topojson-client'
import type { FeatureCollection, Feature, MultiPolygon } from 'geojson'

interface MapProps {
  topology: Topology
}

const partyColors: Record<string, string> = {
  ANC: '#4daf4a',
  DA: '#377eb8',
  IFP: '#e41a1c',
  MK: '#ff7f00'
}

interface ConstProperties {
  code: string
  name: string
  regpop: string
  votes: Record<string, string>
  winner: string
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
    () => topojson.feature(topology, topology.objects.constituencies) as FeatureCollection<MultiPolygon, ConstProperties>,
    [topology]
  )

  const [map, setMap] = useState<LeafletMap | null>(null)
  const [popupPos, setPopupPos] = useState<LatLng | null>(null)
  const [popupFeature, setPopupFeature] = useState<Feature<MultiPolygon, ConstProperties> | null>(null)

  useEffect(() => {
    if (map != null) {
      map.fitBounds([[-35, 16], [-22, 33]])
    }
  }, [map])

  const handleClick: LeafletMouseEventHandlerFn = (event) => {
    if (event.propagatedFrom?.feature == null) return
    const feature = event.propagatedFrom.feature as Feature<MultiPolygon, ConstProperties>
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
      {(popupPos != null) && (
        <Popup position={popupPos}>{popupFeature?.properties.name}</Popup>
      )}
    </MapContainer>
  )
}
