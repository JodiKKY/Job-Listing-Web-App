import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Footer from '../component/Footer/Footer'

function Layout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default Layout