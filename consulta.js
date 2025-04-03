document.getElementById("CNPJFORM").addEventListener("submit", function(event) {
    event.preventDefault(); 
    let cnpjDigitado = document.getElementById("cnpj").value;
    
    
    cnpjDigitado = cnpjDigitado.replace(/[^\d]/g, ''); 

    
    if (cnpjDigitado.length === 14) {

        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjDigitado}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados retornados:', data);

                document.getElementById("resultadoCNPJ").textContent = `CNPJ: ${data.cnpj}`;
                document.getElementById("nome").textContent = `Razão Social: ${data.razao_social}`;
                document.getElementById("fantasia").textContent = `Nome Fantasia: ${data.nome_fantasia || "Não disponível"}`;
                document.getElementById("atividade").textContent = `Atividade Principal: ${data.cnae_fiscal_descricao}`;
                document.getElementById("logradouro").textContent = `Logradouro: ${data.logradouro}`;
                document.getElementById("bairro").textContent = `Bairro: ${data.bairro}`;
                document.getElementById("municipio").textContent = `Município: ${data.municipio}`;
                document.getElementById("uf").textContent = `UF: ${data.uf}`;
                document.getElementById("cnae").textContent = `CNAE: ${data.cnae_fiscal}`
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert("Erro ao consultar o CNPJ.");
            });
    } else {
        alert("CNPJ inválido. Certifique-se de inserir 14 dígitos.");
    }
});
