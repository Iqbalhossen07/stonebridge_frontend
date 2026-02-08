import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Frontend Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import SponsorChecker from "./pages/SponsorChecker";
import EligibleOccupations from "./pages/EligibleOccupations";
import Gallery from "./pages/Gallery";
import VideoPage from "./pages/VideoPage";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import TeamPage from "./pages/TeamPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import ApplicationGuidance from "./pages/ApplicationGuidance";

// Admin Pages & Layout
import AdminLayout from "./components/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Team from "./pages/admin/team/Team";
import AddTeamMember from "./pages/admin/team/AddTeamMember";
import TeamMemberView from "./pages/admin/team/TeamMemberView";
import GalleryPage from "./pages/admin/gallery/GalleryPage";
import VideoGallery from "./pages/admin/videos/VideoGallery";
import AddVideo from "./pages/admin/videos/AddVideo";
import BlogsPage from "./pages/admin/blogs/BlogsPage";
import AddBlog from "./pages/admin/blogs/AddBlog";
import BlogView from "./pages/admin/blogs/BlogView";
import Testimonials from "./pages/admin/testimonial/Testimonials";
import AddTestimonial from "./pages/admin/testimonial/AddTestimonial";
import TestimonialView from "./pages/admin/testimonial/TestimonialView";
import MyProfile from "./pages/admin/profile/MyProfile";
import ContactQueries from "./pages/admin/messages/ContactQueries";
import Appointments from "./pages/admin/Appointments/Appointments";
import Services from "./pages/admin/services/Services";
import AddSubService from "./pages/admin/services/AddSubService";
import SubServiceView from "./pages/admin/services/SubServiceView";
import EditTeamMember from "./pages/admin/team/EditTeamMember";
import EditVideo from "./pages/admin/videos/EditVideo";
import EditBlog from "./pages/admin/blogs/EditBlog";
import EditTestimonial from "./pages/admin/testimonial/EditTestimonial";
import EditSubService from "./pages/admin/services/EditSubService";
import Login from "./pages/admin/login/Login";
import ProtectedRoute from "./pages/admin/protected/ProtectedRoute";

// এই কম্পোনেন্টটি ডিসাইড করবে কখন Navbar/Footer দেখাবে
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {/* যদি ইউআরএল /admin দিয়ে শুরু না হয়, তবেই কেবল সাধারণ Navbar দেখাবে */}
      {!isAdminPath && <Navbar />}

      <Routes>
        {/* --- Frontend Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team-details/:id" element={<TeamDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/sponsor-checker" element={<SponsorChecker />} />
        <Route path="/eligible-occupation" element={<EligibleOccupations />} />
        <Route path="/application-guidance" element={<ApplicationGuidance />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- Admin Routes (Wrapped in AdminLayout) --- */}
   
  {/* পাবলিক রাউট */}
  <Route path="/login" element={<Login />} />

  {/* প্রোটেক্টেড অ্যাডমিন রাউটস - সবগুলো একসাথে */}
  <Route 
    path="/admin/*" 
    element={
      <ProtectedRoute>
        {/* এই লেভেলের ভেতরে সব অ্যাডমিন রাউট থাকবে */}
        <Routes>
          <Route path="dashboard" element={
            <AdminLayout name="Admin User" image="admin.png"><Dashboard /></AdminLayout>
          } />

          {/* টিম মেম্বার রুটস */}
          <Route path="team" element={
            <AdminLayout name="team" image="admin.png"><Team /></AdminLayout>
          } />
          <Route path="add-team" element={
            <AdminLayout name="add team member" image="admin.png"><AddTeamMember /></AdminLayout>
          } />
          <Route path="edit-team/:id" element={
            <AdminLayout name="Edit team member" image="admin.png"><EditTeamMember /></AdminLayout>
          } />
          <Route path="team-view/:id" element={
            <AdminLayout name="view team member" image="admin.png"><TeamMemberView /></AdminLayout>
          } />

          {/* গ্যালারি ও ভিডিও */}
          <Route path="gallery" element={
            <AdminLayout name="gallery" image="admin.png"><GalleryPage /></AdminLayout>
          } />
          <Route path="videos" element={
            <AdminLayout name="videos" image="admin.png"><VideoGallery /></AdminLayout>
          } />
          <Route path="add-video" element={
            <AdminLayout name="add-video" image="admin.png"><AddVideo /></AdminLayout>
          } />
          <Route path="edit-video/:id" element={
            <AdminLayout name="edit-video" image="admin.png"><EditVideo /></AdminLayout>
          } />

          {/* ব্লগ সেকশন */}
          <Route path="blogs" element={
            <AdminLayout name="blogs" image="admin.png"><BlogsPage /></AdminLayout>
          } />
          <Route path="add-blog" element={
            <AdminLayout name="add-blog" image="admin.png"><AddBlog /></AdminLayout>
          } />
          <Route path="edit-blog/:id" element={
            <AdminLayout name="edit-blog" image="admin.png"><EditBlog /></AdminLayout>
          } />
          <Route path="blog-view/:id" element={
            <AdminLayout name="blog-view" image="admin.png"><BlogView /></AdminLayout>
          } />

          {/* টেস্টিমোনিয়াল */}
          <Route path="testimonials" element={
            <AdminLayout name="testimonials" image="admin.png"><Testimonials /></AdminLayout>
          } />
          <Route path="add-testimonial" element={
            <AdminLayout name="add-testimonial" image="admin.png"><AddTestimonial /></AdminLayout>
          } />
          <Route path="edit-testimonial/:id" element={
            <AdminLayout name="edit-testimonial" image="admin.png"><EditTestimonial /></AdminLayout>
          } />
          <Route path="testimonial-view/:id" element={
            <AdminLayout name="testimonial-view" image="admin.png"><TestimonialView /></AdminLayout>
          } />

          {/* প্রোফাইল ও মেসেজ */}
          <Route path="my-profile" element={
            <AdminLayout name="my-profile" image="admin.png"><MyProfile /></AdminLayout>
          } />
          <Route path="messages" element={
            <AdminLayout name="messages" image="admin.png"><ContactQueries /></AdminLayout>
          } />
          <Route path="appointments" element={
            <AdminLayout name="appointments" image="admin.png"><Appointments /></AdminLayout>
          } />

          {/* সার্ভিস ও সাব-সার্ভিস */}
          <Route path="services" element={
            <AdminLayout name="services" image="admin.png"><Services /></AdminLayout>
          } />
          <Route path="add-sub-service" element={
            <AdminLayout name="sub-service" image="admin.png"><AddSubService /></AdminLayout>
          } />
          <Route path="edit-sub-service/:id" element={
            <AdminLayout name="edit-sub-service" image="admin.png"><EditSubService /></AdminLayout>
          } />
          <Route path="sub-service-view/:id" element={
            <AdminLayout name="sub-service-view" image="admin.png"><SubServiceView /></AdminLayout>
          } />
        </Routes>
      </ProtectedRoute>
    } 
  />


      </Routes>

      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
