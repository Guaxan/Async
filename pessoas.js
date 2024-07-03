document.addEventListener('DOMContentLoaded', () => {
    const pessoasList = document.querySelector('#person-list tbody');
    const newPersonForm = document.getElementById('new-person-form');
    const validateIdForm = document.getElementById('validate-id-form');
    const updatePersonForm = document.getElementById('update-person-form');
    const deleteAllButton = document.getElementById('delete-all-button');

    async function ListPeople() { // listagem de pessoas
        try {
            const response = await fetch('https://personal-tp6a9zfc.outsystemscloud.com/Pessoas/rest/Pessoas/Pessoas');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const pessoas = await response.json();
            const pessoasOrdenadas = ordenarPorId(pessoas);

            pessoasList.innerHTML = '';

            pessoasOrdenadas.forEach(person => {
                const row = document.createElement('tr');

                const CelulaId = document.createElement('td');
                CelulaId.textContent = person.Id;
                row.appendChild(CelulaId);

                const CelulaNome = document.createElement('td');
                CelulaNome.textContent = person.Nome || 'Nome não disponível';
                row.appendChild(CelulaNome);

                const CelulaAcoes = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.addEventListener('click', () => DeletePerson(person.Id));
                CelulaAcoes.appendChild(deleteButton);
                row.appendChild(CelulaAcoes);

                pessoasList.appendChild(row);
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function ordenarPorId(pessoas) { // ordena em forma crescente por ID
        return pessoas.sort((a, b) => a.Id - b.Id);
    }

    async function DeletePerson(id) { // Deleta pessoa
        try {
            const response = await fetch(`https://personal-tp6a9zfc.outsystemscloud.com/Pessoas/rest/Pessoas/DeletePessoaById?PessoaId=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Pessoa deletada com sucesso!');
                ListPeople();
            } else {
                alert('Erro ao deletar pessoa!');
            }
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error);
        }
    }

    async function DeleteAllPeople() { // Deleta todas as pessoas
        try {
            const response = await fetch('https://personal-tp6a9zfc.outsystemscloud.com/Pessoas/rest/Pessoas/Pessoas');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const pessoas = await response.json();
            const deletePromises = pessoas.map(person => DeletePerson(person.Id));
            await Promise.all(deletePromises);

            alert('Todas as pessoas foram deletadas com sucesso!');
            ListPeople();
        } catch (error) {
            console.error('Erro ao deletar todas as pessoas:', error);
        }
    }

    async function AddPerson(newPerson) { // Adiciona pessoa
        try {
            const response = await fetch('https://personal-tp6a9zfc.outsystemscloud.com/Pessoas/rest/Pessoas/CreateOrUpdatePessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPerson)
            });

            if (response.ok) {
                alert('Pessoa cadastrada/Atualizada com sucesso!');
                ListPeople();
            } else {
                alert('Erro ao cadastrar pessoa!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar pessoa:', error);
        }
    }

    async function validatePersonID(id) { // Valida o ID da pessoa
        try {
            const response = await fetch(`https://personal-tp6a9zfc.outsystemscloud.com/Pessoas/rest/Pessoas/GetPessoaById?PessoaId=${id}`);

            if (response.ok) {
                const person = await response.json();
                return !!person;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro ao validar pessoa:', error);
            return false;
        }
    }

    newPersonForm.addEventListener('submit', async (event) => { // Cadastra Pessoa
        event.preventDefault();

        const newPerson = {
            Nome: event.target.name.value,
            DataNascimento: event.target.dob.value,
            CPF: event.target.cpf.value
        };

        await AddPerson(newPerson);
    });

    validateIdForm.addEventListener('submit', async (event) => { // Valida o ID
        event.preventDefault();

        const id = event.target.id.value;
        const isValidId = await validatePersonID(id);

        if (isValidId) {
            alert('ID válido! Por favor, insira os detalhes para atualização.');
            updatePersonForm.style.display = 'block';
            validateIdForm.style.display = 'none';
        } else {
            alert('ID inválido! Por favor, forneça um ID válido.');
        }
    });

    updatePersonForm.addEventListener('submit', async (event) => { // Atualiza Pessoa
        event.preventDefault();

        const id = document.getElementById('update-id').value;

        const newPerson = {
            ID: id,
            Nome: event.target.name.value,
            DataNascimento: event.target.dob.value,
            CPF: event.target.cpf.value
        };

        await AddPerson(newPerson);
    });

    deleteAllButton.addEventListener('click', async () => { // Deleta todas as pessoas
        const confirmation = confirm('Você tem certeza que deseja deletar todos os cadastros?');
        if (confirmation) {
            await DeleteAllPeople();
        }
    });

    ListPeople();
});
