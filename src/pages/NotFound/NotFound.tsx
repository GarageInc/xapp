import { useIsMobileDevice } from 'components/blocks/Header'
import { ButtonRedStyle } from 'components/Button'
import { Paths } from 'constants/paths'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

import IconZOO from '../../assets/svg/token.svg'

const Image = styled.img`
  max-width: 510px;
  width: 100%;
  padding: 0 75px;
`

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

export default function NotFound() {
  const isMobile = useIsMobileDevice()

  const Title = isMobile ? ThemedText.LargeHeader : ThemedText.Hero
  const Paragraph = isMobile ? ThemedText.HeadlineMedium : ThemedText.HeadlineLarge

  return (
    <PageWrapper>
      <Header>
        <Container>
          <Title>404</Title>
          <Paragraph color="neutral2">
            <>Page not found!</>
          </Paragraph>
        </Container>
        <Image src={IconZOO} alt="Liluni" />
      </Header>

      <ButtonRedStyle width="400px" as={Link} to={Paths.HOME}>
        <>Oops, take me back to Home</>
      </ButtonRedStyle>
    </PageWrapper>
  )
}
