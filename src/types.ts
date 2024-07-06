import type { FeatureCollection, Feature, MultiPolygon } from 'geojson'

export interface ConstProperties {
  code: string
  name: string
  regpop: string
  votes: Record<string, string>
  winner: string
}

export type ConstFeature = Feature<MultiPolygon, ConstProperties>

export type ConstCollection = FeatureCollection<MultiPolygon, ConstProperties>
