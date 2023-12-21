import { Contract } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { ZERO } from 'utils/isZero'

import { useTransition } from './useApiCall'
import useBlockNumber from './useBlockNumber'
import usePrevious from './usePrevious'

export const useCallStaticMethod = (contract: Contract | null, method: string, deps: any[], params?: any) => {
  const [val, setValue] = useState(ZERO)
  const [loading, setLoading] = useState(false)

  const blockNumber = useBlockNumber()
  const previous = usePrevious(blockNumber)

  useEffect(() => {
    const fetch = async () => {
      if (!contract) {
        return
      }
      setLoading(true)
      try {
        const result = params
          ? await contract.callStatic[method](...deps, params)
          : await contract.callStatic[method](...deps)
        setValue(result)
      } catch (e) {
        console.error('useCallStaticMethod', deps, method, e)
      } finally {
        setLoading(false)
      }
    }

    if (contract && !deps.some((i) => i === undefined || i === null) && !loading && previous !== blockNumber) fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, method, contract, deps])

  const transitioned = useTransition(val)

  return { result: transitioned, loading: !transitioned && loading }
}

const useCallStaticMultiMethod = (contract: Contract | null, method: string, deps: any[], params?: any) => {
  const [val, setValue] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const blockNumber = useBlockNumber()

  const previous = usePrevious(blockNumber)

  useEffect(() => {
    const fetch = async () => {
      if (!contract) {
        return
      }
      setLoading(true)

      try {
        const result = await Promise.allSettled(deps.map((dep) => contract.callStatic[method](...dep, params)))

        // @ts-ignore
        setValue(result.map((i) => (i.status === 'fulfilled' ? i.value : ZERO)))
      } catch (e) {
        console.error('useCallStaticMultiMethod', e, method, deps)
      } finally {
        setLoading(false)
      }
    }

    if (contract && !deps.some((i) => i === undefined || i === null) && !loading && previous !== blockNumber) fetch()
  }, [method, contract, deps, loading, params, previous, blockNumber])

  return useMemo(() => ({ result: val, loading, params }), [val, loading, params])
}
