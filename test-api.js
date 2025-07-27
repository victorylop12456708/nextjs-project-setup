// Teste da API de análise
const testAPI = async () => {
  const testData = {
    textoPessoaA: "Eu sempre tento ser compreensivo e ouvir você, mas sinto que você não valoriza meus esforços. Quando chego em casa cansado do trabalho, gostaria de um pouco de carinho e compreensão. Não estou pedindo muito, só quero que reconheça que também tenho sentimentos.",
    textoPessoaB: "Eu entendo que você trabalha muito, mas eu também tenho minhas responsabilidades em casa. Cuido da casa, das crianças, e ainda trabalho. Às vezes preciso de ajuda e quando peço, você parece irritado. Só quero que sejamos uma equipe de verdade."
  }

  try {
    const response = await fetch('http://localhost:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()
    console.log('Resposta da API:')
    console.log(result.iaResponse)
  } catch (error) {
    console.error('Erro:', error)
  }
}

testAPI()
