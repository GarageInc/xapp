import { Dots } from 'pages/Pool/styleds'

const Loading = ({
  children,
  loading,
  loadingLabel = 'Loading',
}: {
  children: any
  loading?: boolean
  loadingLabel?: string
}) => {
  if (!loading) {
    return children
  } else {
    return <Dots>{loadingLabel}</Dots>
  }
}

export default Loading
