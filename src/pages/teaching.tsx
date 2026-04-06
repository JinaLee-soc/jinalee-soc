import Layout from '../components/Layout'
import { teachingPhilosophy, courses, classroomActivities } from '../content/teaching'

export default function Teaching() {
  const philosophyParagraphs = teachingPhilosophy
    .split('\n\n')
    .filter(Boolean)

  return (
    <Layout
      title="Teaching"
      description="Teaching philosophy, courses, and classroom activities in sociology of culture, sociology of gender, social statistics, and technology and society."
    >
      <div className="page">
        <div className="container container--wide">

          <div className="page-header">
            <h1 className="page-header__title">Teaching</h1>
          </div>

          {/* Teaching Philosophy */}
          <section
            aria-labelledby="philosophy-heading"
            style={{ marginBottom: 'var(--space-16)' }}
          >
            <h2
              className="section__title"
              id="philosophy-heading"
              style={{ marginBottom: 'var(--space-5)' }}
            >
              Teaching Philosophy
            </h2>
            <div className="philosophy-block">
              {philosophyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Courses */}
          <section
            aria-labelledby="courses-heading"
            style={{
              marginBottom: 'var(--space-16)',
              paddingTop: 'var(--space-16)',
              borderTop: '1px solid var(--color-border-light)',
            }}
          >
            <h2
              className="section__title"
              id="courses-heading"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              Courses
            </h2>
            <div className="course-list">
              {courses.map((course, i) => (
                <div key={i} className="course-item">
                  <div className="course-item__content">
                    <h3 className="course-item__title">{course.title}</h3>
                    <p className="course-item__institution">{course.institution}</p>
                    <p className="course-item__desc">{course.description}</p>
                    {course.note && (
                      <p className="course-item__note">{course.note}</p>
                    )}
                  </div>
                  {course.syllabusUrl ? (
                    <a
                      href={course.syllabusUrl}
                      className="link-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ alignSelf: 'flex-start', marginTop: '2px' }}
                    >
                      Syllabus
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                        alignSelf: 'flex-start',
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Syllabus on request
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Classroom Activities */}
          <section
            aria-labelledby="activities-heading"
            style={{
              paddingTop: 'var(--space-16)',
              borderTop: '1px solid var(--color-border-light)',
            }}
          >
            <h2
              className="section__title"
              id="activities-heading"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              Selected Classroom Activities
            </h2>
            {classroomActivities.map((group, gi) => (
              <div key={gi} className="activity-group">
                <p className="activity-group__course">{group.course}</p>
                <ul className="activity-list" aria-label={`Activities for ${group.course}`}>
                  {group.activities.map((activity, ai) => (
                    <li key={ai} className="activity-item">
                      <p className="activity-item__name">{activity.name}</p>
                      <p className="activity-item__desc">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

        </div>
      </div>
    </Layout>
  )
}
