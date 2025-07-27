# 🏦 Integração PIX - Efí Bank e Will Bank

## 💳 **Efí Bank (Gerencianet)**

### **Vantagens:**
- ✅ API PIX robusta e bem documentada
- ✅ Taxas competitivas (0,99% por transação PIX)
- ✅ SDK oficial para Node.js
- ✅ Webhook automático
- ✅ Suporte técnico em português
- ✅ Homologado pelo Banco Central

### **1. Configuração Inicial**

#### Instalar SDK:
```bash
npm install sdk-node-apis-efi
```

#### Variáveis de Ambiente:
```env
# .env.local
PIX_KEY=seuemail@gmail.com
MERCHANT_NAME=Seu Nome
MERCHANT_CITY=SUA CIDADE

# Efí Bank
EFI_CLIENT_ID=Client_Id_seu_client_id
EFI_CLIENT_SECRET=Client_Secret_seu_client_secret
EFI_CERTIFICATE_PATH=./certificados/producao.p12
EFI_SANDBOX=false
```

#### Obter Credenciais:
1. Acesse: https://sejaefi.com.br/
2. Crie uma conta
3. Vá em "API" > "Minhas Aplicações"
4. Crie uma aplicação PIX
5. Baixe o certificado (.p12)
6. Copie Client ID e Client Secret

### **2. Implementação**

#### Gerar PIX (Efí Bank):
```javascript
// src/app/api/generate-pix-efi/route.ts
import { NextResponse } from 'next/server'
import EfiPay from 'sdk-node-apis-efi'

const options = {
  client_id: process.env.EFI_CLIENT_ID,
  client_secret: process.env.EFI_CLIENT_SECRET,
  certificate: process.env.EFI_CERTIFICATE_PATH,
  sandbox: process.env.EFI_SANDBOX === 'true'
}

export async function POST(request: Request) {
  try {
    const { amount, description } = await request.json()
    
    const efipay = new EfiPay(options)
    
    // Criar cobrança PIX
    const body = {
      calendario: {
        expiracao: 300 // 5 minutos
      },
      devedor: {
        nome: 'Usuario App',
        cpf: '12345678901'
      },
      valor: {
        original: amount.toFixed(2)
      },
      chave: process.env.PIX_KEY,
      solicitacaoPagador: description
    }
    
    const response = await efipay.pixCreateImmediateCharge([], body)
    
    if (response.txid) {
      // Gerar QR Code
      const qrCodeResponse = await efipay.pixGenerateQRCode({
        id: response.loc.id
      })
      
      return NextResponse.json({
        success: true,
        paymentId: response.txid,
        pixCode: qrCodeResponse.qrcode,
        qrCodeUrl: `data:image/png;base64,${qrCodeResponse.imagemQrcode}`,
        amount: parseFloat(body.valor.original),
        expiresIn: 300
      })
    }
    
  } catch (error) {
    console.error('Erro Efí Bank:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao gerar PIX' },
      { status: 500 }
    )
  }
}
```

#### Webhook Efí Bank:
```javascript
// src/app/api/webhook/efi/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (body.pix && body.pix.length > 0) {
      const pixData = body.pix[0]
      
      if (pixData.tipo === 'PIX_RECEBIDO') {
        const txid = pixData.txid
        const valor = pixData.valor
        
        // Pagamento recebido!
        console.log(`PIX recebido: ${valor} - TXID: ${txid}`)
        
        // Atualizar status no banco
        // Liberar conteúdo
        // Notificar usuário
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro webhook Efí:', error)
    return NextResponse.json({ error: 'Erro' }, { status: 500 })
  }
}
```

---

## 🏦 **Will Bank**

### **Vantagens:**
- ✅ Banco digital moderno
- ✅ API PIX disponível
- ✅ Taxas competitivas
- ✅ Interface moderna
- ✅ Suporte para desenvolvedores

### **1. Configuração Will Bank**

#### Variáveis de Ambiente:
```env
# Will Bank
WILL_BANK_API_KEY=sua_api_key_aqui
WILL_BANK_SECRET=seu_secret_aqui
WILL_BANK_SANDBOX=false
```

#### Obter Credenciais:
1. Acesse: https://willbank.com.br/
2. Crie uma conta empresarial
3. Solicite acesso à API PIX
4. Obtenha suas credenciais de desenvolvedor

### **2. Implementação Will Bank**

#### Gerar PIX (Will Bank):
```javascript
// src/app/api/generate-pix-will/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { amount, description } = await request.json()
    
    const willBankPayload = {
      amount: amount,
      description: description,
      pix_key: process.env.PIX_KEY,
      expiration_minutes: 5
    }
    
    const response = await fetch('https://api.willbank.com.br/v1/pix/charge', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WILL_BANK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(willBankPayload)
    })
    
    const data = await response.json()
    
    if (data.success) {
      return NextResponse.json({
        success: true,
        paymentId: data.charge_id,
        pixCode: data.pix_code,
        qrCodeUrl: data.qr_code_image,
        amount: data.amount,
        expiresIn: 300
      })
    }
    
  } catch (error) {
    console.error('Erro Will Bank:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao gerar PIX' },
      { status: 500 }
    )
  }
}
```

---

## 📊 **Comparação de Provedores**

| Provedor | Taxa PIX | Facilidade | Documentação | Suporte |
|----------|----------|------------|--------------|---------|
| **Efí Bank** | 0,99% | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Will Bank** | 1,49% | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Mercado Pago** | 0,99% | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **PagSeguro** | 1,99% | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎯 **Recomendação**

### **Para seu caso (R$ 0,50 por transação):**

1. **🥇 Efí Bank** - Melhor opção
   - Taxa baixa (0,99%)
   - Documentação excelente
   - SDK oficial Node.js
   - Suporte em português

2. **🥈 Mercado Pago** - Segunda opção
   - Taxa baixa (0,99%)
   - Muito fácil de implementar
   - Grande comunidade

3. **🥉 Will Bank** - Terceira opção
   - Banco moderno
   - API boa, mas menos documentação

---

## 🚀 **Implementação Rápida (Efí Bank)**

### **Passo a Passo:**

1. **Criar conta Efí Bank**
2. **Solicitar API PIX**
3. **Baixar certificado**
4. **Instalar SDK: `npm install sdk-node-apis-efi`**
5. **Configurar variáveis de ambiente**
6. **Implementar geração de PIX**
7. **Configurar webhook**
8. **Testar com valores baixos**

### **Custos Reais:**
- **Transação R$ 0,50**: Taxa de R$ 0,005 (0,99%)
- **Você recebe**: R$ 0,495
- **Recebimento**: 1 dia útil

---

## 💡 **Dica Importante**

Para começar rapidamente com **Efí Bank**:

1. **Ambiente Sandbox** primeiro (gratuito)
2. **Testar com R$ 0,01**
3. **Configurar webhook**
4. **Migrar para produção**
5. **Monitorar transações**

O Efí Bank tem a melhor documentação e SDK para Node.js, sendo ideal para seu projeto!
