import { Link } from 'react-router-dom';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="page container">
        <h1 className="title">Вітаємо в QuestLand - світі пригод і загадок!</h1>
        <p className="subtitle">
          Відчуй себе творцем власної пригоди! На нашому сайті ти можеш
          придумати власний унікальний квест або зануритися в історії, створені
          іншими. Вирішуй загадки, долай випробування та отримуй незабутні
          враження! Чи готовий почати свою пригоду?
        </p>
        <section className="section">
          <h3 className="section__title">Як це працює?</h3>
          <div className="section__content">
            <div className="section__content--item">
              <img
                src="/img/story.png"
                alt=""
                className="section__content--item--img"
              />
              <p className="section__content--item--name">
                Вигадай свою історію або обери готовий квест
              </p>
            </div>
            <div className="section__content--item">
              <img
                src="/img/ask.jpg"
                alt=""
                className="section__content--item--img"
              />
              <p className="section__content--item--name">
                Налаштуй питання, завдання та рівні
              </p>
            </div>
            <div className="section__content--item">
              <img
                src="/img/fun.png"
                alt=""
                className="section__content--item--img"
              />
              <p className="section__content--item--name">
                Запроси друзів або проходь самостійно та have fun!!!
              </p>
            </div>
          </div>
        </section>
        <section className="section-how">
          <h3 className="section-how__title">Як провести свій квест?</h3>
          <div className="section-how__content">
            <div className="section-how__content--item">
              <img
                src="/icons/one.png"
                alt=""
                className="section-how__content--item--img"
              />
              <p className="section-how__content--item--subtitle">
                Створення квесту
              </p>
              <p className="section-how__content--item--name">
                У нашому конструкторі ви створюєте квест з нуля або на основі
                готового шаблону, додаєте завдання, відповіді та налаштовуєте
                рівні.
              </p>
            </div>
            <div className="section-how__content--item">
              <img
                src="/icons/two.png"
                alt=""
                className="section-how__content--item--img"
              />
              <p className="section-how__content--item--subtitle">
                Запрошення гравців
              </p>
              <p className="section-how__content--item--name">
                Надаєте гравцям посилання для початку квесту або роздруковуєте
                фірмовий конверт із QR-кодом для старту.
              </p>
            </div>
            <div className="section-how__content--item">
              <img
                src="/icons/three.png"
                alt=""
                className="section-how__content--item--img"
              />
              <p className="section-how__content--item--subtitle">
                Проходження квесту
              </p>
              <p className="section-how__content--item--name">
                Сервіс показує завдання, перевіряє відповіді, стежить за часом.
                Ви можете спостерігати за прогресом гравців у реальному часі.
              </p>
            </div>
            <div className="section-how__content--item">
              <img
                src="/icons/four.png"
                alt=""
                className="section-how__content--item--img"
              />
              <p className="section-how__content--item--subtitle">Фінал гри</p>
              <p className="section-how__content--item--name">
                Після завершення квесту учасники отримають фінальну інформацію –
                наприклад, хто переміг, де знайти винагороду або як вони
                впоралися у порівнянні з іншими.
              </p>
            </div>
            <div className="section-how__content--item">
              <img
                src="/icons/five.png"
                alt=""
                className="section-how__content--item--img"
              />
              <p className="section-how__content--item--subtitle">
                Публікація квесту
              </p>
              <p className="section-how__content--item--name">
                Опублікуйте свій квест для інших авторів та отримайте бонуси для
                створення нових захопливих пригод!
              </p>
            </div>
          </div>
        </section>
        {/* <section className='section-nav'>
          <div className="section-nav__background">
            <div className="section-nav__wrapper">
              <button className="section-nav__wrapper--button">
                Створити квест
              </button>
              <button className="section-nav__wrapper--button">
                Пройти квест
              </button>
              <button className="section-nav__wrapper--button">
                Більше про нас
              </button>
            </div>
          </div>
        </section> */}

        <section className="section-nav">
          <div className="section-nav__wrapper">
            <Link
              to="/about-us"
              className="section-nav__wrapper--button"
            >
              Про нас 
            </Link>
            {/* <Link
              to="/instruction"
              className="section-nav__wrapper--button"
            >
              Інструкція
            </Link> */}
            <Link
              to="/create-quest"
              className="section-nav__wrapper--button"
            >
              Створити квест
            </Link>
            <Link
              to="/quests"
              className="section-nav__wrapper--button"
            >
              Пройти квест
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
