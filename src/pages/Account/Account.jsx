import React, { useEffect } from 'react'
import MyProfile from '../../components/Account/MyProfile'

const Account = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
        <MyProfile/>
    </div>
  )
}

export default Account