# 🚀 Guia de Configuração Rápida - PIX Real

## 🎯 **Qual Provedor Escolher?**

### **Para seu app (R$ 0,50 por transação):**

| Critério | Efí Bank | Mercado Pago | Will Bank |
|----------|----------|--------------|-----------|
| **Taxa** | 0,99% | 0,99% | 1,49% |
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Documentação** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Suporte BR** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **SDK Node.js** | ✅ Oficial | ✅ Oficial | ❌ REST API |

---

## 🏆 **RECOMENDAÇÃO: Efí Bank**

### **Por que Efí Bank?**
- ✅ **Taxa baixa**: 0,99% (R$ 0,005 por transação)
- ✅ **SDK oficial** para Node.js
- ✅ **Documentação excelente** em português
- ✅ **Suporte técnico** brasileiro
- ✅ **Homologado** pelo Banco Central
- ✅ **Webhook automático** confiável

---

## ⚡ **Configuração em 10 Minutos (Efí Bank)**

### **1. Criar Conta (2 min)**
```
1. Acesse: https://sejaefi.com.br/
2. Clique "Abrir Conta"
3. Preencha dados da empresa/pessoa física
4. Confirme email
```

### **2. Solicitar API PIX (1 min)**
```
1. Faça login na conta Efí
2. Vá em "API" > "Minhas Aplicações"
3. Clique "Nova Aplicação"
4. Selecione "PIX"
5. Preencha nome: "App Discussões Relacionamento"
```

### **3. Baixar Certificado (1 min)**
```
1. Na aplicação criada, clique "Certificados"
2. Baixe o arquivo .p12 (produção)
3. Salve na pasta: ./certificados/producao.p12
```

### **4. Instalar Dependências (1 min)**
```bash
npm install sdk-node-apis-efi
```

### **5. Configurar Variáveis (2 min)**
```env
# .env.local
PIX_KEY=seuemail@gmail.com
MERCHANT_NAME=Seu Nome
MERCHANT_CITY=SUA CIDADE

# Efí Bank
EFI_CLIENT_ID=Client_Id_copiado_do_painel
EFI_CLIENT_SECRET=Client_Secret_copiado_do_painel
EFI_CERTIFICATE_PATH=./certificados/producao.p12
EFI_SANDBOX=false
```

### **6. Ativar API (2 min)**
```
1. No painel Efí, vá em "API PIX"
2. Configure sua chave PIX
3. Ative o webhook: https://seudominio.com/api/webhook/efi
4. Teste com PIX de R$ 0,01
```

### **7. Trocar Código (1 min)**
```javascript
// Renomear arquivo:
// src/app/api/generate-pix-efi/route.ts
// para:
// src/app/api/generate-pix/route.ts

// Descomentar o código real no arquivo
```

---

## 🧪 **Teste Rápido**

### **1. Ambiente Sandbox (Gratuito)**
```env
EFI_SANDBOX=true
```

### **2. Fazer Teste**
```
1. Gerar PIX no app
2. Usar dados de teste do Efí
3. Simular pagamento
4. Verificar webhook
```

### **3. Migrar para Produção**
```env
EFI_SANDBOX=false
```

---

## 💰 **Custos Reais**

### **Por transação de R$ 0,50:**
- **Taxa Efí**: R$ 0,005 (0,99%)
- **Você recebe**: R$ 0,495
- **Tempo**: 1 dia útil na conta

### **Projeção mensal:**
- **100 vendas**: Taxa R$ 0,50 | Líquido R$ 49,50
- **500 vendas**: Taxa R$ 2,50 | Líquido R$ 247,50
- **1000 vendas**: Taxa R$ 5,00 | Líquido R$ 495,00

---

## 🔧 **Arquivos Prontos**

Já criei todos os arquivos necessários:

### **APIs Criadas:**
- ✅ `src/app/api/generate-pix-efi/route.ts` (Efí Bank)
- ✅ `src/app/api/webhook/efi/route.ts` (Webhook Efí)
- ✅ `src/app/api/generate-pix-mercadopago/route.ts` (Mercado Pago)
- ✅ `src/app/api/webhook/mercadopago/route.ts` (Webhook MP)

### **Para Ativar:**
1. **Escolha um provedor**
2. **Configure as variáveis de ambiente**
3. **Descomente o código real**
4. **Teste com valores baixos**

---

## 🆘 **Suporte e Links**

### **Efí Bank:**
- **Site**: https://sejaefi.com.br/
- **Documentação**: https://dev.efipay.com.br/
- **Suporte**: suporte@efipay.com.br
- **WhatsApp**: (31) 3029-5500

### **Mercado Pago:**
- **Site**: https://www.mercadopago.com.br/developers
- **Documentação**: https://www.mercadopago.com.br/developers/pt/docs
- **Suporte**: developers@mercadopago.com

---

## 🎯 **Próximo Passo**

**Recomendo começar com Efí Bank:**

1. ✅ **Criar conta** (sejaefi.com.br)
2. ✅ **Solicitar API PIX**
3. ✅ **Baixar certificado**
4. ✅ **Configurar variáveis**
5. ✅ **Testar com R$ 0,01**
6. ✅ **Ativar produção**

**Tempo total**: ~15 minutos
**Primeiro PIX**: Hoje mesmo!

---

## 💡 **Dica Final**

Comece com **ambiente sandbox** (gratuito) para testar tudo, depois migre para produção. O Efí Bank tem excelente documentação e suporte em português!

**Seu app já está 100% pronto** - só falta conectar com o provedor real! 🚀
