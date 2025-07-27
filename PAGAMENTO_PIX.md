# 🏦 Sistema de Pagamento PIX - Discussões de Relacionamento

## 📋 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local`:

```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas informações:

```env
PIX_KEY=seuemail@exemplo.com
MERCHANT_NAME=Seu Nome ou Empresa
MERCHANT_CITY=SUA CIDADE
```

### 2. Tipos de Chave PIX Suportados

- **E-mail**: seuemail@exemplo.com
- **CPF**: 12345678901
- **CNPJ**: 12345678000195
- **Telefone**: +5511999999999
- **Chave Aleatória**: 123e4567-e12b-12d3-a456-426614174000

## 🔧 Como Funciona Atualmente

### Sistema Atual (Demonstração)
1. **Geração do PIX**: Cria código PIX EMV padrão
2. **QR Code**: Gerado automaticamente via API gratuita
3. **Verificação**: Simula aprovação após 30 segundos (para testes)
4. **Expiração**: PIX expira em 5 minutos

### Fluxo do Usuário
1. Usuário clica em "Pagar com PIX"
2. Sistema gera código PIX e QR Code
3. Usuário escaneia QR Code ou copia código
4. Usuário faz pagamento no app do banco
5. Usuário clica "Já Paguei - Verificar Pagamento"
6. Sistema verifica e libera conteúdo

## 🚀 Integração com Provedores Reais

### Opção 1: Mercado Pago

```bash
npm install mercadopago
```

```javascript
// Em src/app/api/generate-pix/route.ts
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

const payment = new Payment(client);

const body = {
  transaction_amount: amount,
  description: description,
  payment_method_id: 'pix',
  payer: {
    email: 'user@example.com',
  }
};

const result = await payment.create({ body });
```

### Opção 2: PagSeguro

```bash
npm install pagseguro-nodejs-sdk
```

### Opção 3: Stripe (PIX)

```bash
npm install stripe
```

## 📱 Testando o Sistema

### Teste Automático (Atual)
1. Gere um PIX
2. Aguarde 30 segundos
3. Clique "Já Paguei"
4. Sistema aprovará automaticamente

### Teste Manual
Acesse: `POST /api/check-payment/[paymentId]` para marcar como pago

## 🔒 Segurança e Produção

### Recomendações para Produção:

1. **Banco de Dados**: Substitua `global` por banco real
2. **Webhook**: Configure webhook do provedor
3. **Logs**: Implemente sistema de logs
4. **Validação**: Adicione validações robustas
5. **Rate Limiting**: Limite tentativas de pagamento
6. **HTTPS**: Use apenas em ambiente seguro

### Exemplo de Webhook (Mercado Pago):

```javascript
// src/app/api/webhook/mercadopago/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  if (body.type === 'payment') {
    const paymentId = body.data.id;
    // Verificar status do pagamento
    // Atualizar banco de dados
    // Notificar usuário
  }
}
```

## 💰 Valores e Taxas

### Taxas PIX (Referência):
- **Mercado Pago**: ~2.99% + R$ 0,40
- **PagSeguro**: ~3.49% + R$ 0,40
- **Stripe**: ~3.99% + R$ 0,40

### Configuração de Preços:
```javascript
// Ajustar em src/app/api/generate-pix/route.ts
const PRICE = 0.50; // R$ 0,50
```

## 🛠️ Personalização

### Alterar Tempo de Expiração:
```javascript
// Em generate-pix/route.ts
expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutos
```

### Alterar Tempo de Simulação:
```javascript
// Em check-payment/[paymentId]/route.ts
const isSimulatedPaid = timeElapsed > 60000 // 60 segundos
```

## 📞 Suporte

Para dúvidas sobre integração PIX:
- Mercado Pago: https://www.mercadopago.com.br/developers
- PagSeguro: https://dev.pagseguro.uol.com.br/
- Banco Central: https://www.bcb.gov.br/estabilidadefinanceira/pix

## ⚠️ Importante

- Este sistema está configurado para **demonstração**
- Para produção, integre com um provedor real
- Sempre teste em ambiente de sandbox primeiro
- Mantenha suas chaves de API seguras
- Configure webhooks para verificação automática
