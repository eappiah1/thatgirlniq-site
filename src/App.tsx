import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ClipRedirect from './pages/ClipRedirect'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clips/:clipId" element={<ClipRedirect />} />
    </Routes>
  )
}
