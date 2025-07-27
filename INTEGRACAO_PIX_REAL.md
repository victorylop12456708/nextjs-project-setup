# 🏦 Integração PIX Real - Guia Completo

## 🎯 **Como Funciona a Verificação Real de Pagamento**

### **Opção 1: Mercado Pago (Recomendado)**

#### 1. Criar Conta no Mercado Pago
- Acesse: https://www.mercadopago.com.br/developers
- Crie uma conta de desenvolvedor
- Obtenha suas credenciais (Access Token)

#### 2. Instalar SDK
```bash
npm install mercadopago
```

#### 3. Configurar Variáveis de Ambiente
```env
# .env.local
PIX_KEY=seuemail@gmail.com
MERCHANT_NAME=Seu Nome
MERCHANT_CITY=SUA CIDADE

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADO_PAGO_PUBLIC_KEY=sua_public_key_aqui
```

#### 4. Modificar API de Geração PIX
```javascript
// src/app/api/generate-pix/route.ts
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

export async function POST(request: Request) {
  const { amount, description } = await request.json();
  
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
  
  return NextResponse.json({
    success: true,
    paymentId: result.id,
    pixCode: result.point_of_interaction.transaction_data.qr_code,
    qrCodeUrl: result.point_of_interaction.transaction_data.qr_code_base64,
    amount: result.transaction_amount,
    expiresIn: 300
  });
}
```

#### 5. Configurar Webhook (Verificação Automática)
```javascript
// src/app/api/webhook/mercadopago/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  if (body.type === 'payment') {
    const paymentId = body.data.id;
    
    // Buscar detalhes do pagamento
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });
    
    if (paymentData.status === 'approved') {
      // Pagamento aprovado!
      // Atualizar banco de dados
      // Notificar usuário
      // Liberar conteúdo
    }
  }
  
  return NextResponse.json({ received: true });
}
```

---

### **Opção 2: PagSeguro**

#### 1. Criar Conta PagSeguro
- Acesse: https://dev.pagseguro.uol.com.br/
- Obtenha suas credenciais

#### 2. Instalar SDK
```bash
npm install pagseguro-nodejs-sdk
```

#### 3. Configuração
```env
PAGSEGURO_EMAIL=seu@email.com
PAGSEGURO_TOKEN=seu_token_aqui
```

---

### **Opção 3: Stripe (PIX)**

#### 1. Configurar Stripe
```bash
npm install stripe
```

#### 2. Configuração
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🔄 **Fluxos de Verificação**

### **Método 1: Webhook (Automático - Recomendado)**
1. Cliente faz pagamento PIX
2. Provedor (Mercado Pago) detecta pagamento
3. Provedor envia webhook para sua API
4. Sua API verifica e libera conteúdo automaticamente

### **Método 2: Polling (Manual)**
1. Cliente faz pagamento PIX
2. Cliente clica "Já Paguei"
3. Sua API consulta provedor para verificar status
4. Se pago, libera conteúdo

### **Método 3: Híbrido (Melhor UX)**
- Webhook para verificação automática
- Botão "Já Paguei" como backup
- Polling a cada 5 segundos enquanto aguarda

---

## 💰 **Custos e Taxas**

### **Mercado Pago:**
- PIX: 0,99% por transação
- Sem taxa fixa
- Recebimento em 1 dia útil

### **PagSeguro:**
- PIX: 1,99% por transação
- Sem taxa fixa
- Recebimento em 1 dia útil

### **Stripe:**
- PIX: 3,99% + R$ 0,40 por transação
- Recebimento em 2 dias úteis

---

## 🛡️ **Segurança**

### **Validações Importantes:**
1. **Verificar valor**: Confirmar se valor pago = valor esperado
2. **Verificar destinatário**: Confirmar se PIX foi para sua chave
3. **Evitar duplicação**: Verificar se pagamento já foi processado
4. **Logs**: Registrar todas as transações
5. **Timeout**: Expirar PIX após tempo limite

### **Exemplo de Validação:**
```javascript
// Verificar se pagamento é válido
if (
  paymentData.status === 'approved' &&
  paymentData.transaction_amount === expectedAmount &&
  paymentData.payment_method_id === 'pix'
) {
  // Pagamento válido - liberar conteúdo
}
```

---

## 🚀 **Implementação Rápida (Mercado Pago)**

### **1. Obter Credenciais:**
- Acesse: https://www.mercadopago.com.br/developers/panel/app
- Crie uma aplicação
- Copie o Access Token

### **2. Configurar Webhook:**
- URL: `https://seudominio.com/api/webhook/mercadopago`
- Eventos: `payment`

### **3. Testar:**
- Use credenciais de teste primeiro
- Faça pagamentos de teste
- Verifique se webhook funciona

### **4. Produção:**
- Troque para credenciais de produção
- Configure domínio real
- Monitore transações

---

## 📱 **Fluxo do Usuário Final**

1. **Usuário clica "Pagar com PIX"**
2. **Sistema gera PIX real via Mercado Pago**
3. **Usuário escaneia QR Code no app do banco**
4. **Usuário confirma pagamento (R$ 0,50)**
5. **Mercado Pago detecta pagamento**
6. **Webhook notifica sua aplicação**
7. **Sistema libera conteúdo automaticamente**
8. **Usuário vê análise completa**

---

## ⚡ **Próximos Passos**

1. **Escolher provedor** (recomendo Mercado Pago)
2. **Criar conta de desenvolvedor**
3. **Obter credenciais de teste**
4. **Implementar integração**
5. **Configurar webhook**
6. **Testar com pagamentos reais**
7. **Migrar para produção**

---

## 🆘 **Suporte**

- **Mercado Pago**: https://www.mercadopago.com.br/developers/pt/support
- **PagSeguro**: https://dev.pagseguro.uol.com.br/docs
- **Stripe**: https://stripe.com/docs

---

## 💡 **Dica Importante**

Para começar rapidamente, recomendo:
1. **Usar Mercado Pago** (mais fácil para PIX)
2. **Começar com webhook** (melhor UX)
3. **Testar com R$ 0,01** primeiro
4. **Implementar logs detalhados**
5. **Ter backup manual** (botão "Já Paguei")
