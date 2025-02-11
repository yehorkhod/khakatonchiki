import { QuestList } from '../../components/QuestList/QuestList';
// import './HomePage.scss';
import './QuestsPage.scss';

export const QuestsPage = () => {
  return (
    <>
      <div className="page container">
        <h1 className="title">Вибери квест</h1>
        <QuestList />
      </div>
    </>
  );
};