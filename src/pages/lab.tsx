import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getLocaleFromPath, localeText } from '../content/i18n'

const members = [
  {
    name: 'Dahyun Ryu',
    membership: 'member',
    role: { en: 'PhD Student', ko: '박사과정' },
    interests: {
      en: 'Digital spaces, social movements, affect and emotion, feminism and gender, computational social science, mixed methods',
      ko: '디지털 공간, 사회운동, 정동과 감정, 페미니즘과 젠더, 계산사회과학, 혼합방법론',
    },
    profile: 'https://sociology.illinois.edu/directory/profile/dahyunr2',
  },
  {
    name: 'Cansu Bakar',
    membership: 'member',
    role: { en: 'Graduate Student', ko: '대학원생' },
    interests: {
      en: 'Medical sociology, health, digitalization, technology, political sociology, mixed methods',
      ko: '의료사회학, 건강, 디지털화, 기술, 정치사회학, 혼합방법론',
    },
  },
  {
    name: 'Sohee Shin',
    membership: 'guest',
    role: { en: 'PhD Candidate', ko: '박사수료생' },
    interests: {
      en: 'Gender and migration, family demography, quantitative methodology, life course, social determinants of health, immigration policy',
      ko: '젠더와 이주, 가족인구학, 양적 방법론, 생애과정, 건강의 사회적 결정요인, 이민정책',
    },
    profile: 'https://sociology.illinois.edu/directory/profile/sohees2',
  },
  {
    name: 'Sukhoon Park',
    membership: 'guest',
    role: { en: 'PhD Student', ko: '박사과정' },
    interests: {
      en: 'Sociology of knowledge, science and technology, computational social science, open science, global inequality in knowledge production',
      ko: '지식사회학, 과학기술사회학, 계산사회과학, 오픈 사이언스, 지식 생산의 글로벌 불평등',
    },
    profile: 'https://sociology.arizona.edu/person/sukhoon-park',
  },
] as const

const copy = {
  en: {
    eyebrow: 'University of Illinois Urbana-Champaign',
    name: 'Science, Technology & Evaluation Lab',
    intro:
      'We study how scientific knowledge is produced, evaluated, and recognized, and how digital technologies and institutional arrangements shape inequality in these processes. Led by Jina Lee, the lab brings together computational, quantitative, and mixed-methods research on science and technology.',
    methods: 'Current projects focus on evaluation systems, digital research infrastructures, and technology-mediated judgment.',
    members: 'Lab Members',
    guests: 'Guest Members',
    interests: 'Research interests',
    profile: 'Department profile',
  },
  ko: {
    eyebrow: 'University of Illinois Urbana-Champaign',
    name: 'Science, Technology & Evaluation Lab',
    intro:
      '과학 지식이 어떻게 생산·평가·인정되는지, 그리고 디지털 기술과 제도적 장치가 이 과정의 불평등을 어떻게 형성하는지 연구합니다. 이진아 교수가 이끄는 연구실로, 과학기술을 중심으로 계산사회과학과 양적 방법론, 혼합방법론을 연결합니다.',
    methods: '현재 평가 시스템, 디지털 연구 인프라, 기술이 매개하는 판단에 초점을 맞추고 있습니다.',
    members: '연구실 구성원',
    guests: '게스트 멤버',
    interests: '연구 관심 분야',
    profile: '학과 프로필',
  },
} as const

export default function Lab() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const text = copy[locale]
  const labMembers = members.filter((member) => member.membership === 'member')
  const guestMembers = members.filter((member) => member.membership === 'guest')

  const memberCard = (member: (typeof members)[number], guest = false) => (
    <li className={`member-card${guest ? ' member-card--guest' : ''}`} key={member.name}>
      <div className="member-card__top">
        <span className="member-card__role">{member.role[locale]}</span>
      </div>
      <h2 className="member-card__name">{member.name}</h2>
      <p className="member-card__label">{text.interests}</p>
      <p className="member-card__interests">{member.interests[locale]}</p>
      {'profile' in member && member.profile && (
        <a
          className="member-card__link"
          href={member.profile}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.profile} <span aria-hidden="true">↗</span>
        </a>
      )}
    </li>
  )

  return (
    <Layout title={labels.lab} description={labels.labDescription}>
      <div className="page lab-page">
        <section className="lab-hero" aria-labelledby="lab-title">
          <div className="container container--wide lab-hero__inner">
            <div className="lab-hero__copy">
              <p className="lab-hero__eyebrow">{text.eyebrow}</p>
              <h1 className="lab-hero__title" id="lab-title">
                {text.name}
              </h1>
              <p className="lab-hero__intro">{text.intro}</p>
              <p className="lab-hero__methods">{text.methods}</p>
            </div>
          </div>
        </section>

        <section className="lab-members" aria-labelledby="lab-members-heading">
          <div className="container container--wide">
            <div className="lab-members__heading-row">
              <p className="section__heading" id="lab-members-heading">
                {text.members}
              </p>
              <span className="lab-members__count" aria-hidden="true">
                02
              </span>
            </div>

            <ul className="member-grid">
              {labMembers.map((member) => memberCard(member))}
            </ul>
          </div>
        </section>

        <section
          className="lab-members lab-members--guest"
          aria-labelledby="lab-guests-heading"
        >
          <div className="container container--wide">
            <div className="lab-members__heading-row">
              <p className="section__heading" id="lab-guests-heading">
                {text.guests}
              </p>
              <span className="lab-members__count" aria-hidden="true">
                02
              </span>
            </div>

            <ul className="member-grid member-grid--guest">
              {guestMembers.map((member) => memberCard(member, true))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}
