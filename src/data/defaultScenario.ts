/**
 * Default Scenario Data for Board Bangjeong Murder Mystery
 * Theme: 탐정금지구역 (探偵禁止區域) - 6 Player Full Official Scenario
 * Auto-generated with AES-GCM 256-bit encryption.
 * NOTE: Role passwords and GM password are NOT stored here in plaintext!
 */
import { ScenarioData } from '../types/scenario';

export const defaultScenario: ScenarioData = {
  "id": "detective_forbidden_zone_1920",
  "title": "탐정금지구역 (探偵禁止區域)",
  "subtitle": "다이쇼 시대 초기 제도, 개구리 가면 명탐정 가와즈야의 죽음과 탐정 금지 영역의 진실",
  "era": "다이쇼(大正) 시대 초기",
  "date": "다이쇼 초기 어느 늦은 가을 밤 (오전 0시 살인 발생)",
  "location": "제도 교외 가와즈야 저택 (서재 및 자료실)",
  "synopsis": "다이쇼(大正) 시대 초기, 제도(帝都).\n급속한 발전을 이루는 그늘에서 흉악 범죄가 증가 일로를 걷고 있던 이 도시의 치안은, 단 한 명의 남자에 의해 유지되고 있었다.\n\n개구리 가면으로 정체를 숨긴 명탐정 가와즈야 세이지로(蛙屋清次郎).\n4년 전에 경찰의 수사 고문이 된 그는, 연간 100건이 넘는 사건을 해결하고, 제도의 범죄 발생률을 4할이나 감소시켰다.\n하지만 그에게도 단 하나의 오점이 있었다. 연쇄 살인마 '까마귀(鴉)'.\n\n어느 날, 베테랑 형사, 미모의 괴도, 전직 기자, 마음이 병든 작가, 전 조수, 노인 청소부 등 여섯 사람에게 가와즈야로부터의 초대장이 도착한다.\n\n\"저는 마침내, 까마귀의 정체를 파헤칠 결의를 굳혔습니다.\n○월 ×일, 저희 집까지 와 주십시오.\n저는 그날 밤, 탐정 금지 영역에 발을 들일 생각입니다.\"\n\n두 편의 마차와 기차를 나누어 타고 저택에 모인 여섯 사람.\n가와즈야는 흉악 범죄 예언서와 여섯 통의 편지를 남긴 채, 자정(오전 0시) 서재 안락의자에서 가슴에 나이프가 꽂힌 채 싸늘한 주검으로 발견되는데...",
  "victim": {
    "name": "가와즈야 세이지로 (蛙屋清次郎)",
    "title": "명탐정 / 경시청 수사 고문",
    "age": 30,
    "description": "개구리 가면으로 정체를 숨긴 제도의 전설적인 명탐정. 4년 전 수사 고문 취임 후 연간 100건 이상의 사건을 해결하며 범죄 억지력이 됨. 6인을 저택으로 초대한 날 밤 피살.",
    "causeOfDeath": "서재 안락의자에서 가슴 좌측 나이프 자상으로 인한 과다출혈 (오전 0시 발견)",
    "crimeScene": "제도 교외 가와즈야 저택 2층 서재 (문이 열린 채 피살 상태로 발견)",
    "maskInfo": "얼굴 전체를 뒤덮는 기괴하고 정교한 녹색 개구리 가면"
  },
  "rulesAndEtiquette": [
    "자신의 역할 밀서에 적힌 비공개 정보는 본인만 읽고 타인에게 스마트폰 화면을 직접 보여주지 마십시오.",
    "자신의 목적을 달성하기 위해 거짓말을 하거나 진실을 숨길 수 있으나, 규칙과 관련된 거짓말은 할 수 없습니다.",
    "각 페이즈(1장 이동, 2장 대화, 3장 대화, 4장 대화, 전체 회의)의 제한 시간을 준수하십시오.",
    "밀담은 정해진 인원(최대 3명)을 지키며, 4명 이상 대화 시 타인의 참여를 거부할 수 없습니다.",
    "비밀번호 오류나 분실 시 GM(진행자)에게 조용히 도움을 청하십시오."
  ],
  "characters": [
    {
      "id": "char_detective",
      "name": "베테랑 형사",
      "roleTitle": "경시청 수사과 베테랑 형사",
      "hanchaName": "刑事",
      "age": 48,
      "gender": "남",
      "occupation": "경시청 수사과 형사",
      "summary": "지금까지 가와즈야의 수족이 되어 조사를 진행해 왔던 베테랑 형사. 마차를 타고 저택에 도착.",
      "avatarIcon": "detective",
      "group": "carriage",
      "groupName": "마차조",
      "interviewTime": "오후 6시 30분",
      "passwordHint": "비밀번호: 형사 (또는 1920)",
      "publicInfo": {
        "appearance": "세월의 무게가 느껴지는 낡은 트렌치코트, 굳은 표정과 예리한 눈빛, 가죽 서류가방.",
        "timeline": "가와즈야가 마련한 마차에 괴도, 청소부와 동승하여 저택 도착. 오후 6시 30분에 가와즈야와 30분간 서재 면담 진행.",
        "testimony": "가와즈야의 초대장에 괴도의 동승이 수사에 불가결하다고 적혀 있어 체포하지 않았소. 자정에 비명을 듣고 서재로 달려가 목 부근 맥을 짚었으나 가와즈야는 이미 숨이 끊어진 상태였소.",
        "belongings": [
          "경찰 신분증 및 수첩",
          "회중시계",
          "수갑",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "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",
        "iv": "2G5VuKg9TCIOF27Y",
        "salt": "4Yy2xUPkolM1ql7safOY7w=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "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",
        "iv": "OskwcZmvNdyCNsk9",
        "salt": "IeGb3cpfAmCGpAKeyBxIdQ=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "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",
        "iv": "SRtgMxag+kikS5dW",
        "salt": "FQMeBtCYY41Pq1eLFS6WoQ=="
      }
    },
    {
      "id": "char_thief",
      "name": "미모의 괴도",
      "roleTitle": "미술품 & 보석 전문 괴도",
      "hanchaName": "怪盜",
      "age": 26,
      "gender": "여",
      "occupation": "괴도",
      "summary": "깔끔한 수법으로 미술품과 보석을 훔치는 미모의 괴도. 마차를 타고 저택에 도착.",
      "avatarIcon": "thief",
      "group": "carriage",
      "groupName": "마차조",
      "interviewTime": "오후 6시 (첫 번째)",
      "passwordHint": "비밀번호: 괴도 (또는 2048)",
      "publicInfo": {
        "appearance": "기품 있는 챙 넓은 모자와 벨벳 망토, 매혹적인 미소 속에 비밀을 감춘 여인.",
        "timeline": "형사, 청소부와 함께 마차로 저택 도착. 오후 6시 정각에 가장 먼저 가와즈야와 30분간 서재 면담 진행.",
        "testimony": "형사님이 저를 체포하지 않은 건 탐정님의 초대장 덕분이었죠. 6시에 탐정님을 뵙고 차를 마신 뒤 자료실과 방을 둘러보았을 뿐이에요.",
        "belongings": [
          "비단 장갑",
          "보석 감정용 루페(확대경)",
          "가는 철사 도구",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "oxLqiR7bbKQ+95eoFtUO6ZFmCBZXzwbETkog1ldixY+Clf5ceu5jlBZ5QzdS0QccbFdUyOdznX/GM5TBvGDgv2ExseozOWt8+DWrru2u3ffnF8r9cm0bn8oUjvZRbsSUqGw8YY29viAijaMw4GL1HVyVcRMaJGHCHJ6DpKJAbeD/Us8y7t7vzYCuqOrCQGmzcD7SWp+VSE4HvAkn0Sjs8ko7JTmK7Af3rjFACEIIzCN3YELprus65WSPxQo3R3DjxHEbMlDKzwnPMSZvAK5NRfPzrAc5yDdQb8qjUR3BiPkzCAC8NC+z7PXyhuEW3/at/nTOubUMdTxYNaYzILtF1wLlBcwymoVdPSZxq4kiYJ3FovvLiUh7eOQVW3H+xVP6BtP9aH3MdWWAO5b/A5/gugk1srdiMIFKb6p2XCuyGatMpdxN+GW5oCtBbagff0JUCGqwVha5ND9iT9491bgeUJCAMZ8sWUq1qCXgYePgW1DKiwtOySyPmbRRfBkC6CstZ6kBpFm2zTcFaavqQPFD7GlzDHU+Ohnn7OKg77QF5tQm8BlWDp1gQT/chGsnqQil/aMy2Sby58UWGvyeyksK3LzG3pQgX8fyJUSXr9r2Ywdpi0AxRoNr62X7HxGGZ8A9Vl10Q1auRLZRegKUaXLUzOQvLjEBLnoSa7cPvTpgUJxnTkGGj5v2niBe7UP9J1ItQaQPsy6zR7Y2Lr99l/LTu1VHzVojp7O7vEU3yUEG85Dr8E3Emt8z4WgxDN0CTZj9OYZEp7SgqMpqmkgupKltcpepuT5YuBicHQwkQNOCWuzsQD8BJz4ZGis24w/bD9V9pmH6HmkF1K751zmF4ro3Lv35vtwpJzJQdrp4BqTB0pDmw4kutufi7pmG0EpZJLd2nhPi+tyfJaWDYfx4EqfulYglKhEwGVwwKsAHO4B0+bh+NEOTRZex18R4joQx10Gqc7cOQGzgDUddeERXUAmXpcpxynaa4pUUjabMc96fPEgJOGR3slcQQz0Nv+aBrf/7Jbp4PddxjwhHd8UmaxWT1zG0dXAFGa5LyMOlz0AfiuwLG4+dDD4ai/Q4bHpkwYlfb5/7XZGjrERp1KvZCRMfogsW6EwiafCD+9lCdU8Un5z8xdm5w8rvML7VNZMUvIch9m81/to1TDHQ3tW60qcwNVblI399DJ7/DfmXbOGcCdj4GYHqvD1bshP7u1XL3wEEKkeqk0iKGU3caLLqi1bn+Wl+AuqsFRFrdPSbofcZjZ580vQyn8q0IaefKOeHXkB85Xn+eTnX1XUmohAvZYvOBdGuJOgF5TUjZ2xdZHPDEQZJSFtIrGQZ8czdDNTfBpGM4mJOaWjLfq9sq4NWjGUXCFmsWNGumVtQEpNIpqnMJiG6SUvl/Z9G2dkXEtjUcdHSNUT6WZghI2V7IAjRE4TqVXnJGtCY2dDA/gRIAzP9QGhul2fTSOO2YQTo+GIOHS4ts7AZArxtL9KLaS704PYSMYOqnroHwGrEbE9kdKEaF8rh1QUjQcW3vMQicWItg4z4mfMnoI/AsxXUMzgy+u9fhthXmLo66qw7nVU/Y+sWdi05AEBQdC0J33YSNhbCfrOEefd0KuQbxBBG0CCEx8dHYFbsZ/5maZ2JNHn++p54wbpxwPbp6KTJtfqMFkAowt94RUMRCvm20n/yjgnhaQyugLfBo1ohaiopks7HhkRHBmlIg5RqJsz0LXwaMdL98bFjZHEafR5qD+tkXOhRvuSuutynkw==",
        "iv": "NMX/UzB1bBzGRR+V",
        "salt": "/+voX/2jLRE3wIXULUzwog=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "2d4/zWy6VnC98EQCkcCpsCeVZY7lAqiHt5Q7gNk46f3Ksavm6PqCMs9dr/r6tRkcM0RdTzIWazt3cO1s7ey5jmTHViq/m6prWfCxKzwcBMWg/jStc3zcNYYNRfDXhgOCw53UOXj+zOjHgGcoGkhaQF+XYjSp3AEM7gVFZ7h3ee6dZZcdge3xDkk3BeUTnbLmJZa5aRlpeLZcHxvBtmq06+0EVhIAR6WtUKL1joVQMIlHMOd/SZrqu2mqAxz01IiqjkSHcJAFrLmEWsb+/CaLS59YYgPgMXo5vi5w1r0oIhkTCYiAS+T2Ll46ADSFGdB3nZqFkK33ju1iApyLtkvegJLDlBKKWkNOsmt6/tVwo4oVU5yZ/+Ksx917zHTTvEqTSFLKIAjSxD9qs1D9drYLgbcgRbg33lRUH0dVwX4K2Z6WtzU2yTg/HbcSgvadn5q1KmnJTh4GDP1dEzMHC5wbgpqlaDD4qQrizUKz7fSMF++7xoGr/Zcb50nu6wPdxvzEL86uK9E6OD8vZ4s6n2ULk7fcP1EZ/mOI6+iAQPcL5xBeTXjIdM0wgmjQFA6rXZE+KEIUdiBlVgcrYn72QO49wE84OctnzTDa0t1BIZ6xVcnpdKU+ykFhxjUNpZyd36hLS2uwMTMjMAkvHBDyNzadF/JJjAwejQAOhiZG7BhwTL54k4lErYNM6UvtvKuCYGnwkNPPFd0GPhtY2KToPBg7SZhjjPsanRVklPfIPM6xW58XHClvfyh6WRKvs2y6jkHZFZaC2vmm1L6/b9VArX/QoErEG85wqiGTu1GlgxeonX/NV5Tfvbd6NLXH/dhSZNggWBG1Wum/NUMLnriarrdh9MTcZuPwCsTP2a3dGF0hPQjg5iSw2uz2wrq+Cq99yob4gAXAD+FrncrXSwUrRov5Jfon4Ymo7f2tAbTFBlMKU57PXvoqRJUq6OlMBjyprqwhEapEsFFLpCGcE6gXkvl5+RA4V2OzVm3JKvTLuPhw/RIW3nfH3tSDzwFyZINezPdGy9k1Urwnaq/s4O1gM/PzJQ6XgTeKPSgmKqcyKohTCh63FLxZPdgrEPzifeWgr6YVi7swPL0vpMhIWbEckw8YAGGskG0UMLpc981B0S5sQ9irELrYhmPBPSSa0RYQCNaWA+jmG4bFf8RO8292eEHgQzP3bnx0rcssG4y8bKf7fWnOALHMG/QJQWWX6owmmUADVqC8H/m1v87yfaeLR1QslkOreSllNLQ2zxokiEMd1r3g++jMpV47Tb5WFqZQcnUqLhwC64naqp/0aSgPdmIJ4vKiG9RtX8QoGGsPtLdEEZ/WhIyq9V1YqOb+q9gxl1eKRckdBBCut/5oPIeYRcFtCgu4unsfC7BKQ9UBpMUSzYRhuKuPfWZqJo3Zus6h6qfz+X8+MjOTi3yXeFKJo/u4L5iaHWezZlTF2wt04qdXDC0LQds9VihJZM+OfS1DHT1HXs2UaG3Nvv3JZKfpFAeqHMt0xxAGEygjutAtvS4pXJnrA60FHGIG9/wd5G+gg/Ozxv62fGGWllehJoq2seQc+Q3izclOUVZfRgjTU4uyMtyAt3TM0kltWB2zkIWAsp4yB6J+04lsn4gIajagJz9hKfFF4Jd4vZc8ldv15ERe7D1hgMnkp+AreCLoqZYwCKHdySAzVicnh8hF/QtL+5xrS5lSwqSozw+XVkF2wYzVzGYx8YG3QS4sLzP1zkB3iiSyyV/Ee4t3CkNjS+ol9IKdI7Q1LA==",
        "iv": "3rrTi4G+CQ4q5FwF",
        "salt": "x2dmLFOvFGqqKVIuDBtA8w=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "KMGjAA4DzZYX6zRtpvuFouLHT/LcDM0pJSYD9ytu5zp22uTxTs0i2U3XUUII1j0jRlfMxp8SUWDfwE8Wn1tPX4LqxvVpWxCNLjLH4kGSt4ed2IMHwL+vG/IO6uBUzOOvSoXj44PfQHQh8Z1LBUirLq9wguPE86st1rvlufDlweBLCoMmTA4z383FTpDu250N3cfGU84vIyzBwI5W7/dRXqJj7EghpOzofIR6lGMH4/Fp1faG9QQstSmFe+FZsbOBsP79E5isLcm1i60iCDdn4ewAfYwO0hJdQ3mOwzSc7Yx7JePdiNkxcuve2j2CmXdDDQ8oJ3j0JQG0xIi2g+gB2zzrGEmwOXC+EDSN7hOIe7tAVfzi31L4KDc9oYdA0yPkOnPigNjovazTWaQKj1YtsXEsCE2cG3XkMgmCvBVAs6PLnOGuMbfVWNXq1lHlEtGLD4aOl+46XzjUEguaAAKowrc8FALJg/J8kY9jtiImDvWt9T1Wt298Wps5yGFB2sYZPU0Yy1hLQQKn+uXQw+FLslWinUChIjPhLL7gmp5QSgylkiUKy5PWiA9r2Him2rs7eNB9rp9FJ+aZZ3xL1yYec4X9cL2OZ4sScOF5ORhueFKRouk1RTjgK7SwYRHYhlAH8BoitktP5vs/eenP1bJFHgayDXKTE0jjQlA993rS6yFrF18Wr5I7l4aU73VcN0DOnUgYsXAvybQDbSfubat+rMr5W0wnQ44JAty2e357WKl2e1CK2yWPtJGHd1/Bs6KiNMlg/K3DTKKD0DWaFRwYnUbywZDQi/4Y9wqOlq+RQIT+dP9N7QLESAfRs0O6wDQNNuF7UJ2xKxc+v7CNhdprbTL87V9ioLFjsbpyvldnCRkJlvrRflgyIBK6MKvRHCI0p8WIX3MgnphpwL4Q+6+MRrvRXrw+vnPJn35RFrs9a+AGhViIFiaRRAneewO2qoYX3Tv3ClZNAdr2pFMzgE4pN/awOw1Z8a6PD6xanwrObchB+e0Yw5325Llrcs90WRIxoL+Wf9zqHGYlKytk3BW0M5p37FlNrADeV9LfYcFf5rPSsLgokZcTZsstDUJkYQTOkc64VX4gDhAi6tmoReI3hZ90cZxobxh2ICeurvOsfBfe8ahfFzI9Fe2WTY6XbpAdnXoitvVGaXtzanDYHK1Um5eAGIjYJHyFoLKmJOU0YizaDQWMIu2PEhZJXtiwb2zwG6LfNCQpatxj5ESGsVDlMs09jjph410jmpBbvk26I7tIPT6cgVGs3l8Bi8ZONbV3ku3kLmnWYatbDaYCcLSRCLndgIZx+SdW3rXSySZftv0ZblUuVi3jdH0pA/aKBbA9Rctjs+Oc+kSFA2yjchDfy5Wt3IxjSVykOxlhKjVVZSlfURW7qdAUZ0nG//WwQZX2fMMl29/XSw0Uz+A/9OhyX1P06DW0VOFsotAN5A0+FDuArPwHMCJJUkY7ANyHwqKNV85mv3oJp0XTZ323e0ZJBi/mNZOEWNl/4ZOb5iai9lLN42BGMKiSQZElxtXW+cdMjgS0+1fntMICXR0VbCIXVJPs9JM5gMRafYQKEnFDZ8a+d8NRdrYAMk8sFt1ZnMKMtxMM4fcP01fh33D4hwVuW7aaQ7WqnppiH2BdEALaKKYRXwNJVbrOzXIfGBvLppo5OfThv9SheWTOfEP6AL1HCRRxBELIambYKZXVlf+9VBgqDYBssGKHbt1hCQO4+StqHZaAd4iSagLLUIQeB17Rv5lkAA==",
        "iv": "9gjgwHF7k6Qy0T9V",
        "salt": "yGnd9ZEJCUHAPU8VhNfTkg=="
      }
    },
    {
      "id": "char_journalist",
      "name": "전직 기자",
      "roleTitle": "대형 신문사 전직 사회부 기자",
      "hanchaName": "記者",
      "age": 31,
      "gender": "남",
      "occupation": "전직 기자 / 탐정 지망생",
      "summary": "가와즈야를 동경해 회사를 그만둔 대형 신문사의 전직 기자. 기차를 타고 저택에 도착.",
      "avatarIcon": "journalist",
      "group": "train",
      "groupName": "기차조",
      "interviewTime": "오후 7시 30분",
      "hasSharpObjective": true,
      "passwordHint": "비밀번호: 기자 (또는 3104)",
      "publicInfo": {
        "appearance": "잉크 얼룩이 묻은 콤비 재킷, 두꺼운 취재 수첩과 만년필, 호기심에 가득 찬 눈동자.",
        "timeline": "작가, 조수와 온천가에서 합류하여 기차로 저택 도착. 오후 7시 30분에 가와즈야와 30분간 서재 면담 진행.",
        "testimony": "가와즈야 선생님은 제 인생의 우상이었습니다. 탐정이 되기 위해 신문사까지 그만두었죠. 7시 30분 면담 때 선생님은 몹시 피곤해 보이셨지만 여전히 날카로우셨습니다.",
        "belongings": [
          "두꺼운 속기 수첩",
          "독일제 만년필",
          "신문 기사 스크랩북",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "SSezVGYECeJB+THi4iupEsfr1Z1MTLEv5uNFgALwHzT6PxYh+tB8z5k1jfELZI+TZjJvZVIOGEcTSFNc8dyM/t8Gtaw+f553j55wRsYfuJJd9kt6gdaEqUZAjODcknRdUGRTuHojjfQMOf1df9xWr+YHPHdFK+tguYmVr27FD6dFfcPVawumg9rRPhjbappQuBy4vc0VZeNM3rSTABmOzG5eujNg+oTqWi8EQY2zfdIvKEgkVsf05DwiMaYUHMIOjDxZfpzkqMkxh3m4Wyl9MoCS5dkQabwgBpzggeR3XnCKyjSGRGociUvLdCFQ6dq0/YvajYT1PDtoYHWOcOTUTOlCyJoEX5pqLczRv6d/JmU+WkaVkJox+mf5KwSUcFMrKZLTEpHw4zLb7d1qKKNJZb1fWQgh9CcO2I5qvRKxEb9NlFBJYapBFuxq1LQuLi6f1s9yddZ9TudNJHKe+0z9jyQYe6a74OvreSt8BsGCW3gh4iFXHoPqIKdmGSec3VIRw0AdrWDWXEqcM8b7Gt/pvcQCn3JncD0Z0cSW14oJoMs7z53WF73HKJUj3NfIywwQE9RKBlf1SYJR332rPeTrQx0W3shAdUG0qn1EoXJYTe+pJyFySkdtnPhXKFPcvF/L+uMIlgdkgR82JlpbCtvLNG83xTJlPkxTYjedN+CZdLNNkXXO+3pp53T0yIMNVBxO5OR7KW9r7D+53IFcJZxCK94cZ0HPhz/I0wgpY49PsE8V4AGDoE5yvDZD/Ao7cJGb/beiSMtBasQ/u6Tq/vfNLrXz6Owmnlqm8qujjGo3cRI0eDkwLptBNjiyPOm+ldtideXbbRWAJOtShtFkMLbW9JRZwiaNzRNbVKzUK6JDYQulMkb/ae2phaJTLghIUM1PA+uX20/v6qHzvGUHXtnd2PX9R/rTTOW8L6E0jBwrcLDwxVn4tT34HjNiPrXhN15IU7EFLMvX0UFI5FKMJcsOuu/PEI+zqKozie/BT5OPnmf+txJ08rImdjPfSJhbuLSY1+JarkDN0MYlIvROyqPDucMpqnEsaDYjrqTm2Nrq43r9+hIHCMNTdFYV7lXzQEOsC8cR1WMAj6DHhyVq5rThU8ZIyUqQIf1F1zFaUfbimc4855yT3bYnBxtzGj2wPXX5BkSppq+0Qoa8vXK7yISBtEycEYPJHcc3PPBpDpwSd9kLfXK4izeyoFiQTbfVMV7aIS9zfjfzduF/CHQbXuHX+ARPDhrEA4IQPtAHb3bjdYNNn1NJTrltfW9JQfeWSbhGapv9/sIXYQpbyVy16iJDWDfgfDQ5fzWf28355xLg7VwBD4HW5ELqjQmVkmJLY6YntSjUA2MDra0Kw5UaHyAxUFmi4SVDEpXaF90gOAgzcnucr5SH7g1B+GVc9ZxQHO7b/QyYBm5QVFe7dvJKd+GPD1CGtoD/oYV34+I+/HFT9MgAznxoOXK6FZ+pWWC2gNwUOgqvEMZ/INy6lkYmHG3Rlie/MwaryWtt/RJi7qoYw1Rlaff3a6cyH8t38uHRKSgT3eylEYcpjhosJ5d0JZWCMHBT2sIbD9dErCSzo0Ui5CHljDl6B0deCDbQfFpdhVX6hws36ztD20OReX0GOYCrsNZZcwbna+4jaF8+umns3Ea5fAmtTz++i0FLXVGk61scKf4t5g==",
        "iv": "6FOyhyFA7TVMfjB5",
        "salt": "xjmY3gxvTUKFQhGEjU50Ig=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "21qNqPGFsHLoJycfTC7BAfEmKT7iIQLljizm2ol8UBj93AjOgVGuOql+4k81xQJGF53hRlCc2+cShMIIfEHeBDeuJKPhPdaVGWa6Cl5806lpvobz+Oa4RQ0n3lOvxFtJVD6Pn/liKPSgJyNGj/GrxB1eRCmMxB0cM/1IKUXhjew3pbDllYz0biAGE1ID18SnvjtmWVfUun01v535gm+xyGBJM52cFsNDaGB15bDD0ggISjDSfKl/NkmieUdz0cCWkywhTKI6yqrdbKIqkwYjQDCTKfm9xmahhSsN4MMPbF9bzeDgXUYDbLaLS4+qVrqjWMHE7/iIeRvThsFFZYDv8yVzN8lDH0/pBgM/jzp2inBM9e8ya/jhUNmoDLuLyHu7KS59YW+8VTrFPIUx/zN3aYM+O0EvoHGWmLfQ68ibt2sXyQQFVnrQzL9eU3dHDAGcJyF63KKDqGLsepQ+bQ2K6pRyAKPDmhJTkcSS35S4ZdSfPh+IXCd6o3N69I9FMt2c2XmgMhENzz4GuJ/ioEf9omQgRW2b+55h5NU9EBWy87v1xP0CdY9yN1w7Ju3jubpiRL4Mn/bMwZhLte2X0cMgi+0d0iDpqM11dDiPCJyCf+DjLwkTOUDKje98+bP76bnPvq3m72TNrtwm9tHMkxG+r471h1yb6tcFCiioz+V7+psD9IyB4EGY/QLlASsDRN9aGvRxIGSOLW+C/twZNjt84EOfTSImD2O4bJ3WI803Msj0s6jA7httM+nE4JkQ2LcBvtoFrReRADRiAwuthvADJoUUyS9XuDYR+oqAOM83zkES1F6UHVNnJzCVSrtjLGcZMXom7VRdcMkf8EfJu8gcJwCRuzrGP2c216r1ovgDlY0xHjK6jbcVHjIe7/w4+vHd4qi0HLg24GgkZ/ftmn44F+tPJIXa6pFUGSLS4SvzexRaYJND8l57E79yk0zuEYXOL0sgM6pLIUHgJ83mDw1m8DzVoZqtayQ3bMysEZekZTZaTB/+fDx/BEsPfGND42tzwsVFCyWWKQTQaiVBGYFbteN4ykxjjsiQaqYN33cysxNpERQGs6RbBXYmxFtdzRvmzqpweL9J5b+FkvelCFyE86f2zrgvwEM3xvVtkd1bsBH/rKBsAjpctOp+i5E5FX75SPD/WbQedSQrh1luCvZgKVD+FbgSBaKDQ+v+r0t3DfFfl7Z0ZKvNDD/HxaTw1zPHA2HHBAojAM1jtHupHHOQLrajKbqKd9s5mpBWPqvqsjanyWbjDZhRom/5Ujlr6HNufoQTsKppfLUTuwDIebVmzmvizAyiJsHvwCZhNnu4OQ+Tp72jqeb/4VGNROxyvZ+In56uao6ftTYRWXpwXbv6T08n1RDTtcrwmcfAJ2r52kRN6fQJRtwrI9BCWrstd7+H05MP3Vq0SurtyJ0Ih2QRJ5tbSGet5J1b+RGo74aqZ10CmOL6WQkJB54TVu/mBR8AutXZMz0dx2ChqSb0w3zVWJhBFGkCbOyzVJ9GIKVbwyQQ5lS6C2KoMH1q2TzL7BpEMjUwo2tKSzKIZ09Y+WHL+f7DYxfm8L5Sds2p/k0GCiy5XIQZR8dN+BQ9v67B6pAhT96vmDQ7Bot7eyS9HNJwqJfw52MXHVZec7lxL7jsixotKNP5ZyQqHU3Vu99YHUpiPbczag==",
        "iv": "vX07tefXJ2t6ikwQ",
        "salt": "B4TJNEBBVrR7qBbcskdGVg=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "I4XD+PqeJSNroy2nWeOoYm1/1QD1ulx9/G1ylzo5/pkKoL8hz+x2aIfTwvb0L5U1JjzLoEsINPznjFbNH2rB/yjXza0JL58X4JWDOoo7Q+9tT8HHyi151LarctCQBlwPxRIxmTy8FrxfYglQfYEziaebfGlp6DADOCR8O5aj3913pK2bvqP7g1jBhXb3OYc737lvo5LliDdxYlDCqflZZIypugSUpws9nETGQeD4/6jMTkxCh9nT8PNiISzN+ulpE3NOc61Kl9RhalF4ay2so8uFAWbPOMl+9DWP1zNC6+Q/hjSwdGOsRpKnWyyG8Q/+4uftOfSpPMLyzANZaG06khi/r5qVcA7VvQcyXgYIopxWz+spEd1/UEgBAoylO000Lrs3tUUMnn5FQt10lne9knmGke/Z7SihpHj/vl/Dje6SCOOwtmZ877um65s/Nmb9XFCV2T9I0AvGfHeq8Bkm82DYIEMnNPhLLtOFxM2Reo/nBbWkDuyOrsIUaNikkLL8+24+UgCfzgx3MRm8LQTiPr0OYNia/31KTCX0AqLNcovK2LqsSu0HQxTKf+tcdA5AeNYkHhChNdy1VaMZPGI0Ua4JOTf0ypEH+34lEuY+k2H1bPEjJI8Upd/948Ppkt5yOnta6cHwWEXCY8VT2ClkKtzUrx6cilNQQgexKRjLDxJqjhHc3gvi/RiSlk54HoEtKeRwTMp1cH1bp6tAecy5waNZ2S4KkjLZQJlRmA+MXQ3NZ8C5XTZuhH0qtuPI+/bKKfLGsgiJhZ0XRH0ldXxBQ6RjZHGxbi9eow2Q/FzzO3iDYuQFk2DDZqApJ9eMF7mW/qokVvQ3XEbChZaVlV8iEBB1MoURpuUpvX4391MGUcqQFDcL9imNd18SOfCWSGr4b2MC6PgNx5m2Sv7DLlBnZvpH+VZ0Ca6viPxmWowLfMycBxN09oQt+tBy75UWRp23P8XFXLEqYGFB7v05aeti5mxYnRnkZ9GSNjCz8W7LF2bNiN6DQhLMU5bLsMk4TJNDLMD1KpHouScToauYds4iNOsDh+u6EsXdpDdOB/ZBL5D1363vh8B+3deU14zaul+F5ulqOU2ofQQ4HwRPlsnXPFdoos83qaeQFzEZUWLl+P4Km0Kda7F72CMaZzT83Jg7ba4JBSh0UeNhSwZn+MBr3/wdz8RBu0hVexUoVq85cQwFV/Wzo1k4O0MjMcccdYrDjHEdsK+iVPobyrbVdTIqECe7PaPG1LlESjDtpxVZ6tVdllzwUb3YA81sTHziRnjhu77PfYSOwL1d+SwxexCFAV1rRHYucNnLXWhkaPWgmLi8wSRnAOe+8CIY5aj720rpF48IDbwSXiyw0F4wj8TAteZIwrAJJSs4REEXDKFAVQXyELqOrvQwEKLti5D7FG36q1byFyF3XxWbYvltwHLRqm/qiCXBsz1yJrF4ThctTYpDOc/xkCfoaeFoFrxA4icQKuJSSPKe6b91ST4u5QjLrBhqUMJd2XmoAko4yHmAPLsxV290FNyI6qir8te003snQ0x21uF8rgvJgRH7E3+TKTwe9hM6iEbB1/Mx5R0a8bpD/IjILcDjfv2YFOC4ud5tia3XBq5/K7Ir2tToJfdTioaVijv6kUuFWVp9DQ/yZl1bCn+eaS1o5R7Rje7jkcx1SCPi2Q==",
        "iv": "vDLriIJqIXiJ3ZZU",
        "salt": "71SKysua4Tsceifrr4GwJg=="
      }
    },
    {
      "id": "char_writer",
      "name": "작가",
      "roleTitle": "슬럼프에 빠진 소설가",
      "hanchaName": "作家",
      "age": 35,
      "gender": "남",
      "occupation": "소설가",
      "summary": "꽤 오랫동안 신작을 쓰지 않고 있는, 마음이 병든 작가. 기차로 이동. 자정 비명의 최초 목격자.",
      "avatarIcon": "writer",
      "group": "train",
      "groupName": "기차조",
      "interviewTime": "오후 8시",
      "passwordHint": "비밀번호: 작가 (또는 4821)",
      "publicInfo": {
        "appearance": "창백하고 수척한 뺨, 흐트러진 머리칼과 긴 코트, 신경질적으로 손톱을 물어뜯는 버릇.",
        "timeline": "기차를 타고 저택 도착. 오후 8시에 가와즈야와 30분간 서재 면담. 자정(오전 0시) 서재 앞 복도에서 주저앉아 비명을 지름.",
        "testimony": "잠이 오지 않아 복도를 서성이다가... 서재 문이 조금 열려 있는 것을 보았습니다. 들여다보았더니 탐정님이 피를 흘리며... 끔찍했습니다...",
        "belongings": [
          "원고지 뭉치",
          "수면제 알약 통",
          "성냥갑과 담배",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "+V/gTjAolVzGAY+3/+sXgnxFS/v8VHIINztx7Qqw9X0IzZIAM3iUPyF3FADB/GjVsrW9sJ92uSl1Ap+VQfB4CjKOnF9N5DHFh0ayQElt7tHt8XHNLAyiw7Nx1BqA7Q2Uj/VX+64p3cgHYfLHGTPIVrb8vbDEYnNOX4P77ZsnOocuefE9ZaL/FZEKJwWfLJByrcRwiZgRux1bIIKJiKvrsAA26lfOu6WRviuvD09Q2F13xQcU8sj8/R4j6v2r+Qxof6qGbSdG1jOpbq10dBYLkX66znpeLPdXXwEZ7h7o+Sa3cx0/8PmxR7OQeGQBRZaLBVb+XWi794YQplykwvDaKjZhnWg75WaB8G8rkahmQ82plI4NmbtW+OHouEDntpW/eaLy9NcJTgLMft5G2HqQ7fpidhJd5a4RpYJVEQT0dk8I5EtdwxViYr2hx/DD4rA38WWJEJ44EN626xVJiUAQ8tgqGVkHNNGCc8Dr82u2VpqAHEdPr2aY6B3crCQYasZxKvw59dpi0yLZ6y92r2R/QsxnwjFFBXEhg9rSyxpo1HJWIJG3vhez7MvBrCgP8a29/rIRI8OIvSajy70LJ/cDJYQwY02Gk3s5vNp2pVzW7RBKp1BmeQwBrjM98m0DjvaZ5GizJq7w+8oOsqHe197/oZ+PrNgpJfo+adnqxn00YP6jFrHUiCNXuArkGU8vGW5f5CeAIZXgUec0ZAWJGZmY6SKHtaHD7VKtpAJTapVIcUkvXxWchcJaCKCRHugKuSOx6ySSMsrirgHcf5uTL55bmpxMq0bXMZXzDuUXkH92EkTl/ytidYaLnArNQVwmAKu39e6eOwPFkjAW8lkE4+SUvvPusYd49lbDvMK7SbGNNtJACcmF4WZpHGR5gpyN8YwFnZpkBjcbBRPslUY4mtud5BbG7NhXpsk0VeS9wbuyAs7KY38XWLFnUQL+PKEIQj8uCxzk6kVtN/iyDz9+9W1oUs/BtJnxvVzuFEGEjrZ06WQstLNTmPJGiN0jK4Q91/OnQ21UvA/wwp33HqL6D/wKJNdHmKX4k8cWJIrlFIkv82svQRoIchwwetxiavTbnnToCyx9M5kN3hFgtquT+wFxrgXUlIr9c11W0WM8axKanT39eCrEw4nQhKbOJXHvHTisqFe/XxEmAXb5I6W+SDUes7Hwa0d4oH1HiOw9C+axCjhqXFBjC4hacioy1A3WuJORP6rvkmAJxCrQ4LUg5xx8xpqgvG+OKdUYhkxLrnNw9pKrp0R/xKBkDa1Yw6LgSW30HbVhCXqWtVinXwTzWMRDnMF5u1kW13nJ5q5MMAZTyxeN82TusTh67TCnrXTsZYspRlkGV8yoqHa/5EWI8uaQnW87Rv7xh2Z4tasjp0MGXWMYX7pmq3GkY4Os6uuiV3nMy5Ozl3W+C/vUu8ioPNql9mDraBfiEogzLV70GjFnp/bunevYd2cn2BZGYuBKpB3Ss/oT/B6dgeYuomgj4DyYoEqAyy2fHvDDcG+RYb+hEsl90lSrAEuV1YpaoVkoX2m31ud+MAHBmXPBpAfp0UuYOiX4TPg4pNzugWZgSn4OiKvYSLEwJ3bJl4WA9Y5WsLx0C2H5Hcl2IFn5EhGkfXpY7RLMfMHouaNLfchGXxlgrUN9LYQFa6X5UH7+LxDA5GgMjZhL/9fTxmf3Yc5NSE+6sJfURXpQ1TaxhYoqxWkSROxhsuFf/oIJHWjoKI5BCbVkHNx9+xQREgINf59wwRgie/wcG3UhNOJG3zHEkkPyy8gAqRdGBVh08zaP2TscEvRbO+iFnfN5hIe5pJxlXdVFq+FZyEbYOe3t23Ts749+s9jIxsLc7uj4tLV/HE+GLaCHHo4WHzuJIngP8YGx3jjbgIgyWu0+7ZqIXzkvJMMhrT/5n2zF1FDsh9T+uX1O4PWtEYHvoLAwHvK5qOdFFgetnH7SOmZyaa+35lCKs74=",
        "iv": "YvsmAA0khU/V7P6Z",
        "salt": "IJU2TOFA51wyOr7arVP4Ng=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "reIL+zKCgN1zYXEGz32VwPpu+oB8gXQ8xjo05uZg4hgchjszF4dXuAfu/qxr0D8BbtTGABDPujVtabDdDJUPOn4892yTjcB1dUWaC/4Od+Llgo8Voz7FiPfv9u3qK0u6UZCBxrgiKHZzWNkIA9i6wnbsZwF4l9GeDDo7R0Fj9uzmACgY9nHA6dTjCIRuTzD59lsF4X1apoDfFKnI4tNeddqJUnBxYZcrMJs1LUMg3jVtA+fna5hKcN5gNYL6ThvqVRCiXBWuWwx78gt6rr+OVqZs4Esm5tOqwh64bz54AOu74iY3yhLsCJRSLuxoxf+YbopjZNNDIvdKtpZYzsvKwkE7+uI/cdia+ghy3LfIi8+JxmpoVHLvgilcZ8bynIL8ZIBIlGxh3HmoobYu4kPhYKp/Fi6S/3UKpqAQMI3bRq3ku0kV+IsIMeeSmJq2qlWfGTmrhzUzg1MEGSFoxudn35WBtmitoEyi7Rg17wOZG0ghCMwOb1HvKYv2I5t4yBPy3+zpZ/ElMmWn8igCPVt3KkbdP7KGfl8Mp7TyQ3QtKfFPBz+LRkJMUxcnTmIKqO7LhA+CojKjombfJJcwBZNGtrYbTN7UB2JssQsnITgfQtGkkr04kV/QnVUKGrLJ+lvaSuT7iaLZBMycIpcPpOtZeI6GMIJnZ+3/We0C9hk5lrY+gLQvmvXh9r5AKeHoOqO/UJiV9sL5ljHjdZ3Tn8GBpiCqgACKguG6Xr5DrPK5hUM+3h/sgLp6eZoiB9ydcUovn9vomUQViL25PgRmDy+SULc7PcxObgmDUuldBr2KwKgWsL3UDEcS87mgAOozDJDUt+s0ff2QbHX9VtT67Km5mypXcqQPNXuwSERfRnj7YDr77OfNfEfGHJZESJKNgG18ZBbb76fihzKne6wF5Ma0sGKZ1dUzA8qpg9pu7wNpnDl95T8nqnS7ooO77bXUzJqBmB4kZNGuntEpcNqDfAoDRZL7yQYw5xYTSd7axuocmBy+wu9yMYIbyf3jSH6RVpt0kEor5CFbh5V9Xntyo1zrCbBXZH4idVKxJjD1szRexC0IAosK7CjyKEtnm9uMhT04ITQwnoY6N0VIKAnJHzHSvkTi7+ivRR+zEfyw/HBpj5Fwx/qaBeR/KdCfTXTsTjwXziBm+K86zGwyZHKeOR7umCo9+FIJGaCYOJkVXEovGW0eL1XPGBFFlRGp0Cr53i02yoOMFq2PjdDVsMaTHZhnBuAC5ICPDQCeY5uf4mx7x6un0euT+9NofpMf13FiT9W9Wvg5v0tMAvFed0gxCrqT7xMZbTO+liBg+bt4AXH2/suxCkX9XCAnNiz9huuJSr9yKKV+rOGP3WE2oPbMiY49w/Xgj9n4L37G/iePK/UG/vB3UGLANk9O6vSWtUNxC/EUdUfQnlIqt5sIgNECSCO5RXi9Tg24DkpfbCEvpSISRV8TpAvMQFAtGPb8gZG4X/eOq1bOrk0T9tMPMuUrS3gZTS7/V2+19G+BDAMTkT2EO83gPwkN+pg49/UUSjhbNa2yM1B11R/cCgqa1MU0DQ7sJXWFklh8a3wDNOtSdaLkm1wccKYAsBsECWxDeYBPS8IYY++G0FqcLi9XcDn1XaVNIhnhBgq0LckVLVJWaSQG8fiVu5881eZn/89hS7HSVpsgtvBi99uoNgVQRvaMmTbyuxEfIEWrKZq5BctimQmuQvdYJbYFIprsnJT5g06YKMYfVA3UNfPJFsHo34pZwqz3v5pa6+6q+B128k5lz0bCe9mCdkTnwDaJ+ySE4ficwirhSN20mpqpbdVd5UCuKtS7/isz+obqIcfRf4VGk4BsNW8UbiTT1/9KN5zrMozryRyWAf5DqQ+3wvgW37CyiYyqpaGd1q54gxqXOeKCRL/3cmmz8TJri+BvCgcTti2n2Kl+JdA7vQ15BFzmOB7Z/LtIVEWgynC+6M+oYNk5MWI=",
        "iv": "koSSSipttTjRRlYC",
        "salt": "+nGJyYnJR56bC8lgP10LBA=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "OzM8NDAhM3aJNyULrToES8Yv030N29vwrm+xXyO6xWeYogciRt6R1yRo1BoMOK4kXlIKrwJ6OuD1Ysj376lvYaJ0joED3vI3mY1eda1TF+LV9S6EgkqonRZXK+KwdJLfQxfs5ilbw8iUNgDnVoiumSL+4Sx/s9DBmoKcLAC0T+rCcRSwVWboXNLiQIVHDFobvcztE3gtx/p4US4ORH+3gTRDIY5r+DRtdgxbhD+sznQD2f+u+nolCyE6R1zNoNx+pdaPC6SOHiQsfZlWkeyVbNbZG3HfPvPhA/eNdeGRZr/So84Yhx7E2cFIPp/GT1F/7Kn1poGywLCnHlllOXnkMDiHIEF1QO8b+1cxT22d1H6Cv8oRFnpP7bxUwJFnp45rHMKeYTXZLCz94u23cd6Fpr+vEXaXC4MRWq0wW0lFhSy6bo/adIUbIBK9NiJTNAhgJkpbwjhbwq/4cDssrURNBkOLQl/CGETx51K4HM7oeyYhkk7zZBS21E9iY1+/U4H+zUJ7dqhhwJCQxsBzlNjOT8pIbdQpSbhyqI51BQuUupjtKIqorB5BXEIKryL05yoYvGYZ/B8azXD2lpUpkJROQZ3B4QSiU1S8A4i+nZzwSqEbATjsqUKWWG8oIQ8D/zeklHKIR1QIb0+wNibXy6XA8gU40yXGNJCkddfpyq2Tu2JpLhHYTYovUbDceIYH2YHX/ZJZr5F8fXAqV1Om24o7aNej12D0Dane193oOt3juwpG00hhnfKE4pdtbs5jXLIqONkp9UIzbO66LT/aG+m+eNgdBvMZ//cujaJStwqoPyBDDLX0C9BJ9hFl/Q2z/gxRvvJSPs6urNSp5SGdcduSj3sKMioQkWOEoPOdKKesicra06aYYCy+6Jwhf/6YV8VODN/Ilb6Pz/pN4kYjUPljULQTEyHdImFfe7aWG8SNVwS9+llPHSohIvFVoSu2ujtaq/V+jDp/GAPOLOILCM5c/W/rG2R5p13zQLomBSodGBlwqh78UhLyNveEe8ht7qJ7vb+0NonPWVvwxZHRjvXPU4D5n7uM8aI0Kcaxshpuia5zbHipJ5hBFV/YOwfeKvwfs9ktAlNZLLPiLBx/Hox3lT4Hi7eeM4ai0XI84dZleov5+RujDY283vaAOP7SQMxxbuyylTaN/JlJAYYLMppowuHdo11+BWD+CaZk5dXGCG5FzPJADdorfbrsErvOBCFY5eJeZ94eq5vf+aOguAr1ymXZyczNoRCgE+5jfrF3p4ChBhCj36yn28v+sLNXTR0AqZTWuTuDjQb/gxTnFZIcPTIJOE0XA2XA9X6CEblqSr83omAmCBhqpvjYwvE3QJGbpLy9BW1S+CsL//KWq53gCbB+8gRARvj4SXbIIoWlZI0ETLuUsjEWEA/CB75dvFg0WhyZ0z+rcgHQB/X9YKda4JwJzdUYIGocwi375HUg397xHjVtYMR5yhZw+87Uivdzq+HNnHbgEVaHO4nXPuhRHNloOk4abmspkyBYaVWRyjrzBHXgyryy2Rq43l2IcJI1VYuYYJ1igjvQDmJvYJb30NyfmoDOlNlbyNnxPDJ6XsMmgPCmNd2L+p1psBZr88HoZSEtqAggRkDAI+HxExBjQwvzlAHm9TTJB6kpOox5xlL2q9cEtQUhGuJcezowCAeGEc/a+Sj8YbNDahWajV4Qw0RZulBZu7DBDDds9coX/+9Z5Xr9cUDLoCFEznXekjMjOCb7EG58oERN83ed8lXNYpL5iYjSGkIkcQ7h79PWW0WCM1SREzbl5D6zE8+V5QZssPcikC+hlk4hk5dB8OMm8MB/zMn+8474YKpgTvu2Pp4lE0gpRbiAySIO0R2AoIHG6eluo7Y03eQdc919o4iHgGd8jD55lpafKpTAp/lAigaOOYuix96am+xTjsTiK0vM8Yi1qZ8mnseviouVvhl6H8JRUg9M9If1iysNRn8=",
        "iv": "uozcIvMx44qG/g0R",
        "salt": "rH7gcZwYxmMPEEuZWohSjQ=="
      }
    },
    {
      "id": "char_assistant",
      "name": "조수",
      "roleTitle": "명탐정 가와즈야의 전 조수",
      "hanchaName": "助手",
      "age": 22,
      "gender": "여",
      "occupation": "탐정 조수",
      "summary": "반년 정도 전까지 가와즈야와 함께 생활했던 그의 조수. 저택 응접실 안내 및 축음기 조작.",
      "avatarIcon": "assistant",
      "group": "train",
      "groupName": "기차조",
      "interviewTime": "오후 7시",
      "passwordHint": "비밀번호: 조수 (또는 5279)",
      "publicInfo": {
        "appearance": "단정하고 청초한 하카마 차림, 차분하고 정중한 어조, 저택의 열쇠 꾸러미를 소지.",
        "timeline": "기차로 이동하여 저택 도착. 응접실로 손님들을 안내하고 가와즈야의 지시에 따라 축음기 재생. 오후 7시에 30분간 서재 면담.",
        "testimony": "선생님께서는 오늘 밤 여행을 떠나기 전 중요한 결단을 내리겠다고 하셨습니다. 저에게 축음기 전언과 편지 상자 관리를 부탁하셨을 뿐인데... 이런 비극이 일어날 줄은 몰랐습니다.",
        "belongings": [
          "저택 응접실 및 객실 열쇠",
          "축음기 태엽 손잡이",
          "작은 수첩",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "w/HbEgbXfB9NgqhfSOLQy4nVw2MPXC4ueoAB8Em1O85g+0cD/I63sZEFxxqIgLL0EMVQ66KYIvr1WtGbLApmD0KHXwud4AWmYIWUP+zhTDP+zRuAPCX+K8WNVNNYLbqBzwGsvWLyh4LrsiYOSeeEsp5tlf0o/WYb1Wf0onAXnlH0eTyAjEXt+EaWZEafO0d0lhxQnf3vTFxqREXZlzN6R/FXzAhgapd2weI2S5a8aEYsYwLJTIvkZZ1zo85udESTrS7I0ItIUhcgWdpWeFp0yc0EJKT/OvcMwQaas34JbzXntvOiu5E+AXGatCzW6cF09OWSv+aCZoIlGs2eu/VcSbNozzglDrdQ1KWCJYbe6CmdHCoCxmCznyeWyzcdgx8mljLZf5CJxoQ034+yLpFsJ+602+G2c9e2oU+eolo1S9D+F9T3IJxkrJbTT4y4n+CDTQ8oYaacg+V+yQfy3ejaZ1OU1fPV6q5B/ScLhU2Q0j+CO8wl7xTxgrA5XK46I3RrZfOEPSQ3QqlMO1en+IlzqkZoG+tnUEcj2lNVaHszde+wnc6QM5lcSKLzS/jCse1jsYcIuOeNom0Kd4EA5fMpuKJysJcduR1G+PddRGUT+uD5J3ZrVLH6pIS+AwouVpcUIJoAb24bXWacu5dLQQfV6GbJ/a01Tj75rQriut8VVaRz/tbZQVKLO7vByOM7wLPjRlNcNMFkQTiCG0E6B1UJl4Grxf0Y2j7rcmzqby7kX7ljzU92Q3VoVK0u3by9FHeZ8WSkD1K3OvwaMwlQao9oMn4quu9czhqTsfA3mvB37alQF3TRHDZrHBu3ZHQbfvg6EC3Xjoc/yRQxjFlbwRk/ZvnMagIdAKkj2LOLp2N5N2AMp56Lbj4RWnIRmgsKiHCrTx/E/aTXDZAlbst+sICnL7Mkm1ei8MLLb5aOgryYkcHiDx7RnoMgCD77pAJxFW/ALkbccfjGWYbq2zH3Ii8ap6nXpUR++7amcKUrsciRUZQ4ZWs5HfypxgavpLTQ5cWjr2KyhhqRb+zkptpSxLyGl4S9vIDNc2owHQqIQEVy2jOTBu9NlhFvNG6ZjuHgxxOLtCXBa0ZRt7N6YshjUbm+tDbC3a0m6p1538suBFirBiDrNmvls4imqlsK7hIpLZK2RoUlraQtzA6UW1KirZw4Nd6rlzWdq9uEEnWSoSitqCXuVDs6qWlEwwXYkfbJWf/vTEi2PinFDkirrcTeYn6ZQLCglSDLo600PCMYMuWJ0Q7jJfeowHY4HeihzIrQiOsGan+9LQXYuvFY3cxXmxndL2Xsn79GF2upfjPaOtPmVC4u7wEabUVFR4WqkTrCjZbV/GRQbrsgVkGwBcVEjf/bZO52Af14LlA1KHb11R3a+sxx3Wfb+faQ5G74GcEYpIdbpvt+ZxRVk9chZnPdPdfQdM697MxPJMFN+ccpFtDuUJBEsaLMb2awWjdgpr6YQ17lCKdtnGMdOwJrEonViH/2bKbWtJB3TCKcH56A7UX+lA8k9B3TEVf1I+MI6JHevKHfciZyX6d7l07wlDG7O4E4DcycvWKVbBwxKrwuSba8LMIwgVe5wbfrC/8esfhWKL2XjQvemgc=",
        "iv": "HQl2vg9v5++xUpeO",
        "salt": "ErJRC82MZ+oRljM7cddLOQ=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "erIfSWez6rkh6c2dYOCJpMDgo6cz2KyTr6x3/G6E0/wfUGdOpgVpg5wsfFewZmsii9KNLXTjsxLbcTnocspk7OnhLAHfDUWT4k9y6Fo+epQG3RzkwuGgeF357rfnk8WhJDDvVMqQBvOZnVGjaw9T1ECEdoTmOoY9kkCV0b28hoQjmp5yLq05+zaq66tWXC+MI3DnECV25Nk2oUqysCsbJeBSpGiWQRpv6VDJ/7w2XnHb2S7FzPYFYQZwXydIRhBO+zPa2a4Q31y8XfeabXuv3JZSarYoiJT1D91x4NNJDtNoQBZPqL0ZkCoYagT51s9cUUUKdat8e3J+hWS29zyn+CQDeR79gndLnQwI4gUhZmfOEZi4vMvw2iYp6j0G/LAA8w2YkTiVQlwi86TNu/xrHpXaxnrXrge8v0XDL2r/eW5zc+CEh62IzbhXqms2MdHw2fJ4uwYcbgB9bBA5rp9AsEXWM2hfGLKopxW035zaSAB4JNJPcrvwlrU1CU9BriPaHtWpBFtpAP3aIinhVmXagJ6jdJDbTp/yp56wjugQausGxqkYfNdkeIl7bY86G6hopXlMMm0HhWGRAWoZzvKMKJmsVkmJh4ssCVH4TBRBi/b6S023Afa/aDIixws1/ctfEwJ7F4HKU368Eg/3iNlHL+Rc0caoPku/JEc56CFvsMyNol+avjL6xBosQw6/PAY4l6MnQEnq9ws/BlarxvXuB86L9sLDFNi7DB42RPggR8RwfDkUYovwvuulZZ5pXQg72DgZNBpuljhtzzPvabAT8Tp8gY7YFpTAXLHwrjI2WjYuBA3RCpJncxOByNp3F5yo4G+I7vj8VzvnIfhbNPSx46Xp9oF6kpIUNeXtZjcBqXmUJBZnfic+rLMfGbmX6ZB1XA/O7DUaT72nuDaC5JCVfXgCpkAVdZWX3HgcvmyVxNtzVrXTK4OqukbpbcXDxW6On50KSVcYqwpZ0RNzC7ggBy2P+rFCfE+W26Pp8la+fyJVx+C/bMMmbmQu4JKXcWvCI9TEh/tbR6b/K/3pJn8X47mbG7qrDummcgkOSiLfp+HXoJTUgXLk7uu9abqn8zg5tmjnC4EYS3jacGmXXHRFm+XcCjlLQkCjSgchCV6Lr5BAYuDBo5KS/+EiR67IZ1uJFoGiYAQwhArCbontnhRsX41a3rlmDjFv6tvZW+EDbV9YLDc9DagsPOoIlvk+0JY5yhgR7IB1PejebkEiw54VvNNEwh9imYvowkeo0tyAn/72r/tRpx9AQfg2cdVrxv+ifb6iarw6lYwbsZT9wkyyUsDqMw1wb4fd6XULILeyYrqkWdd+glW9pINzRysh2HEXuOZu3LmvZPgdecgf2OXgkFE6BZecILewNKZ+O+zaEPDL6JK4MmJ7Ma4jHeVLXSs8+zyYf/T/qlWd1qIOONROY/9UnUSLUw+RIgkYkSKPPJ7f4Rnqfe8VSJBhPDNk7MKkUWBBniNgTRAM4sRigVzjjCpDg6Al6HfzFtihypVtvTIxz/XHJmiEdpDcOxnsj9eKlMOSvV/PDlXM9F3zlumrkw3JhIqX5MFovPdkdpILwFrKoQK0ZBAnqeaIB5rtIx24QNrlyG8=",
        "iv": "mqKBeFc7IkETX5Ki",
        "salt": "/M8zSFgItwCsL4KjNHol7Q=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "dnYtOUNhUkjY7so1/76dy9t+RM+io9Dwo2pjCx4iuICLIIJ5oXtHdTwsJgfmHbZZFrhIiZSR5PTc/rnjKW/ns+mk48cL3feOxcWwgE7vcyn5YLaRn8LOtTNRucIn5euctdDgnqNsEW0qXdxr+9K5gaf/7t4+zpFUeKT48lR5fXvEZnnHw5TnGRguGMrr2UOz054Vi9TazBqHiRGmvd1NcXOUCBSmafSSINKstG9SPvqw5kERN3zOp9sWyhZjhPOQdlryIs4pBxXmJTrSlRmFEdMoVi5ssUx2WOrJ8gguiZAsX2u8tU8egs7D/hctglm3k5Xa3Bh5BqK+X4IJKZ5seC8w+K0XTHrvCXOIAIMkoun5PRIoz0HFSHJBc8FXl6BUd4PXaNYXhZCB9OEmnnjdDiaGOGzEx00Uid4q7b+JwCTTUlP51vfbgmddrl4ZLaT/3HA2mODUTTWBR45/Qp8xIHzx54jgqNKoZEBYFGOVQwttAtZCcItc9CpIB68SRaMSt10kpO0MPie14zmF1cK9FxpGgWPIngqi/ktChFNTRK+7WIBIUZd/ZQhFUHJLOaMC1Mc57GQnjq7nClM57q8t5Rx+gsM64hqxwOIg+Yqm7Wdbr40dqcMKf9IwsV+o9qFCxm/TdswV/VGOZoTOqQ7CZIyjTF05YbdnJ2xKAG65qB6Lbt6u5j+cdMFThebYq8HwcdvOdNhhlywPn4NrUah8+B3K/FCZJ55PDZ9LhgualTHcb+rmmRzrrcvdlhotjdkwR9ZZE1qDMzFd9rnTBk3SsWcJV/8pSX1yshwD1Q/Wm0Nx9LU/uopUTnfZ52WZ9s2mxLwrGU6DEc32GqY7U9497LvXOC7Dp3HCU3X3CSYiH2eoBKbigRLuQQ55KP6Oc0FHSonPq+P4mtk3LsYoUPmyi3DGbWUDOy+7SYgh7tPHAEouNVllVbDwQxng5Hx50++MChL5KstG2sqJWXD7azXCW6DDPaTjLhsIX0I58/00irri4FEfFDS78HZ7H9dIWVR1wTP9DX7bcO4tnADmCC19QUkNuHD61LhCHE9DSGVXblIg6lTMIgL+mm1j2nlK8gM4r/GVRaNZcsDxBVXaWe1zginXV8/5Bz5oMScPZmxeoDWHM54HZf/oxy+x9KmGX5oCxcp2bw7FTykrmktjpelX7KyhQwQV0CzPmsUizxWD0YrncZJuovo8r4uqW94q5PKLMxoRN613hw/o2iJ22xj/EMse/3BNcADxPUBHGEfZ5yGI7lMvr3MaemqdYY7wnsZ9KIfKWjAWAGRvXP8HwSV7UY+6nsBY6ZGJr/ikhBPgRVhATGCBe04PKnchyYkhJHre28LMoofBj/Ew3n1wpajF65LEciuKBJEizBHMd8GqC6o5hCGe3eXWCNlmC3gknmb5mBNNe74j6nylrzqSxUauG2+2Go2IcYDhzsyHBvs5XjbOa2MQ15vh1Mcm2lApi2k6t6TWEvHmxIfAVAKpSDZFmLMB7WzRcxfddQKDuCd+nL1Vd0khEUPZhZ+u3vIDY5FU628VTxoAhcr/z9E5CIVbQagAZCQ/5PPuD3uv0KqdUE8uhiYpysM8oYPEAn26ZCZRHrVYO7w=",
        "iv": "Lm/7FKCQ9WuXFcG/",
        "salt": "t8f+NWtAzObxCO1x4Lm5zg=="
      }
    },
    {
      "id": "char_cleaner",
      "name": "청소부",
      "roleTitle": "정체불명의 노인 청소부",
      "hanchaName": "掃除夫",
      "age": 67,
      "gender": "남",
      "occupation": "청소부",
      "summary": "정체불명의 노인으로, 청소부라고 자칭하는 인물. 마차를 타고 저택에 도착.",
      "avatarIcon": "cleaner",
      "group": "carriage",
      "groupName": "마차조",
      "interviewTime": "오후 8시 30분 (마지막)",
      "hasSharpObjective": true,
      "passwordHint": "비밀번호: 청소부 (또는 6832)",
      "publicInfo": {
        "appearance": "낡고 빳빳한 모시 적삼, 굽은 허리와 깊게 파인 주름, 그러나 번뜩이는 안광.",
        "timeline": "형사, 괴도와 함께 마차로 저택 도착. 오후 8시 30분, 마지막 순서로 가와즈야와 30분간 서재 면담 진행.",
        "testimony": "나는 그저 저택을 청소하러 온 늙은이일 뿐이오. 8시 30분에 탐정 양반을 만나 방 청소 이야기를 나누었을 뿐, 그 뒤로는 내 방에서 쉬고 있었수다.",
        "belongings": [
          "걸레와 먼지털이개",
          "마른 나뭇가지 지팡이",
          "낡은 주머니",
          "가와즈야의 초대장"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "tVC728w55doBWlIy6kXugFNnzHlK9C3f0WYvs+czM7EDNkWQejqCXt3KK7R+hX/J1O+lD88/wMLUBhz2PYCRVBflLFAw6N7OM7IAhUEBS51AIRmZfPDvOmTl1YuQ9oNZTtyBB0BdzTcBKu1kRYrrYMkvF0NKqPQTpPkkaOn2Xp4D7C8ES1MHd2nwi7B217H4fd0Yrqm9p/GF44rKKgixLS93+Pnu3KokQ+Q4E0YZHtVZCBd5+mZX06eIx97u7vgn9V2gie8IlpfCNVJpO4snr5ivE1pnuUQem9e3oxCi63/oFEJBA9NMXGHNiSwCxFkrVPX6rP8qFCj0fBBgaLfMd6VlSHEasYF5MtERONxktpTBH1NtZ4ZQ8MVsGVNGfbX0/H/92bH2cQ74FpR4wFU5F0pTEz2hP85h3elUuQPthX3A1OY2P9rRiuEp14rJbdrzr1Ml5g164TjF7vO+xV8aN2hziIZZyNNx2CHROddccQOm9RUSyfmGFOfRZ7IxugD/rsVUJLZz2cVJbnjXc4H72AcLizT0fF74/syqOwSZtZUR/bT23QO1l7R3J/g7Opyid8csKV4QEocx1OLhr16Cljmsq8qqDERXigh+qxRdJq1qluVeoaBMU6J7Zj5Z4jeqCLcrKc5VKN8IKyG5wauu0ttOsVEh9OrsOj5fS8jyUucBVIDN829WYWUfBOYQF0sRDTxJ4jSLyzzvfI3Yg1eYOHYdOL0WaMIFvllln2XUhhqXs/ltkk5ffVkmE3sWHAIS3WWXf/GclEn6eQ7VVjOhD+YH0kbAs2f8R1qyve9W4EL3HRifiRvTlAMaOtrBRLFxG449cY25IwdR5p9VvcTHMUuElQ2fHAOD08u9GrVKf1yRCuelQW1jSrAxz/+/E8eX81TrUvDuzQ6C/DZJYio/D+m35uNrIh4+pvK1P+/tTG2SKNzg4reG51Pqj93qVr2C+uxYJEcYVfkyMttFVh2es5gvDNfPanM6Ffy8teGWAVG06r6tBMUJyy7GlAr0Ygfyej+661IuNvj7wmkH33g2v1muFZFiVfdpugoOE/n9niu49UvNt4QUVVKcq87UnAdSmXhxAxaVZUyOXxH+p1lMr06seRjnFM3ADQVDMFhWlB94ovJS79OgHoHIDQFsMZMfV3DiMqlG6PG2X3TAz5y+JR3kyu3yYtBdVxGADMaVkSkKEzQ7y1zIWlO7Jl90aFR3R6Jktd9WXGYO2inju7k+okS8lyrFk6hV2qOlmh5AJrcDkNU6oNyeWpk+cIN7x74+wITuh6XquQ2WuVQ+AXCGT9eATahJDUYhjYEGkHcNcZRn/an9bIB3S4Y46EmdIfZurxg7mJwWS3U/Md5s/RBuoHrEg5DSAJZ+SkqUILyhu1D9+XqvZ5OQXyoDB6Q9zX4qDOBQOfYTFW2Fu3w2asDNrlElRxLXYCj8Md8fISv+ijecbpHF3vy1FkAc2kAKKyhmi1Sxep6tYgd8eQ+VpzgfMkq2CBd9OowhKYkrdUgGP0y/bgNuDvTT3Lz4byfK9XFisoNQ5EZ4bEphkDHxeSJXw6MU4BUhtvXuaT1j8ZBJKUcqJskA/vG47srOGnkY6bw5x+Yd5q3v9QmrP8E8p68qJo0owYKx3vghNWwemjcyj9FKHZN7FgUv2+q4cfXUCg4xrvtq9FUVHTdefA4srYDqiKKr",
        "iv": "aGirRzOVbaD3nmTo",
        "salt": "sZeVA69ySYeXGyFDp6EqTg=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "kT+znDJN+KzBFsKjCwkdan0OEyhy3m68fCPtgQ5Jf4iPBJZaaY+Qi/OrY/rLKKNb0YK1xbJd0wayg3I6Fl11Ve9igorYM1UKaJbO3rAVmokFoOT7d2vfy52r7D6cqv6mF8lDSG0lPF0Dczp2yZssz0RGhkZxUO4iUxTqCb4LKD1nWZJm1LMuh7YMyUbIsVF3nhkDCN3ekVVqKt8JJwhP7FxfU1kZLQXQj2f5IAdjhLoyxikWsn0tGvjioCKF/x4hw1D8G9qyogxe3KKeGUktB11y6pjqMbHasLF/m7L+NbjPGJE6Fn582MMk8NGicAVolvI1UuQJMGU4lirZcPD4Qn5qP6PdOMXpWVHP5uq3X+w4hWl4/r4sOEq6vRGxDZNYJ6OAlJN4YlKiNQhNhZyKwWsTmnQK+anLZKglsT48VW+779Z2FLHB1PPSSEjyEnKRd4K4M3pTYM2i6zX4nRyOnP1ol8XGrhSXBchOxEWyY6IGZQI6FKPLkJlLchkstZq9b0NmHiSa1qcPFOoQX7rasU1GvPJPyjaUBTObG+/9ExLXxyUEtSkf8Tlxnsbk6xtfNDnS1jvN6Q1ghZxi77/4e0McoNnoHEYiSqQ+rpALfVp4D3ELLf+KdWZyD+yF9WnyiuwGZ7he+p56HOkG2y8vsJ700aCoNpm7ADwZWkgwGO78jHc1u2qCqJX6tlsp8b/w1K2jHL/boCIw/5cTc/rqvTFAKHEh0w6Gdzut83a8gwUIpHmbZugKTv3x78NlAczYwnqChVA9Es2ufGIm033oqwrL0djpIvl7tObKQ0Uk0tD8VAh4CGul8/I7pHOh3ygbnSeyhNgGhc6MEmVnGogUC4JU62zePxSLwaKnfc8rzr33YlTVCW//nO+ElOTH7khYKmoFtDPO1bDA8sFHdVnhfORgx9GZZ2ubm/I4iQpfgNBvdt2rk93TFffCeKp0Tp49ryuTKLJX6DT+BtW3SEN+odtShL3zSOQdKpcz/tmiG8jFO4hikFsfjQhxMYmelPiFp7CRic0yB19lJw+tsv9BfFNmIQMOK2FhrOGlKBjIdOsCBSs3aTxFcIiBuf9BKFLfdSyzfMKcJtimOc2VRhhp6pK694jBGNWR4WDF53o8yhoeo7AUM5qL44mf6IiBS7e0wFcG3GlbrkVqsFc7Ts+hmbuaumyN4LkJe+BSJCHfk2tGC3ht6i2IsXuWz6sjz5yEoX5JbS+lCbD0uAk1D567wBbjUvJF5OBhwT9WR2msFB1NrhKvHrzqDAcnzTqSZYB1VEwqYT8loaaSdf3TX/AvUdzAcvUM7ibGrBITXjlwcqLG5LjVzt6Vs8806HTezHtThEPpGzQsWTBfDQPARLYRmrCS7F5/EKFCrxovN8erlI1jCoimGG/dBb2ceL6Av+Tnej2Ss9JCsZDEMIeb35L1shNWOg8zA6kbnQHRVVntTvYehTZ+p5EcdUAlIegfGJAYCow8TESOq3sdlwS7vylFmKGazuXF9pcPcdoUJZATiq/CPMJDWcZvxriBslHGso3c55CUm0ogzbiECWKUrbY3zjbQl1omzAxdRy4xTlJS19rygM4OathFIyKbN5VHEJwrJpggC0pU8oFjx+sOmhR8sld1C4qzViBoJb4thCgOo2O2DJ0sT+Y8BLOJMVycJQT+Cvdf5E6fBlF0p/qnaHc+dnK6",
        "iv": "bDv3Aj73tNTlvcUY",
        "salt": "FLEEloZpVcvLS9JofElmsQ=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "gp4DHijBv5/VUpn7Q8VTzeEnxjruiR3tjA1/au2iUO6pbSmd9Zhy4UDbnfagpbRb9hoCLUyVULVkCVrGB5s7BW1T1F+gbRigsTZh1FjyXwEDDf7DMgXMLIvkV4iOMW97NidoHbDd5muQcCVMyBgTZPXcZd5uIZpKuS2BAcKmhVpAHPohgETV0cU9Taz1QeNSckekRlYRee2Jjzp0Rwi+kulQXQvlyuKxVCoe92HdrW4AhG8jb5FrUtEUl7DKSsiMp2aYR/NwjTxz4pXXqNTge0KVCEHf/Zj6Fn9nkkqc7XwX6czXuylBnMb1mWLIXm/sNz81pQfc8d7pSYCg+fcIAHlsMLMC/x1UTwwTOOwRoudzHUyBfJYK+/aoOSWmrs6PcjpqfTEQFF2wycYmtpqFfyhmlAs7P20Vqbu4knTy3nBxu+Qz7jHFgFZlSs5N2zhQKMGPID0SQl59OaHo+u2KJWrVmmb/g116VZWde3ajDy8e5/LzyXNZm58wHK1uRri9cMVzO4q/plKKy8RTtecnu5jRnEQdcSt8j8f4w+5hzbDzZlwHQNiZLqQ/qecvvcpUDbV+CK0A9pOBozuCjAmelxhiXxe0RDRzLjkIFBh8xqnjgx28HqNGSLyW1fD8IFbY6HWwPOdu3znPKKxfFNRRzpQnlqVyOB4jkLoW7pTsJfYbxvygedS+93egRYvJfxOGePf6yf+1PMUg8l+Ds4VdsXzn1x37nm/a62IvndAIWlGfTAZEFcV/jI3kLYyz82k3VHbKwquFiEm/8WSYbZA+QsjOGGugT33u9YNA2WhJg04azr1Vr1GPsEq5FM0kc5iIVRGpXue6EOOVmC7K4tBFkyXobGev8Z3LY31zHbspRiU19pxoonLqonqWWcZp+2zXT6BCTfbE8G/W36m8rf4610j6lPYyYiQMqcSoj2bS539cUSSQWNAXKI+TwqKwo5SLtJlL1qKh4BVNDBRlbmjsBdETQWs0UIHvuUZRAHbUrJ6DRi3xFOklgzOKiRZ5MSlzM1dWXqstRFrwDi+SouMwVZ9GipwfsBJ1uYZ89RLWm43YRQ2wXQKojYwDaHbHzpLXr2Bvbj6mA3lE467PGw+71B2+pYzkidBKo3xDPoGlTfBjubfe+gZ6iFZuyvpEvMLZdoU4gfxxsWJ4qw454LAj+Kt1vDqotdQRySrA1ozHQmc4VsMKQ3NiKgJFopdOPLjbb+rt9UglF87LQfPtPzpG/DQt7RdKjG03xPcfc5Mljv648f7mM7QYAur/OmhFf0MZ5ZtqQk60JtMIe9YS103mY9hxAXY47kMqdOn1GXg01c67ILiO0ZyCQuFI+HlIcEwN18EI5BVk7sRJbFj1tPodv8wY/IlZJQpUNb8LlmV39qBX86vCMvH3+0pm2HRNswJduYyBzuoKjVH2JrTHAuUJEsAwqjo+vI+JLHFVaG/AVYxgs28te+U+Jgb9B7BXltfscM7WQrBgrpZsjZW1b+FMM5OMJ4aDHDa4M7xG6zYzM1hKG2sRgu1Jh2+FPMdCtTNaFjZPM+EWtd7plnQ++lr9qpUfjGIFQRj4FHscL6HZ6uWJBmDBASifQYImbagdaw6znlGQTsQI2Y6kjxEK1BQjBIi8xzttdqP6GecArcv6zDy8k81Ytscmn5GppbF3Hii2zwdFiYeocZvnjm3hpj28Uo65",
        "iv": "MolDukOKH9YZo6hP",
        "salt": "IRJ1/7eLQ6Pmfn5nJISVeQ=="
      }
    }
  ],
  "adminPasswordHash": {
    "hash": "8ES9Fsek7IdaTpxCuzo06qhckNsy/6nUrkb2E+lHCIo=",
    "salt": "Q0wULuuxz8ujp5b6IK9TXw=="
  },
  "defaultTimerMinutes": 15
};
