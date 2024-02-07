interface ResetPasswordMailTemplateProps {
  resetLink: string
}

export const EmailResetPasswordTemplate = ({
  resetLink,
}: ResetPasswordMailTemplateProps) => {
  return(
  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Reset hesla</h2>
  <p>Dobrý den,</p>
  <p>Pro resetování hesla klikněte na odkaz níže</p>
  <p style={{ marginBottom: '20px' }}>
    <a href={resetLink} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Změnte heslo jedním kliknutím</a>
  </p>
  <p>Pokud jste heslo neresetovali, ignorujte email.</p>
  <p>Děkuji,</p>
  <p>Lukáš Pavienský</p>
    </div>
    )
}