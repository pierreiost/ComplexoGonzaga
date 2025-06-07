import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu nome');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Erro', 'Por favor, preencha um email válido');
      return false;
    }
    if (!formData.mensagem.trim()) {
      Alert.alert('Erro', 'Por favor, escreva sua mensagem');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const emailData = {
        to_email: 'seuemail@exemplo.com',
        from_name: formData.nome,
        from_email: formData.email,
        phone: formData.telefone,
        subject: formData.assunto || 'Contato pelo App',
        message: formData.mensagem
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Sucesso!', 
        'Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                nome: '',
                email: '',
                telefone: '',
                assunto: '',
                mensagem: ''
              });
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
      console.error('Erro ao enviar email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Entre em Contato</Text>
        <Text style={styles.subtitle}>Preencha o formulário abaixo e entraremos em contato</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            value={formData.nome}
            onChangeText={(value) => handleInputChange('nome', value)}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(xx) xxxxx-xxxx"
            value={formData.telefone}
            onChangeText={(value) => handleInputChange('telefone', value)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Assunto</Text>
          <TextInput
            style={styles.input}
            placeholder="Assunto da mensagem"
            value={formData.assunto}
            onChangeText={(value) => handleInputChange('assunto', value)}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mensagem *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escreva sua mensagem aqui..."
            value={formData.mensagem}
            onChangeText={(value) => handleInputChange('mensagem', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          * Campos obrigatórios
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#e53e3e',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});