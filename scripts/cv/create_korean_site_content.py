from __future__ import annotations

import argparse
import os
from pathlib import Path

from docx import Document

from korean_auto_translation import (
    DEFAULT_AUTO_TRANSLATIONS_PATH,
    DEFAULT_TRANSLATION_MODEL,
    load_auto_translations,
    save_auto_translations,
    translate_prose,
)


TRANSLATIONS: dict[str, str] = {
    "Jina Lee is a sociologist who studies how seemingly objective evaluation systems reproduce social hierarchies in science and in culture. Across these contexts, her work reveals a consistent pattern: practices that appear meritocratic often embed biases that disadvantage women and lower-status actors. Her research has been published in the American Sociological Review, Poetics, Socius, and Journal of Social Entrepreneurship, and is forthcoming in Gender & Society.":
        "저는 사회학자로서 과학과 문화 영역에서 겉보기에는 객관적인 평가 체계가 사회적 위계를 어떻게 재생산하는지 연구합니다. 서로 다른 맥락을 가로질러, 제 연구는 일관된 패턴을 보여줍니다. 능력에 기반한 것처럼 보이는 관행에도 여성과 지위가 낮은 행위자에게 불리하게 작용하는 편향이 내재되어 있다는 점입니다. 제 연구는 American Sociological Review, Poetics, Socius, Journal of Social Entrepreneurship에 게재되었으며, Gender & Society에 게재 예정입니다.",
    "I teach undergraduate courses in sociology of culture, sociology of gender, social statistics, and technology and society. My courses emphasize critical thinking and the application of sociological frameworks to contemporary empirical questions.":
        "저는 문화사회학, 젠더사회학, 사회통계학, 과학기술과 사회를 아우르는 학부 과목을 가르칩니다. 수업에서는 비판적 사고와 사회학적 분석 틀을 동시대의 경험적 질문에 적용하는 능력을 강조합니다.",
    "My research examines how evaluation systems that appear objective reproduce gender hierarchies across scientific and cultural fields. I ask: whose contributions are recognized as valuable, and whose are discounted? Across these programs, I trace how gender bias operates through everyday evaluation practices and accumulates into durable inequalities.":
        "제 연구는 객관적으로 보이는 평가 체계가 과학과 문화의 여러 영역에서 젠더 위계를 어떻게 재생산하는지 분석합니다. 어떤 기여가 가치 있는 것으로 인정되고, 어떤 기여가 평가절하되는지 질문합니다. 저는 일상적인 평가 관행 속에서 젠더 편향이 어떻게 작동하고, 지속적인 불평등으로 축적되는지를 추적합니다.",
    "My methods include computational text analysis, bibliometric analysis, and survey experiments.":
        "저는 전산 텍스트 분석, 서지 분석, 설문 실험을 활용합니다.",
    "PROGRAM: Gender and Scientific Evaluation": "PROGRAM: 젠더와 과학적 평가",
    "Scientific recognition is rarely neutral. My work in this area investigates how gender shapes which knowledge claims are treated as authoritative, how novelty is attributed and rewarded, and how uncertainty is managed differently depending on who makes a claim.":
        "과학적 인정은 중립적으로 이루어지지 않습니다. 저는 젠더가 어떤 지식 주장이 권위 있는 것으로 받아들여지는지, 새로움이 누구에게 귀속되고 보상되는지, 그리고 과학적 주장을 누가 제시하느냐에 따라 불확실성이 어떻게 다르게 관리되는지를 분석합니다.",
    "How do gendered dynamics shape which scientific contributions get recognized, cited, and treated as authoritative?":
        "젠더화된 평가 관행은 어떤 과학적 기여가 인정되고, 인용되며, 권위 있는 것으로 받아들여지는지를 어떻게 형성하는가?",
    "How is novelty attributed and rewarded differently across gender lines?":
        "과학적 새로움은 젠더에 따라 어떻게 다르게 귀속되고 보상되는가?",
    "How is uncertainty managed differently depending on who makes a scientific claim?":
        "과학적 주장을 누가 제시하느냐에 따라 불확실성은 어떻게 다르게 관리되는가?",
    "PROGRAM: Gender, Culture, and Recognition": "PROGRAM: 젠더, 문화, 그리고 인정",
    "Recognition unfolds across cultural fields, markets, and public arenas. My work in this area examines how gender and social hierarchies shape who is recognized, remembered, funded, protected, or able to remain publicly present.":
        "인정은 문화적 장, 시장, 공적 영역을 가로질러 형성됩니다. 저는 젠더와 사회적 위계가 누가 인정받고 기억되며, 자금을 지원받고 보호받거나, 공적 공간에 계속 남을 수 있는지를 어떻게 형성하는지 분석합니다.",
    "How do cultural institutions determine whose work is recognized and remembered?":
        "문화 제도는 누구의 작업이 인정되고 기억될지를 어떻게 결정하는가?",
    "How do gender stereotypes shape access to recognition and resources?":
        "젠더 고정관념은 인정과 자원에 대한 접근을 어떻게 형성하는가?",
    "How do social categories influences judgments of who deserves support or protection?":
        "사회적 범주는 누가 지원이나 보호를 받을 자격이 있는지에 대한 판단에 어떤 영향을 미치는가?",
    "At which stages of evaluation do inequalities emerge and accumulate?":
        "불평등은 평가의 어느 단계에서 발생하고 축적되는가?",
    "PROGRAM: Science and Academia": "PROGRAM: 과학과 학계",
    "Scientific knowledge is shaped not only by what researchers study but by how scientific communities are organized. This line of work examines how structural features of academic fields, such as how audiences are structured, publication norms, and data practices, influence the production, reception, and epistemic character of scientific knowledge.":
        "과학적 지식은 연구자들이 무엇을 연구하는지뿐 아니라 과학 공동체가 어떻게 조직되는지에 의해 형성됩니다. 저는 학문 분야의 청중 구조, 출판 규범, 데이터 관행과 같은 구조적 특성이 과학 지식의 생산과 수용, 인식론적 성격에 어떤 영향을 미치는지 분석합니다.",
    "How does audience structure shape the impact of domain-spanning innovation?":
        "청중의 구조는 여러 영역을 가로지르는 혁신의 영향력을 어떻게 형성하는가?",
    "How do editorial and data sharing requirements shape the epistemic character of scientific articles?":
        "편집 및 데이터 공유 요건은 과학 논문의 인식론적 성격을 어떻게 형성하는가?",
    "PROGRAM: AI and Research Practice": "PROGRAM: AI와 연구 실천",
    "A newer line of my work asks how AI tools are changing research practice itself, not just its speed or volume.":
        "저의 최근 연구는 AI 도구가 연구의 속도나 규모를 넘어 연구 관행 자체를 어떻게 변화시키는지 묻습니다.",
    "How can AI-assisted research systems make interpretive decisions visible and auditable?":
        "AI 지원 연구 시스템은 해석적 결정을 어떻게 가시화하고 검증·감사할 수 있게 만들 수 있는가?",
    "What survives, and what is lost, when human judgment is relocated into external infrastructure a researcher runs alone?":
        "연구자가 혼자 실행하는 외부 인프라로 인간의 판단이 이전될 때, 무엇이 남고 무엇이 사라지는가?",
    "I believe in the transformative power of integrative and experiential learning to make sociological concepts tangible and relevant to students' lives. I design interactive learning environments where theory comes alive through collaborative investigation and creative application. Below are select examples from three of my undergraduate courses.":
        "저는 통합적이고 경험적인 학습이 사회학적 개념을 학생들의 삶과 연결하고, 그 개념을 구체적으로 이해하게 하는 변혁적인 힘을 지닌다고 믿습니다. 저는 협력적 탐구와 창의적 적용을 통해 이론을 살아 있는 경험으로 만드는 상호작용적 학습 환경을 설계합니다. 아래에는 제가 가르치는 학부 세 과목에서 활용한 몇 가지 사례를 소개합니다.",
    "A survey of fundamental statistical concepts and their application in social research, with emphasis on both conceptual understanding and practical analysis skills.":
        "사회 연구에서 사용하는 기초 통계 개념과 그 적용을 다루며, 개념적 이해와 실제 분석 능력을 함께 강조합니다.",
    "Key frameworks in the sociology of culture, including cultural industries, taste, status, and the boundary between popular and high culture. Students analyze everyday cultural objects through a sociological lens.":
        "문화산업, 취향, 지위, 대중문화와 고급문화의 경계를 포함한 문화사회학의 핵심 이론을 다룹니다. 학생들은 일상의 문화적 대상을 사회학적 관점에서 분석합니다.",
    "How gender shapes experience across education, work, family, and relationships, and how it intersects with other dimensions of social inequality.":
        "교육, 노동, 가족, 관계에서 젠더가 경험을 어떻게 형성하는지, 그리고 젠더가 사회 불평등의 다른 차원과 어떻게 교차하는지를 다룹니다.",
    "How science and technology shape social life, and how social forces shape science and technology in return. Topics include recognition, inequality, AI governance, and algorithmic systems.":
        "과학과 기술이 사회생활을 어떻게 형성하는지, 그리고 사회적 힘이 과학과 기술을 어떻게 다시 형성하는지를 분석합니다. 주요 주제는 인정, 불평등, AI 거버넌스, 알고리즘 시스템입니다.",
    "Students map their campus environment to identify how institutional resources are distributed along class-coded lines, drawing on Anthony Jack's research on first-generation students.":
        "학생들은 캠퍼스 환경을 지도화하여 계층적 구분을 따라 제도적 자원이 어떻게 분배되는지 파악하고, Anthony Jack의 1세대 대학생 연구를 바탕으로 분석합니다.",
    "Teams represent stigmatized subcultures and use theoretical tools to argue for their group's legitimacy, navigating between analytical rigor and rhetorical performance.":
        "학생들은 낙인찍힌 하위문화를 대표하여 이 집단의 정당성을 이론적으로 주장하고, 분석적 엄밀성과 수사적 수행 사이의 관계를 탐색합니다.",
    "Students translate sociological concepts into visual form and analyze what makes a concept-driven meme culturally legible and shareable.":
        "학생들은 사회학적 개념을 시각적 형태로 옮긴 뒤, 개념 중심의 밈이 어떻게 문화적으로 이해되고 공유되는지를 분석합니다.",
    "Students construct evidence-based counter-memes to challenge essentialist claims, practicing critical engagement with popular discourse about gender.":
        "학생들은 본질주의적 주장을 반박하는 근거 기반의 카운터 밈을 제작하며, 젠더에 관한 대중 담론을 비판적으로 분석합니다.",
    "Students curate visual representations of gendered professional norms and present them analytically, surfacing the social regulation of bodies in professional contexts.":
        "학생들은 젠더화된 전문직 규범을 보여주는 시각 자료를 선별·구성하고 이를 분석적으로 발표하며, 전문적 맥락에서 신체가 사회적으로 규율되는 방식을 드러냅니다.",
    "Groups write fictional letters from 1950s time travelers confused by modern work-family arrangements; peers respond with sociologically informed analysis connecting personal experience to institutional change.":
        "학생들은 1950년대의 시간 여행자가 현대의 일·가족 배치를 이해하지 못한다는 설정으로 허구의 편지를 씁니다. 동료 학생들은 개인적 경험과 제도적 변화를 연결하는 사회학적 분석으로 이에 답합니다.",
    "Students use structured gameplay to examine how scientific credit accumulates unequally, mapping advantage and disadvantage onto the social conditions of knowledge production.":
        "학생들은 구조화된 게임을 활용해 과학적 공로가 불평등하게 축적되는 방식을 분석하고, 지식 생산의 사회적 조건에 따라 이익과 불이익이 어떻게 배분되는지 지도화합니다.",
    "Students document their everyday encounters with algorithmic systems, then analyze them as a class to surface patterns in how AI shapes choice and perception.":
        "학생들은 알고리즘 시스템과 일상에서 마주한 경험을 기록한 뒤, 이를 수업에서 함께 분석하여 AI가 선택과 인식을 형성하는 방식의 패턴을 드러냅니다.",
    "Groups construct physical representations of differential technology access, making structural inequality in digital infrastructure materially visible.":
        "학생들은 기술 접근성의 차이를 물리적 모형으로 구성하여 디지털 인프라에 내재한 구조적 불평등을 가시화합니다.",
}

