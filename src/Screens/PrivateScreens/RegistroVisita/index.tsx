import { useState } from 'react';
import '@styles/global.scss';
import '@styles/registroVisita.scss';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { registerVisita } from '../../../services/beneficiaries/visitApi';

const RegistroVisita = () => {
    const navigate = useNavigate();

    const [nomeBeneficiario, setNomeBeneficiario] = useState(''); 
    const [nomeVoluntario, setNomeVoluntario] = useState(''); 
    const [relatorio, setRelatorio] = useState('');
    const [dropdown1, setDropdown1] = useState('');
    const [imagem, setImagem] = useState(null);

    const createVisita = async () => {
        if (!nomeBeneficiario || !relatorio || !dropdown1) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            name: nomeBeneficiario,
            data: new Date().toISOString(), // Add appropriate date value
            nomeFamilia: nomeBeneficiario,
            relatorio,
            dropdown1,
            imagem,
            nomeVoluntario
        };

        try {
            await registerVisita(data);
            if(location.pathname.includes("dashboard")) {
                navigate('/dashboard/beneficiarios');
            } else {
                navigate('/beneficiarios');
            }
        } catch (err) {
            console.log('Erro durante o registro: ' + err);
        }
    };

    const resetForm = () => {
        setNomeBeneficiario('');
        setNomeVoluntario('');
        setRelatorio('');
        setDropdown1('');
        setImagem(null);
        if(location.pathname.includes("dashboard")) {
            navigate('/dashboard/beneficiarios');
        } else {
            navigate('/beneficiarios');
        }
    };

    return (
        <div className="registro-visita">
            <div>
                <Navbar />
            </div>
            <h1 className="subtitle">Registro de Visita</h1>
            <p className="description">
                Preencha os campos abaixo para registrar uma visita.
            </p>
            <div className="form-control">
                <div className="input-group">
                    <label>Nome Principal do Beneficiário:</label>
                    <input
                        type="text"
                        placeholder="Nome do Beneficiário"
                        value={nomeBeneficiario}
                        onChange={(e) => setNomeBeneficiario(e.target.value)}
                    />

                    <label>Nome dos Voluntários:</label>
                    <input
                        type="text"
                        placeholder="Nome dos Voluntários"
                        value={nomeVoluntario}
                        onChange={(e) => setNomeVoluntario(e.target.value)}
                    />

                    <label>Relatório:</label>
                    <textarea
                        placeholder="Digite seu relatório aqui..."
                        rows={5}
                        style={{ width: '100%' }}
                        value={relatorio}
                        onChange={(e) => setRelatorio(e.target.value)}
                    />
                </div>

                <div className="dropdown-button-group">
                    <div className="dropdown-group">
                        <label>Data da Visita</label>
                        <select value={dropdown1} onChange={(e) => setDropdown1(e.target.value)}>
                            <option value="">Selecione uma opção</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                    </div>

                    <div className="upload-group">
                        <label className="upload-label">Arraste para inserir imagens</label>
                        <div className="upload-area">
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input"
                            />
                            <span className="file-button">Escolher Arquivo</span>
                        </div>
                    </div>

                    <div className="button-group">
                        <button onClick={createVisita} className="button confirm-btn">CONFIRMAR</button>
                        <button onClick={resetForm} className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default RegistroVisita;
