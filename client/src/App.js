import FormInput from "./components/FormInput";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<FormInput />} />
      </Routes>
    </div>
  );
}

export default App;
