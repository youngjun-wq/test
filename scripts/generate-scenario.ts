import { encryptAESGCM, hashPassword } from '../src/utils/crypto.ts';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const GM_PASSWORD = 'boardbang1930';
  const gmHash = await hashPassword(GM_PASSWORD);

  const characterConfigs = [
    {
      id: 'char_detective',
      name: '베테랑 형사',
      roleTitle: '경시청 수사과 베테랑 형사',
      hanchaName: '刑事',
      age: 48,
      gender: '남',
      occupation: '경시청 수사과 형사',
      summary: '지금까지 가와즈야의 수족이 되어 조사를 진행해 왔던 베테랑 형사. 마차를 타고 저택에 도착.',
      avatarIcon: 'detective',
      group: 'carriage',
      groupName: '마차조',
      interviewTime: '오후 6시 30분',
      password: '형사',
      fallbackPasswordNum: '1920',
      passwordHint: '비밀번호: 형사 (또는 1920)',
      publicInfo: {
        appearance: '세월의 무게가 느껴지는 낡은 트렌치코트, 굳은 표정과 예리한 눈빛, 가죽 서류가방.',
        timeline: '가와즈야가 마련한 마차에 괴도, 청소부와 동승하여 저택 도착. 오후 6시 30분에 가와즈야와 30분간 서재 면담 진행.',
        testimony: '가와즈야의 초대장에 괴도의 동승이 수사에 불가결하다고 적혀 있어 체포하지 않았소. 자정에 비명을 듣고 서재로 달려가 목 부근 맥을 짚었으나 가와즈야는 이미 숨이 끊어진 상태였소.',
        belongings: ['경찰 신분증 및 수첩', '회중시계', '수갑', '가와즈야의 초대장']
      },
      secretInfo: `[베테랑 형사 - 극비 밀서]
당신은 경시청에서 수십 년간 잔뼈가 굵은 형사이며, 지난 4년간 가와즈야의 수족이 되어 제도의 수많은 흉악 범죄를 함께 해결해 왔다.
하지만 가와즈야는 언제나 결정적인 단서와 수사 기록을 자신만의 서재와 자료실에 숨겨두고 독점해 왔다.
특히 제도를 공포에 떨게 한 '연쇄 살인마 까마귀' 사건에 관해서는, 경찰조차 모르는 무언가를 가와즈야가 감추고 있다는 강한 의심을 품고 있었다.

[사건 당일의 행적과 진실]
1. 가와즈야가 보낸 마차에 괴도, 청소부와 함께 탔다. 가와즈야가 보낸 편지에 '까마귀 수사에 그녀가 불가결하다'고 쓰여 있어 괴도를 체포하지 않았다.
2. 6시 30분, 두 번째로 서재에 들어가 가와즈야와 1:1 면담을 가졌다. 가와즈야는 의미심장하게 "제도 경찰이 풀지 못한 까마귀의 숙명을 오늘 밤 매듭짓겠다"고 선언했다.
3. 오전 0시, 저택에 비명이 울려 퍼지자 가장 먼저 서재 앞으로 달려갔다. 문 앞에 주저앉은 작가를 밀치고 들어가 안락의자에 꽂힌 나이프와 피투성이가 된 가와즈야의 맥을 짚었으나 이미 사망한 뒤였다.
4. 현장 검시 결과: 흉부는 예리한 나이프 자상이며 과다출혈로 사망. 방 안은 누군가의 습격을 받은 듯 뒤흔들려 있었다.

[당신의 목표]
- 가와즈야 세이지로를 살해한 진범을 색출하라.
- 가와즈야가 감추어 둔 '까마귀'의 진짜 정체와 그가 남긴 예언서의 진상을 밝혀내라.`
    },
    {
      id: 'char_thief',
      name: '미모의 괴도',
      roleTitle: '미술품 & 보석 전문 괴도',
      hanchaName: '怪盜',
      age: 26,
      gender: '여',
      occupation: '괴도',
      summary: '깔끔한 수법으로 미술품과 보석을 훔치는 미모의 괴도. 마차를 타고 저택에 도착.',
      avatarIcon: 'thief',
      group: 'carriage',
      groupName: '마차조',
      interviewTime: '오후 6시 (첫 번째)',
      password: '괴도',
      fallbackPasswordNum: '2048',
      passwordHint: '비밀번호: 괴도 (또는 2048)',
      publicInfo: {
        appearance: '기품 있는 챙 넓은 모자와 벨벳 망토, 매혹적인 미소 속에 비밀을 감춘 여인.',
        timeline: '형사, 청소부와 함께 마차로 저택 도착. 오후 6시 정각에 가장 먼저 가와즈야와 30분간 서재 면담 진행.',
        testimony: '형사님이 저를 체포하지 않은 건 탐정님의 초대장 덕분이었죠. 6시에 탐정님을 뵙고 차를 마신 뒤 자료실과 방을 둘러보았을 뿐이에요.',
        belongings: ['비단 장갑', '보석 감정용 루페(확대경)', '가는 철사 도구', '가와즈야의 초대장']
      },
      secretInfo: `[미모의 괴도 - 극비 밀서]
당신은 제도의 수많은 귀족과 부호들의 미술품과 보석을 감쪽같이 훔쳐내어 명성을 떨친 괴도다.
하지만 당신이 노리는 것은 단순한 금전이 아니라, 과거 당신 가문을 파멸로 몰고 간 '특정 비보(秘寶)'와 관련된 진실이다.

[사건 당일의 행적과 진실]
1. 가와즈야의 초대장에는 당신이 오랜 세월 추적해 온 비밀의 단서와 까마귀의 정체에 관한 언급이 적혀 있었다.
2. 오후 6시, 가장 첫 번째로 서재에 입장해 가와즈야와 면담했다. 가와즈야는 당신에게 "당신이 찾던 과거의 조각도 오늘 밤 이곳에서 끝날 것"이라며 자료실의 특정 서류를 찾아보라고 권유했다.
3. 면담 도중 가와즈야의 태도에서 극도의 초조함과 무언가를 결행하려는 광기를 엿보았다.
4. 자정에 들려온 비명소리에 놀라 복도로 뛰어나왔을 때, 이미 가와즈야는 심장에 나이프가 박힌 채 숨져 있었다.

[당신의 목표]
- 가와즈야가 남긴 '자료실'과 '편지 상자'에서 당신의 과거와 관련된 진실을 확보하라.
- 당신에게 혐의가 씌워지지 않도록 우아하게 알리바이를 입증하고 진범을 밝혀내라.`
    },
    {
      id: 'char_journalist',
      name: '전직 기자',
      roleTitle: '대형 신문사 전직 사회부 기자',
      hanchaName: '記者',
      age: 31,
      gender: '남',
      occupation: '전직 기자 / 탐정 지망생',
      summary: '가와즈야를 동경해 회사를 그만둔 대형 신문사의 전직 기자. 기차를 타고 저택에 도착.',
      avatarIcon: 'journalist',
      group: 'train',
      groupName: '기차조',
      interviewTime: '오후 7시 30분',
      hasSharpObjective: true,
      password: '기자',
      fallbackPasswordNum: '3104',
      passwordHint: '비밀번호: 기자 (또는 3104)',
      publicInfo: {
        appearance: '잉크 얼룩이 묻은 콤비 재킷, 두꺼운 취재 수첩과 만년필, 호기심에 가득 찬 눈동자.',
        timeline: '작가, 조수와 온천가에서 합류하여 기차로 저택 도착. 오후 7시 30분에 가와즈야와 30분간 서재 면담 진행.',
        testimony: '가와즈야 선생님은 제 인생의 우상이었습니다. 탐정이 되기 위해 신문사까지 그만두었죠. 7시 30분 면담 때 선생님은 몹시 피곤해 보이셨지만 여전히 날카로우셨습니다.',
        belongings: ['두꺼운 속기 수첩', '독일제 만년필', '신문 기사 스크랩북', '가와즈야의 초대장']
      },
      secretInfo: `[전직 기자 - 극비 밀서]
당신은 대형 신문사 사회부 시절, 가와즈야의 화려한 사건 해결 이면에 석연치 않은 조작이나 은폐가 있었음을 직감하고 독자 조사를 진행해 왔다.
가와즈야의 등장 이후 살인 사건 발생률이 급감했지만, 유독 '까마귀' 사건만은 피해자가 늘어났다는 모순점을 포착했다.

[사건 당일의 행적과 진실]
1. 온천가에서 작가, 조수와 함께 기차를 타고 가와즈야 저택으로 향했다. 기차 안에서 작가의 불안정한 상태를 예의주시했다.
2. 7시 30분, 네 번째로 서재에 들어가 가와즈야와 대면했다. 가와즈야는 당신의 취재 노트를 보며 "자네는 너무 많이 알고 있군. 하지만 오늘 밤 예언서가 발표되면 자네의 기사도 쓸모없어질 걸세"라고 비웃었다.
3. 당신에게는 특별한 [#표 목적]이 부여되어 있다. 게임 중 획득할 [# 카드]를 정확한 대상 앞에 배치해야 한다.

[당신의 목표]
- [# 카드]를 획득하여 당신의 [#표 목적]을 완수하라.
- 가와즈야가 은폐해 온 사건들의 진상(K, R, M 사건)을 캐내어 세상을 뒤흔들 특종을 완성하라.`
    },
    {
      id: 'char_writer',
      name: '작가',
      roleTitle: '슬럼프에 빠진 소설가',
      hanchaName: '作家',
      age: 35,
      gender: '남',
      occupation: '소설가',
      summary: '꽤 오랫동안 신작을 쓰지 않고 있는, 마음이 병든 작가. 기차로 이동. 자정 비명의 최초 목격자.',
      avatarIcon: 'writer',
      group: 'train',
      groupName: '기차조',
      interviewTime: '오후 8시',
      password: '작가',
      fallbackPasswordNum: '4821',
      passwordHint: '비밀번호: 작가 (또는 4821)',
      publicInfo: {
        appearance: '창백하고 수척한 뺨, 흐트러진 머리칼과 긴 코트, 신경질적으로 손톱을 물어뜯는 버릇.',
        timeline: '기차를 타고 저택 도착. 오후 8시에 가와즈야와 30분간 서재 면담. 자정(오전 0시) 서재 앞 복도에서 주저앉아 비명을 지름.',
        testimony: '잠이 오지 않아 복도를 서성이다가... 서재 문이 조금 열려 있는 것을 보았습니다. 들여다보았더니 탐정님이 피를 흘리며... 끔찍했습니다...',
        belongings: ['원고지 뭉치', '수면제 알약 통', '성냥갑과 담배', '가와즈야의 초대장']
      },
      secretInfo: `[작가 - 극비 밀서]
당신은 과거 제도를 뒤흔든 추리소설로 찬사를 받았으나, 이후 단 한 줄도 쓰지 못하는 지독한 슬럼프와 우울증에 시달려 왔다.
가와즈야의 초대장에 적힌 "탐정 금지 영역"이라는 문구는, 당신이 과거 미발표 유고에 썼던 핵심 설정과 소름 끼치도록 일치했다.

[사건 당일의 행적과 진실]
1. 오후 8시, 다섯 번째로 서재를 방문했다. 가와즈야는 당신을 보며 "자네가 상상만 하던 완벽한 범죄의 예언서가 드디어 현실이 된다네"라며 조롱했다. 극심한 두통과 분노를 느끼며 서재를 뛰쳐나왔다.
2. 밤 11시 50분경, 도저히 잠을 이룰 수 없어 약을 먹으려다 가와즈야의 서재 쪽에서 무언가 둔탁한 소리를 들었다.
3. 오전 0시, 서재 문을 밀었을 때 안락의자에 꽂힌 붉은 나이프를 보고 공포에 질려 비명을 지르고 주저앉았다.
4. 중요 규칙: 당신은 최종 추리 페이즈에서 특수한 3번째 목적을 구두로 발표해야 한다!
   - 자신 앞으로 온 가와즈야의 편지를 획득했을 경우: <3-A: 예언서의 실행자 및 협력자 2명 지명>
   - 그렇지 못했을 경우: <3-B: 현재의 까마귀의 정체 1명 지명>

[당신의 목표]
- 당신의 영혼을 옭아매던 가와즈야의 음모를 파헤치고, 3-A 또는 3-B 추리 목적을 완벽히 달성하라.`
    },
    {
      id: 'char_assistant',
      name: '조수',
      roleTitle: '명탐정 가와즈야의 전 조수',
      hanchaName: '助手',
      age: 22,
      gender: '여',
      occupation: '탐정 조수',
      summary: '반년 정도 전까지 가와즈야와 함께 생활했던 그의 조수. 저택 응접실 안내 및 축음기 조작.',
      avatarIcon: 'assistant',
      group: 'train',
      groupName: '기차조',
      interviewTime: '오후 7시',
      password: '조수',
      fallbackPasswordNum: '5279',
      passwordHint: '비밀번호: 조수 (또는 5279)',
      publicInfo: {
        appearance: '단정하고 청초한 하카마 차림, 차분하고 정중한 어조, 저택의 열쇠 꾸러미를 소지.',
        timeline: '기차로 이동하여 저택 도착. 응접실로 손님들을 안내하고 가와즈야의 지시에 따라 축음기 재생. 오후 7시에 30분간 서재 면담.',
        testimony: '선생님께서는 오늘 밤 여행을 떠나기 전 중요한 결단을 내리겠다고 하셨습니다. 저에게 축음기 전언과 편지 상자 관리를 부탁하셨을 뿐인데... 이런 비극이 일어날 줄은 몰랐습니다.',
        belongings: ['저택 응접실 및 객실 열쇠', '축음기 태엽 손잡이', '작은 수첩', '가와즈야의 초대장']
      },
      secretInfo: `[가와즈야의 조수 - 극비 밀서]
당신은 반년 전까지 가와즈야의 저택에서 숙식하며 그의 수사 보조와 일상 관리를 도맡았다.
하지만 가와즈야가 '까마귀' 사건에 비정상적으로 집착하며 인간성을 잃어가는 모습에 공포를 느껴 저택을 떠났었다.

[사건 당일의 행적과 진실]
1. 가와즈야의 간곡한 부탁으로 오늘 모임의 진행 보조를 맡았다. 작가에게 초대장을 전하고 기차로 동행했다.
2. 당신은 막간 페이즈 ①에서 축음기를 틀고, 6통의 편지가 든 금속제 상자를 테이블에 올려놓았다. 뚜껑을 닫자 자물쇠가 잠겼다.
3. 오후 7시, 세 번째로 서재에 들어갔다. 가와즈야는 당신에게 "내가 떠나더라도 저택의 자료실과 상자를 잘 지켜달라"며 의미심장한 눈빛을 보냈다.
4. 중요 안내: 누군가 「작은 열쇠」 카드를 획득하여 상자를 열면, 모두가 초대장 아래 놓인 가와즈야의 편지를 열람하게 된다.

[당신의 목표]
- 조수로서 게임의 질서를 유지하면서, 가와즈야가 감춘 진실과 살인범의 정체를 밝혀내라.`
    },
    {
      id: 'char_cleaner',
      name: '청소부',
      roleTitle: '정체불명의 노인 청소부',
      hanchaName: '掃除夫',
      age: 67,
      gender: '남',
      occupation: '청소부',
      summary: '정체불명의 노인으로, 청소부라고 자칭하는 인물. 마차를 타고 저택에 도착.',
      avatarIcon: 'cleaner',
      group: 'carriage',
      groupName: '마차조',
      interviewTime: '오후 8시 30분 (마지막)',
      hasSharpObjective: true,
      password: '청소부',
      fallbackPasswordNum: '6832',
      passwordHint: '비밀번호: 청소부 (또는 6832)',
      publicInfo: {
        appearance: '낡고 빳빳한 모시 적삼, 굽은 허리와 깊게 파인 주름, 그러나 번뜩이는 안광.',
        timeline: '형사, 괴도와 함께 마차로 저택 도착. 오후 8시 30분, 마지막 순서로 가와즈야와 30분간 서재 면담 진행.',
        testimony: '나는 그저 저택을 청소하러 온 늙은이일 뿐이오. 8시 30분에 탐정 양반을 만나 방 청소 이야기를 나누었을 뿐, 그 뒤로는 내 방에서 쉬고 있었수다.',
        belongings: ['걸레와 먼지털이개', '마른 나뭇가지 지팡이', '낡은 주머니', '가와즈야의 초대장']
      },
      secretInfo: `[노인 청소부 - 극비 밀서]
당신은 평범한 청소부가 아니다. 제도의 뒷골목에서 수십 년간 어둠의 정보와 시신을 수습해 온 '청소업자'이자, 제도 창설기부터 이어진 수많은 비극을 목격한 산증인이다.
가와즈야가 가면 뒤에 숨긴 진짜 과거와, '까마귀'의 기원에 대해 누구보다 깊이 알고 있다.

[사건 당일의 행적과 진실]
1. 가와즈야의 부름을 받고 마차에 올랐다. 형사와 괴도의 속내를 꿰뚫어 보며 침묵을 지켰다.
2. 8시 30분, 마지막으로 서재에 들어갔다. 가와즈야는 당신을 마주하자 "영감, 드디어 때가 왔소"라며 마지막 정리를 부탁하듯 속삭였다.
3. 당신은 서재를 나온 마지막 면담자다. 당신이 서재를 나온 9시부터 자정까지, 가와즈야의 서재에는 무슨 일이 일어난 것인가?
4. 당신에게는 특별한 [#표 목적]이 부여되어 있다. 조사 과정에서 획득할 [# 카드]를 정확히 활용해야 한다.

[당신의 목표]
- [# 카드]를 획득하여 당신의 [#표 목적]을 완수하라.
- 가와즈야의 죽음 뒤에 숨겨진 제도의 오랜 업보와 까마귀의 진실을 끝까지 지켜보아라.`
    }
  ];

  const characters = [];
  for (const c of characterConfigs) {
    const encryptedSecret = await encryptAESGCM(c.secretInfo, c.password);
    const encryptedSecretAlt = await encryptAESGCM(c.secretInfo, c.fallbackPasswordNum);
    const encryptedSecretForGm = await encryptAESGCM(c.secretInfo, GM_PASSWORD);

    characters.push({
      id: c.id,
      name: c.name,
      roleTitle: c.roleTitle,
      hanchaName: c.hanchaName,
      age: c.age,
      gender: c.gender,
      occupation: c.occupation,
      summary: c.summary,
      avatarIcon: c.avatarIcon,
      group: c.group,
      groupName: c.groupName,
      interviewTime: c.interviewTime,
      hasSharpObjective: c.hasSharpObjective,
      passwordHint: c.passwordHint,
      publicInfo: c.publicInfo,
      encryptedSecret,
      encryptedSecretAlt,
      encryptedSecretForGm,
    });
  }

  const scenarioData = {
    id: 'detective_forbidden_zone_1920',
    title: '탐정금지구역 (探偵禁止區域)',
    subtitle: '다이쇼 시대 초기 제도, 개구리 가면 명탐정 가와즈야의 죽음과 탐정 금지 영역의 진실',
    era: '다이쇼(大正) 시대 초기',
    date: '다이쇼 초기 어느 늦은 가을 밤 (오전 0시 살인 발생)',
    location: '제도 교외 가와즈야 저택 (서재 및 자료실)',
    synopsis: `다이쇼(大正) 시대 초기, 제도(帝都).
급속한 발전을 이루는 그늘에서 흉악 범죄가 증가 일로를 걷고 있던 이 도시의 치안은, 단 한 명의 남자에 의해 유지되고 있었다.

개구리 가면으로 정체를 숨긴 명탐정 가와즈야 세이지로(蛙屋清次郎).
4년 전에 경찰의 수사 고문이 된 그는, 연간 100건이 넘는 사건을 해결하고, 제도의 범죄 발생률을 4할이나 감소시켰다.
하지만 그에게도 단 하나의 오점이 있었다. 연쇄 살인마 '까마귀(鴉)'.

어느 날, 베테랑 형사, 미모의 괴도, 전직 기자, 마음이 병든 작가, 전 조수, 노인 청소부 등 여섯 사람에게 가와즈야로부터의 초대장이 도착한다.

"저는 마침내, 까마귀의 정체를 파헤칠 결의를 굳혔습니다.
○월 ×일, 저희 집까지 와 주십시오.
저는 그날 밤, 탐정 금지 영역에 발을 들일 생각입니다."

두 편의 마차와 기차를 나누어 타고 저택에 모인 여섯 사람.
가와즈야는 흉악 범죄 예언서와 여섯 통의 편지를 남긴 채, 자정(오전 0시) 서재 안락의자에서 가슴에 나이프가 꽂힌 채 싸늘한 주검으로 발견되는데...`,
    victim: {
      name: '가와즈야 세이지로 (蛙屋清次郎)',
      title: '명탐정 / 경시청 수사 고문',
      age: 30,
      description: '개구리 가면으로 정체를 숨긴 제도의 전설적인 명탐정. 4년 전 수사 고문 취임 후 연간 100건 이상의 사건을 해결하며 범죄 억지력이 됨. 6인을 저택으로 초대한 날 밤 피살.',
      causeOfDeath: '서재 안락의자에서 가슴 좌측 나이프 자상으로 인한 과다출혈 (오전 0시 발견)',
      crimeScene: '제도 교외 가와즈야 저택 2층 서재 (문이 열린 채 피살 상태로 발견)',
      maskInfo: '얼굴 전체를 뒤덮는 기괴하고 정교한 녹색 개구리 가면'
    },
    rulesAndEtiquette: [
      '자신의 역할 밀서에 적힌 비공개 정보는 본인만 읽고 타인에게 스마트폰 화면을 직접 보여주지 마십시오.',
      '자신의 목적을 달성하기 위해 거짓말을 하거나 진실을 숨길 수 있으나, 규칙과 관련된 거짓말은 할 수 없습니다.',
      '각 페이즈(1장 이동, 2장 대화, 3장 대화, 4장 대화, 전체 회의)의 제한 시간을 준수하십시오.',
      '밀담은 정해진 인원(최대 3명)을 지키며, 4명 이상 대화 시 타인의 참여를 거부할 수 없습니다.',
      '비밀번호 오류나 분실 시 GM(진행자)에게 조용히 도움을 청하십시오.'
    ],
    characters,
    adminPasswordHash: gmHash,
    defaultTimerMinutes: 15,
  };

  const outputCode = `/**
 * Default Scenario Data for Board Bangjeong Murder Mystery
 * Theme: 탐정금지구역 (探偵禁止區域) - 6 Player Full Official Scenario
 * Auto-generated with AES-GCM 256-bit encryption.
 * NOTE: Role passwords and GM password are NOT stored here in plaintext!
 */
import { ScenarioData } from '../types/scenario';

export const defaultScenario: ScenarioData = ${JSON.stringify(scenarioData, null, 2)};
`;

  const outputPath = path.resolve(process.cwd(), 'src/data/defaultScenario.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, outputCode, 'utf-8');
  console.log('Successfully generated default encrypted scenario for 탐정금지구역 (6 players)!');
}

main().catch(console.error);
