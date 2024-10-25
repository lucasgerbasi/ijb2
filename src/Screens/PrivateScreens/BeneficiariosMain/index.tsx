import React, { useState, useEffect } from "react";
import "@styles/global.scss";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Beneficiario, getBeneficiarios } from "../../../services/beneficiaries/beneficiariesApi";
import { getVisitas } from "../../../services/beneficiaries/visitApi";

export const BeneficiariosMain = () => {
  const [activeTab, setActiveTab] = useState<'familias' | 'visitas'>('familias');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [familias, setFamilias] = useState<Beneficiario[]>([]);
  const [filteredFamilies, setFilteredFamilies] = useState<Beneficiario[]>([]);
  const [visitasData, setVisitasData] = useState<Visit[]>([]);

  const handleTabClick = (tab: 'familias' | 'visitas') => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const deleteFamilia = async (id: number) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
    if (!confirmDelete) return;

    try {
      await deleteFamilia(id)
      console.log('Item excluído com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao excluir item: " + err);
    }
  };

  const deleteVisita = async (id: number) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta visita?');
    if (!confirmDelete) return;
  
    try {
      await deleteVisita(id);
      console.log('Visita excluída com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao excluir visita: " + err);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value); // Atualiza o estado do termo de busca

    // Verifica se o campo de busca está vazio
    if (value.trim() === '') {
      setFilteredFamilies(familias); // Se vazio, mostra todas as famílias
    } else {
      // Filtra as famílias conforme o termo de busca nos nomes
      const filtered = familias.filter(item => 
        (typeof item.nomeFamilia === 'string' && item.nomeFamilia.toLowerCase().includes(value.toLowerCase())) 
      );
      
      // Log para depuração
      console.log("Famílias filtradas:", filtered);
      
      setFilteredFamilies(filtered);
    }
  };

  const fetchData = async () => {
    if (activeTab === 'familias') {
      try {
        const response = await getBeneficiarios();

        if(!response) {
          console.log('Erro ao buscar famílias');
          return;
        }

        console.log(response)
        setFamilias(response);
        setFilteredFamilies(response); // Atualiza o estado com as famílias recebidas
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
    if (activeTab === 'visitas') {
      try {
        const response = await getVisitas();

        if(!response) {
          console.log('Erro ao buscar visitas');
          return;
        }

        setVisitasData(response);
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const renderTableData = () => {
    if (activeTab === 'familias') {
      return filteredFamilies.map((item) => (
        <tr key={item.id}>
          <td>{item.nomeFamilia}</td>
          <td>
            <span>Status: {item.statusFamilia}</span>
          </td>
          <td>
            <button
              className="table-btn dados-btn"
              onClick={() => navigate(`/dashboard/atualizar/${item.id}`)}
            >
              DADOS
            </button>
            <button onClick={() => deleteFamilia(item.id!)} className="table-btn excluir-btn">EXCLUIR</button>
          </td>
        </tr>
      ));
    } else if (activeTab === 'visitas') {
      const filteredVisitas = visitasData.filter(item =>
        item?.nomeFamilia?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      return filteredVisitas.map((item) => (
        <tr key={item.id}>
          <td>{item.nomeFamilia}</td>
          <td>
            <span>Voluntário responsável: {item.nomeVoluntario}</span>
          </td>
          <td>
            <button
              className="table-btn dados-btn"
              onClick={() => navigate(`/dashboard/visitas/${item.id}`)}
            >
              DADOS
            </button>
            <button onClick={() => deleteVisita(item.id!)} className="table-btn excluir-btn">EXCLUIR</button>
          </td>
        </tr>
      ));
    }

    return null;
  };
  
  return (
    <div className="beneficiarios-page">
      <div>
        < Navbar />
      </div>
      <div className="dashboard-header">
        <div className="left-section">
          <h1 className="subtitle">Dashboard</h1>
          <p className="description">
            Visualize e gerencie as famílias cadastradas no programa de assistência habitacional.
          </p>
        </div>
        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar Família"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="buttons">
            <button className="btn registrar-btn" onClick={() => navigate('/dashboard/registro')}>Registrar Família</button>
            {activeTab === 'visitas' && (
              <button className="btn enviar-btn" onClick={() => navigate('/dashboard/registroVisita')}>Adicionar Visita</button>
            )}
            {activeTab === 'familias' && (
              <button className="btn enviar-btn" onClick={() => {}}>
                Enviar Para Assembleia
              </button>
            )}
          </div>
        </div>
      </div>
  
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'familias' ? 'active' : ''}`} onClick={() => handleTabClick('familias')}>Famílias</button>
        <button className={`tab-btn ${activeTab === 'visitas' ? 'active' : ''}`} onClick={() => handleTabClick('visitas')}>Visitas</button>
      </div>
  
      <div className="table-container">
        <table className="familias-table">
          <tbody>
            {renderTableData()}
          </tbody>
        </table>
      </div>
      <div>
        < Footer />
      </div>
    </div>
  );
}
