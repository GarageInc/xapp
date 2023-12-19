import { Dots } from 'pages/Pool/styleds'

const Loading = ({ children, loading }: { children: any; loading?: boolean }) => {
  if (!loading) {
    return children
  } else {
    return (
      <Dots>
        <>Loading</>
      </Dots>
    )
  }
}

export default Loading
