// SocialButtons.tsx (Versão CSS Puro - Inline)
export default function SocialButtons() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // **Ajustado para 'column' para layout vertical**
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px', // **Aumentado o espaçamento entre os botões**
      padding: '16px',
      // Fundo ainda removido, será transparente
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* Botão do Instagram */}
      <a
        href="https://instagram.com/seu_usuario" // Substitua
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px', // **Ajustado o espaçamento entre ícone e texto**
          backgroundImage: 'linear-gradient(to bottom right, #833AB4, #FD1D1D, #FCB045)',
          color: 'white',
          padding: '16px 32px', // **Aumentado o padding para um botão maior**
          borderRadius: '12px', // **Ligeiramente mais arredondado**
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // **Sombra um pouco mais forte**
          textDecoration: 'none',
          transition: 'transform 0.2s ease-in-out',
          fontWeight: '700', // **Mais negrito (bold)**
          fontSize: '1.25rem', // **Aumentado o tamanho da fonte (equivalente a text-xl)**
          width: 'fit-content', // Garante que o botão não ocupe a largura total
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} // **Aumentado o efeito de hover**
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg
          style={{ width: '32px', height: '32px', fill: 'currentColor' }} // **Aumentado o tamanho do ícone**
          viewBox="0 0 24 24"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm7.5 4.75a.75.75 0 1 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01ZM12 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5Z" />
        </svg>
        <span>Instagram</span>
      </a>

      {/* Botão do WhatsApp */}
      <a
        href="https://wa.me/5511999999999" // Substitua
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px', // **Ajustado o espaçamento entre ícone e texto**
          backgroundColor: '#25D366',
          color: 'white',
          padding: '16px 32px', // **Aumentado o padding para um botão maior**
          borderRadius: '12px', // **Ligeiramente mais arredondado**
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // **Sombra um pouco mais forte**
          textDecoration: 'none',
          transition: 'transform 0.2s ease-in-out',
          fontWeight: '700', // **Mais negrito (bold)**
          fontSize: '1.25rem', // **Aumentado o tamanho da fonte (equivalente a text-xl)**
          width: 'fit-content', // Garante que o botão não ocupe a largura total
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'} // **Aumentado o efeito de hover**
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg
          style={{ width: '32px', height: '32px', fill: 'currentColor' }} // **Aumentado o tamanho do ícone**
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.4 0 0 5.4 0 12.05a11.85 11.85 0 0 0 1.62 6.01L0 24l6.13-1.6a11.8 11.8 0 0 0 5.92 1.57h.01c6.65 0 12.05-5.4 12.05-12.05a11.9 11.9 0 0 0-3.59-8.44zm-8.47 19.2a9.9 9.9 0 0 1-5.04-1.38l-.36-.21l-3.64.95l.97-3.54l-.23-.37a9.93 9.93 0 0 1-1.52-5.26c0-5.48 4.46-9.95 9.95-9.95a9.9 9.9 0 0 1 7.05 2.92a9.93 9.93 0 0 1-7.18 16.84zm5.45-7.51c-.3-.15-1.77-.87-2.05-.96c-.28-.1-.49-.15-.7.15c-.2.3-.8.95-.98 1.14c-.18.2-.36.22-.66.07c-.3-.15-1.26-.47-2.4-1.5c-.89-.79-1.48-1.76-1.65-2.06c-.17-.3-.02-.46.13-.61c.13-.13.3-.34.45-.5c.15-.17.2-.3.3-.5c.1-.2.05-.38-.02-.53c-.07-.15-.7-1.68-.96-2.3c-.25-.6-.5-.52-.7-.52h-.6c-.2 0-.5.08-.75.38s-.98.96-.98 2.34s1 .92 1.15 2.02c.15 1.1 1.18 2.4 1.35 2.56c.17.15 2.33 3.57 5.65 5c.8.34 1.42.54 1.9.69c.8.26 1.53.22 2.1.13c.64-.1 1.98-.81 2.26-1.6c.28-.78.28-1.45.2-1.6c-.1-.15-.28-.22-.6-.37z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}