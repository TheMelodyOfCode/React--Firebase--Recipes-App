/** @jsxImportSource @emotion/react */ 

import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'

import { GrUserSettings } from 'react-icons/gr';
import { RiLogoutBoxRLine, RiContactsBook2Line } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';
import {TiDeleteOutline} from 'react-icons/ti'
import {FaSpinner} from 'react-icons/fa'
import {GrChapterAdd} from 'react-icons/gr'

// ### ICONS ###
const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}


function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '5rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

function AddIcon() {
    return (
        <span
            style={{
              color: 'red',
              fontSize: '2rem',
        }}
        >
        <GrChapterAdd />
        </span>  
    )
  }

function DeleteIcon() {
    return (
        <span
            style={{
              color: 'red',
              fontSize: '2rem',
        }}
        >
        <TiDeleteOutline />
        </span>  
    )
  }

function FoodIcon() {
    return (
        <span
            style={{
            fontSize: '2.8rem',
        }}
        >
        <IoFastFoodOutline />
        </span>  
    )
  }

function SettingsIcon() {
    return (
        <span
            style={{
            fontSize: '2.7rem',
        }}
        >
        <GrUserSettings />
        </span>  
    )
  }

function LogoutIcon() {
    return (
        <span
            style={{
            fontSize: '2.7rem',
        }}
        >
        <RiLogoutBoxRLine />
        </span>  
    )
  }

function ContactIcon() {
    return (
        <span
            style={{
            fontSize: '2.7rem',
        }}
        >
        <RiContactsBook2Line />
        </span>  
    )
  }



  export {
    FullPageSpinner,
    FoodIcon,
    SettingsIcon,
    LogoutIcon,
    ContactIcon,
    DeleteIcon,
    AddIcon,
}