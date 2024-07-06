interface FetchProgress {
  progress: number
  result?: unknown
}

export default async function * fetchProgress (url: string): AsyncGenerator<FetchProgress> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }
  if (response.body == null) {
    throw new Error('Received empty response')
  }

  const reader = response.body.getReader()
  const contentLength = parseInt(response.headers.get('Content-Length') as string)
  let receivedLength = 0
  const chunks = []

  for (;;) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    chunks.push(value)
    receivedLength += value.length

    yield { progress: receivedLength / contentLength }
  }

  const chunksAll = new Uint8Array(receivedLength)
  let position = 0
  for (const chunk of chunks) {
    chunksAll.set(chunk, position)
    position += chunk.length
  }

  const body = new TextDecoder('utf-8').decode(chunksAll)
  const result = JSON.parse(body)

  yield { progress: 1, result }
}
