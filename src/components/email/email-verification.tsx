interface EmailVerificationTemplateProps {
  verificationLink: string
}

export const EmailVerificationTemplate = ({
  verificationLink,
}: EmailVerificationTemplateProps) => {
  return(
  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Potvrzení emailu</h2>
  <p>Dobrý den,</p>
  <p>Pro potvrzení vaší emailové adresy klikněte na odkaz níže</p>
  <p style={{ marginBottom: '20px' }}>
    <a href={verificationLink} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Ověřte email jedním kliknutím</a>
  </p>
  <p>Pokud jste se na mém webu neregistrovali můžete email ignorovat.</p>
  <p>Děkuji,</p>
  <p>Lukáš Pavienský</p>
    </div>
    )
}