import './AboutUsPage.scss';

const teamMembers = [
  {
    name: 'Олексій',
    role: 'Backend Developer',
    image: '/weee/lesha.jpg', // Заміни на реальний шлях
  },
  {
    name: 'Єгор',
    role: 'Team Lead, Backend Developer, QA-tester',
    image: '/weee/egor.jpg', // Заміни на реальний шлях
  },
  {
    name: 'Марі',
    role: 'Frontend Developer',
    image: '/weee/mariia.jpg', // Заміни на реальний шлях
  },
];

export const AboutUsPage = () => {
  return (
    <div className="about-container page container">
      <h1 className="title">Error 404: Team Unknown</h1>
      <div className="team">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-member"
          >
            <img
              src={member.image}
              alt={member.name}
              className="team-photo"
            />
            <h2 className="member-name">{member.name}</h2>
            <p className="member-role">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
