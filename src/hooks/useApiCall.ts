import { isEqual } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import useSWRWrapper from 'swr'

const fetchCall = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((result) => {
    return result.json()
  })

export const useApiCall = (key: string, fetcher: any = fetchCall) => {
  const { data: d, error } = useSWRWrapper(key, fetcher)
  const data = useTransition(d)

  return useMemo(() => {
    return { data, error }
  }, [data, error])
}

export const useTransition = (data: any) => {
  const [prev, setPrev] = useState(() => data)

  useEffect(() => {
    if (data) {
      setPrev((state: any) => {
        if (state && data && isEqual(data, state)) {
          return state
        }

        return data
      })
    }
  }, [data])

  return prev
}
