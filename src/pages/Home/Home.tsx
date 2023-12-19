import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const Header = styled(Container)`
  gap: 30px;
`

const PageWrapper = styled(Container)`
  flex: 1;
  justify-content: center;
  gap: 50px;
  margin: auto;
  margin-bottom: 100px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    justify-content: space-between;
     padding-top: 64px;
  `};
`

export default function Home() {
  return (
    <PageWrapper>
      <Header>
        <Container>Welcome to Home!</Container>
      </Header>
    </PageWrapper>
  )
}
