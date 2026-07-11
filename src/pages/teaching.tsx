import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { generatedTeaching } from '../content/cvGenerated'
import {
  findCourseDescription,
  getSiteContent,
} from '../content/siteContentGenerated'
import { getLocaleFromPath, localeText } from '../content/i18n'

export default function Teaching() {
  const institutions = generatedTeaching.institutions ?? []
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const content = getSiteContent(locale)

  return (
    <Layout
      title={labels.teaching}
      description={labels.teachingDescription}
    >
      <div className="page">
        <div className="container container--wide">

          <div className="page-header">
            <h1 className="page-header__title">{labels.teaching}</h1>
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
              {labels.teachingPhilosophy}
            </h2>
            <div className="philosophy-block">
              {content.teachingPhilosophy.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Courses — titles and offerings come from the CV */}
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
              {labels.courses}
            </h2>
            {institutions.map((inst, ii) => (
              <div key={ii} className="activity-group">
                <p className="activity-group__course">{inst.institution}</p>
                <div className="course-list">
                  {inst.courses.map((course, ci) => {
                    const description = findCourseDescription(course.title, locale)
                    return (
                      <div key={ci} className="course-item">
                        <div className="course-item__content">
                          <h3 className="course-item__title">{course.title}</h3>
                          {description.map((paragraph, di) => (
                            <p key={di} className="course-item__desc">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        {course.offering && (
                          <span className="course-item__offering">
                            {course.offering}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
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
            {labels.classroomActivities}
            </h2>
            {content.activityGroups.map((group, gi) => (
              <div key={gi} className="activity-group">
                <p className="activity-group__course">{group.course}</p>
                <ul className="activity-list" aria-label={`${labels.activitiesFor} ${group.course}`}>
                  {group.items.map((activity, ai) => (
                    <li key={ai} className="activity-item">
                      <p className="activity-item__name">{activity.name}</p>
                      {activity.description.map((paragraph, di) => (
                        <p key={di} className="activity-item__desc">
                          {paragraph}
                        </p>
                      ))}
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
