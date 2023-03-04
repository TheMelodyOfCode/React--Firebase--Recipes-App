
import { GrUserSettings } from 'react-icons/gr';
import { RiLogoutBoxRLine, RiContactsBook2Line } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';
import {TiDeleteOutline} from 'react-icons/ti'
import {FaSpinner} from 'react-icons/fa'

// ### ICONS ###

function FullPageSpinner() {
    return (
      <div
        style={{
          fontSize: '4em',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FaSpinner />
      </div>
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
}