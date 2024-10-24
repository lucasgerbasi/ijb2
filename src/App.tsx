import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRouter from "./components/PrivateRouter";

const ToastOptions = {
  style: {
    fontSize: "16px",
  },
  success: {
    duration: 3000,
  },
  error: {
    duration: 3000,
  },
};

// Principais rotas
import LandingPage from "./Screens/PublicScreens/LandingPage";
import DashboardPage from "./Screens/PrivateScreens/Dashboard";

// Telas publicas
import { Main } from "./components/Main";
import { Contact } from "./Screens/PublicScreens/Contact";
import { About } from "./Screens/PublicScreens/About";
import { Voluntarios } from "./Screens/PublicScreens/Voluntarios";
import { Beneficiarios } from "./Screens/PublicScreens/Beneficiarios";
import { Projetos } from "./Screens/PublicScreens/Projetos";
import { Blog } from "./Screens/PublicScreens/Blog";

// Login
import { Login } from "./Screens/Login";

// Telas privadas
import { Home } from "./Screens/PrivateScreens/Home";
import { Noticias } from "./Screens/PrivateScreens/Noticias";
import { Perfil } from "./Screens/PrivateScreens/Perfil";
import { StorageHome } from "./Screens/PrivateScreens/Estoque/StorageHome";
import { BeneficiariosMain } from "./Screens/PrivateScreens/BeneficiariosMain";
import AtualizarInformacoes from "./Screens/PrivateScreens/AtualizarInformacoes";
import Registro from "./Screens/PrivateScreens/RegistroBeneficiario";
import AtualizarInformacoesVisitas from "./Screens/PrivateScreens/atualizarInformacoesVisitas";
import RegistroVisita from "./Screens/PrivateScreens/RegistroVisita";
import VisualizarInfo from "./Screens/PrivateScreens/VisualizarInfo";

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={ToastOptions} />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Main />} />
          <Route path="contatos" element={<Contact />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="noticias" element={<Blog />} />
          <Route path="sobre" element={<About />} />
          <Route path="voluntarios" element={<Voluntarios />} />
          <Route path="beneficiarios" element={<Beneficiarios />} />
        </Route>

        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas - Dashboard */}
        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<Home />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="estoque" element={<StorageHome />} />
            <Route path="beneficiarios" element={<BeneficiariosMain />} />
            <Route path="atualizar/:familiaId" element={<AtualizarInformacoes />} />
            <Route path="registro" element={<Registro />} />
            <Route path="visitas/:id" element={<AtualizarInformacoesVisitas />} /> 
            <Route path="registroVisita" element={<RegistroVisita />} />
            <Route path="visualizar" element={<VisualizarInfo />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
