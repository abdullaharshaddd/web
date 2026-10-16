import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import EventsList from './pages/EventsList'
import EventDetails from './pages/EventDetails'
import Categories from './pages/Categories'
import Upcoming from './pages/Upcoming'
import Login from './pages/Login'
import Register from './pages/Register'
import MyEvents from './pages/MyEvents'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
