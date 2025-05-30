import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { checkWasherLoggedIn } from '../services/auth.service';
import { useAppDispatch } from '../store/store';
import { reset } from '../store/auth/authSlice';



export default function routeGuardWasher(Component: any) {
  
  return (
    function WithAuth(props: any) {
      const isAuthenticated = checkWasherLoggedIn()
      const dispatch = useAppDispatch()
      useEffect(() => {
        if (!isAuthenticated) {
          dispatch(reset())
          return redirect('/auth/washer/login')
        }
      },)

      if (!isAuthenticated) {
        return null;
      }

      return <Component {...props} />
    }
  )
}