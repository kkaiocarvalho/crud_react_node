import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { toast } from 'react-toastify';

const FormContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef();

    // Efeito useEffect para preencher o formulário com os dados do usuário em edição
    useEffect(() => {
        if (onEdit) {
            const user = ref.current;
            // Preenche os campos do formulário com os dados do usuário em edição
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    // Função para lidar com o envio do formulário (adicionar ou editar usuário)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        // Validação simples para garantir que todos os campos estão preenchidos
        if (!user.nome.value || !user.email.value || !user.fone.value || !user.data_nascimento.value) {
            return toast.warn("Preencha todos os campos!");
        }

        // Se estiver em modo de edição, faz uma requisição PUT para atualizar o usuário
        if (onEdit) {
            try {
                await axios.put(`http://localhost:8800/${onEdit.id}`, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value
                });
                toast.success("Usuário atualizado com sucesso.");
            } catch (error) {
                toast.error("Erro ao atualizar usuário.");
            }
        } else { // Caso contrário, faz uma requisição POST para adicionar um novo usuário
            try {
                await axios.post("http://localhost:8800/", {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value
                });
                toast.success("Usuário criado com sucesso.");
            } catch (error) {
                toast.error("Erro ao criar usuário.");
            }
        }

        // Limpa os campos do formulário
        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";
        // Limpa o estado de edição
        setOnEdit(null);
        // Atualiza a lista de usuários após a adição ou edição
        getUsers();
    };

    return (
        <FormContainer ref={ref}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type='date' />
            </InputArea>

            <Button type='submit' onClick={handleSubmit}>SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