PRESERVED_TITLES = {
    "Claiming Novelty, Claiming Authority: Gender Gaps in Scientific Impact Across Disciplines",
    "The Theory Penalty: Gender Bias in Recognition of Scientific Novelty",
    "Stratified Fact-Making: How Gender and Novelty Claims Stratify the Stabilization of Scientific Facts",
    "What Types of Novelty Are Most Disruptive?",
    "Gendered Pathways to Perpetual Fame: The Selection of Elite Novelists into the Korean Literary Canon",
    "Who Deserves Protection? How Naming Potential Beneficiaries Influences the COVID-19 Vaccine Intentions",
    "The Persistent Influence of Gender Stereotypes in Social Entrepreneurial Financing",
    "Survivorship in Public: Differential Durability and the Conflictual Face of Korean Digital Feminism",
    "Divide and Conquer? How Partitioned Audiences Shape the Impact of Domain-Spanning Innovation",
    "Humble Reflections on the Intellectual Process of Developing a Text-based Measure of Humility in Inquiry",
    "Conceptual Divergence Analysis: Mapping a Researcher's Conceptual Vocabulary Against the Literatures They Address",
}


def should_preserve(text: str) -> bool:
    return text in PRESERVED_TITLES or text.startswith((
        "HOME ",
        "RESEARCH INTRO",
        "KEY QUESTIONS",
        "PUBLICATIONS",
        "TEACHING PHILOSOPHY",
        "COURSE: ",
        "ACTIVITIES: ",
        "ITEM: ",
    )) or text in {
        "HOME ABOUT",
        "HOME TEACHING",
        "PUBLICATIONS",
        "TEACHING PHILOSOPHY",
    }


