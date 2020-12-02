import * as React from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MobileNavbar from './MovileNavbar'
import Image from 'next/image'

const PageHeader = () => {
  const [show, setShow] = useState(false)
  const { route } = useRouter()

  useEffect(() => {
    setShow(false)
  }, [route])

  const toggleNavbar = () => setShow(!show)

  return (
    <>
      <header className="flex flex justify-between p-4 bg-primary-main">
        <div className="w-auto">
          <Link href="/">
            <a href="/">
              <Image
                width={337}
                height={36}
                src="/logo.png"
                alt="TraspasaTuCoche.com - Traspasos de vehiculos online"
                style={{ float: 'left', cursor: 'pointer' }}
              />
            </a>
          </Link>
        </div>

        <div className="flex sm:hidden w-1/4 justify-end items-center">
          <a href="#" onClick={toggleNavbar}>
            <Icon
              path={mdiMenu}
              size={1.5}
              className="text-white hover:text-secondary-main"
            />
          </a>
        </div>
        <div
          className={`hidden sm:flex flex-grow flex justify-end content-center pl-8`}
        >
          <Navbar />
        </div>
      </header>
      {show && (
        <div
          className={`block sm:hidden w-full absolute h-screen z-20 bg-primary-main bg-opacity-50 right-0`}
        >
          <div
            className={`block sm:hidden w-full sm:w-1/2 flex content-start absolute h-screen z-20 bg-primary-main right-0`}
            style={{ maxWidth: '70%', maxHeight: 'calc(100vh)' }}
          >
            <MobileNavbar toggleNavbar={toggleNavbar} />
          </div>
        </div>
      )}
    </>
  )
}

export default PageHeader
