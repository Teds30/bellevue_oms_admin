import { useState } from 'react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLayout from './components/layouts/AdminLayout'
import Permissions from './pages/Permission/Permissions'
import Departments from './pages/Department/Departments'

function App() {
    let routes = (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                {/* <Route index element={<Navigate replace to="/permissions" />} /> */}
                <Route path="/permissions" element={<Permissions />} />
                <Route path="/departments" element={<Departments />} />
            </Route>
        </Routes>
    )

    return routes
}

export default App
