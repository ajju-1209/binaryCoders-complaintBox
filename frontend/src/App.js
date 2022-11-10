import SignUpScreen from "./Screens/signUpScreen";
import LoginScreen from "./Screens/loginScreen";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResidentScreen from "./Screens/residentScreen";
import ComplaintScreen from "./Screens/complaintScreen";
import ApproveScreen from "./Screens/approveScreen";
import WorkerScreen from "./Screens/workerScreen";
import AssignPending from "./Screens/AssignPending";
import AnnouncementScreen from './Screens/AnnouncementScreen';
import ServicesScreen from './Screens/ServicesScreen'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/signup" element={<SignUpScreen />} />
        <Route exact path="/resident/homePage" element={<ResidentScreen />} />
        <Route exact path="/admin/AssignPending" element={<AssignPending />} />
        <Route exact path="/admin/approveScreen" element={<ApproveScreen />} />
        <Route exact path="/resident/complaints" element={<ComplaintScreen />} />
        <Route exact path="/worker/complaints" element={<WorkerScreen />} />
        <Route exact path='/admin/announcementScreen' element={<AnnouncementScreen />} />
        <Route exact path='/admin/ServicesScreen' element={<ServicesScreen />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
