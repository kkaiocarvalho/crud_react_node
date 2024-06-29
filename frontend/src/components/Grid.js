import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

    // Função para lidar com a exclusão de um usuário
    const handleDelete = async (id) => {
        try {
            // Requisição DELETE para o backend para excluir o usuário com o ID especificado
            await axios.delete(`http://localhost:8800/${id}`);
            // Filtra o array de usuários para remover o usuário excluído
            const newArray = users.filter((user) => user.id !== id);
            // Atualiza o estado de usuários com o novo array filtrado
            setUsers(newArray);
            // Exibe um toast de sucesso após a exclusão
            toast.success("Usuário excluído com sucesso.");
        } catch (error) {
            // Exibe um toast de erro caso ocorra algum problema na exclusão
            toast.error("Erro ao excluir usuário.");
        }

        // Limpa o estado de edição
        setOnEdit(null);
    };

    // Função para lidar com a edição de um usuário
    const handleEdit = (item) => {
        // Define o usuário a ser editado usando o estado setOnEdit
        setOnEdit(item);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {/* Mapeia os usuários e renderiza cada um como uma linha na tabela */}
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%" onlyWeb>{item.fone}</Td>
                        <Td alignCenter width="5%">
                            {/* Ícone de edição para editar o usuário */}
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            {/* Ícone de lixeira para excluir o usuário */}
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
