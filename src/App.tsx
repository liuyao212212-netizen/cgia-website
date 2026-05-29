import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import MembershipPage from './pages/MembershipPage/MembershipPage'
import NewsPage from './pages/NewsPage/NewsPage'
import PartnersPage from './pages/PartnersPage/PartnersPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ApplicationPage from './pages/ApplicationPage/ApplicationPage'
import MemberDetailPage from './pages/MemberDetailPage/MemberDetailPage'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="application" element={<ApplicationPage />} />
        <Route path="members/:id" element={<MemberDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
