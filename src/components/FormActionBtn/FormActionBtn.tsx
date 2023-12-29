import ImgGasTracker from 'components/icons/gas'
import Loading from 'components/Loading'
import { Row, RowGapped } from 'components/Row'
import { ITxTemplateInfo, useEstimatesGasValue } from 'components/TransactionInfo/TransactionInfo'
import { useMemo } from 'react'
import { TYPE } from 'theme/theme'
import { formatDecimal } from 'utils/numberWithCommas'

export const FormActionBtn = ({
  pending,
  txInfo,
  labelInProgress,
  labelActive,
}: {
  pending: boolean
  txInfo: ITxTemplateInfo
  labelActive: string
  labelInProgress: string
}) => {
  const estimatedGas = useEstimatesGasValue(txInfo)

  const [integer, decimals] = useMemo(() => {
    return formatDecimal(estimatedGas, 2, 5).split('.')
  }, [estimatedGas])

  return (
    <Loading loading={pending} loadingLabel={labelInProgress}>
      <RowGapped justify="center" gap="10px">
        {labelActive}
        <RowGapped width="fit-content" gap="5px">
          <ImgGasTracker />
          <RowGapped gap="4px">
            <Row align="flex-end">
              <TYPE.body color="light">{integer}</TYPE.body>
              <TYPE.body fontSize="11px" color="light">{`.${decimals}`}</TYPE.body>
            </Row>
          </RowGapped>
        </RowGapped>
      </RowGapped>
    </Loading>
  )
}
