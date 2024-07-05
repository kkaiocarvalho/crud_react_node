import GlobalStyle from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]); // Estado para armazenar usuários

  const [onEdit, setOnEdit] = useState(null); // Estado para edição de usuário

  // Função assíncrona para buscar usuários do backend
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      // Ordena os usuários pelo nome antes de atualizar o estado
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      // Exibe um toast de erro em caso de falha na requisição
      toast.error("Erro ao buscar usuários: " + error.message);
    }
  };

  // Hook useEffect para buscar usuários ao montar o componente e quando setUsers é atualizado
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        {/* Componente Form para adicionar/editar usuários */}
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        {/* Componente Grid para exibir usuários em forma de tabela */}
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      {/* Container para exibir notificações de toast */}
      <ToastContainer autoClose={3000} position="bottom-left" />
      {/* Estilos globais */}
      <GlobalStyle />
    </>
  );
}

export default App;
