import IconArrowDown from 'assets/icons/arrow-down.svg'
import DropdownComp from 'react-dropdown'
import styled from 'styled-components'

const DropDown = styled(DropdownComp)`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;

  .Dropdown-control {
    width: 100%;
    padding: 0 0 0 25px;

    ${({ theme }) => theme.mediaWidth.upToPhone`
      padding-left: 12px;
      font-size: 15px;
    `};

    height: 100%;
    min-width: 240px;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.grey};
    border: 0;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;

    transition: background-color 0.3s;
    color: ${({ theme }) => theme.white};

    &:hover {
      color: ${({ theme }) => theme.text1};
    }
  }
  .Dropdown-arrow {
    top: 17px;
    right: 24px;
    background: url(${IconArrowDown}) 50% 50% / cover no-repeat;
    color: ${({ theme }) => theme.white};
    height: 15px;
    width: 15px;
    border: 0 !important;
  }

  &.is-open .Dropdown-arrow {
    transform: rotate(180deg) !important;
  }

  .Dropdown-menu {
    background-color: ${({ theme }) => theme.bg2};
    border: none;
    cursor: pointer;
    top: 105%;
    border-radius: 24px;
    font-weight: 500;
    line-height: 18px;
    font-size: 18px;

    box-shadow: 0px 15px 15px rgb(0 0 0 / 25%);
  }

  .Dropdown-option {
    text-align: center;
    padding: 15px 25px;
    color: ${({ theme }) => theme.text2};
    &:hover {
      background: #9998b8;
      color: #f8faff;
    }
  }

  .Dropdown-option.is-selected {
    color: ${({ theme }) => theme.white};
    background: #f64562;
  }

  .Dropdown-placeholder {
    margin-right: 32px;
  }
`

export default DropDown
