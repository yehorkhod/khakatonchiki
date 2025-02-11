import './ContactsPage.scss';

export const ContactsPage = () => {
  return (
    <div className="page container">
      <h1 className="title">Контакти</h1>
      <p className="subtitle">
        Якщо у вас виникли питання або ви хочете подати скаргу, зв’яжіться з
        нами:
      </p>
      <div className="wrapper">
        <p className='text'>Email:</p>
        <a href="mailto:support@questplatform.com" className='email'>support@questplatform.com</a>
      </div>
      <div className="wrapper">
        <p className='text'>Телефон:</p>
        <a href="tel:+380 99 123 45 67" className='phone'>+380 99 123 45 67</a>
      </div>
      <p className='text extra'>(Останнє оновлення: 07.02.2025)</p>
    </div>
  );
};