def replace_paragraph_text(paragraph, replacement: str) -> None:
    if not paragraph.runs:
        paragraph.add_run(replacement)
        return

    paragraph.runs[0].text = replacement
    for run in paragraph.runs[1:]:
        run.text = ""


def create_korean_document(
    input_path: Path,
    output_path: Path,
    auto_translations_path: Path,
    model: str,
) -> None:
    document = Document(input_path)
    auto_translations = load_auto_translations(auto_translations_path)
    new_paragraphs: list[str] = []

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()
        if (
            text
            and text not in TRANSLATIONS
            and text not in auto_translations
            and not should_preserve(text)
            and text not in new_paragraphs
        ):
            new_paragraphs.append(text)

    if new_paragraphs:
        generated = translate_prose(new_paragraphs, model)
        auto_translations.update(generated)
        save_auto_translations(auto_translations_path, auto_translations)
        print(
            f"Auto-translated {len(generated)} new paragraphs with {model}; "
            f"review them in {auto_translations_path}."
        )

    translated = 0

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()
        if not text:
            continue
        replacement = TRANSLATIONS.get(text) or auto_translations.get(text)
        if replacement is not None:
            replace_paragraph_text(paragraph, replacement)
            translated += 1
        elif should_preserve(text):
            continue
        else:
            raise RuntimeError(f"No Korean translation generated for: {text}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    document.save(output_path)
    print(f"Created {output_path} with {translated} translated paragraphs.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create Korean site-content.docx")
    parser.add_argument("--input", default="site-content.docx")
    parser.add_argument("--output", default="site-content-ko.docx")
    parser.add_argument(
        "--auto-translations",
        default=str(DEFAULT_AUTO_TRANSLATIONS_PATH),
    )
    parser.add_argument(
        "--model",
        default=os.environ.get("OPENAI_TRANSLATION_MODEL", DEFAULT_TRANSLATION_MODEL),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    create_korean_document(
        Path(args.input),
        Path(args.output),
        Path(args.auto_translations),
        args.model,
    )


if __name__ == "__main__":
    main()
