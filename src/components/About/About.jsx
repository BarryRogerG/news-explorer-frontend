import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about__image-container">
        <div className="about__image-placeholder">
          <span className="about__placeholder-icon">😊</span>
          <p className="about__placeholder-text">
            Placeholder image. Put an image of yourself here.
          </p>
        </div>
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
        </p>
        <p className="about__text">
          You can also talk about your experience with TripleTen, what you learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  )
}

export default About

