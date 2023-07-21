import { useEffect, useState } from 'react'

const FACT_API_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random'

export const RandomFact = () => {
  const [fact, setFact] = useState<string | null>(null)

  useEffect(() => {
    const fetchFact = async () => {
      const response = await fetch(FACT_API_URL)
      const data = (await response.json()) as { text: string }
      setFact(data.text)
    }

    fetchFact().catch((err) => {
      console.warn(err)
      setFact('Ooops could not load random fact :(')
    })
  }, [])

  return <span>{fact}</span>
}
