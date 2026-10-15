/**
 * Default Scenario Data for Board Bangjeong Murder Mystery
 * Auto-generated with AES-GCM 256-bit encryption.
 * NOTE: Role passwords and GM password are NOT stored here in plaintext!
 */
import { ScenarioData } from '../types/scenario';

export const defaultScenario: ScenarioData = {
  "id": "gyeongseong_club_1931",
  "title": "황금정 낙원구락부 밀실 살인사건",
  "subtitle": "1931년 늦가을 경성, 화려한 재즈 선율 뒤편에 숨겨진 밀실의 비극",
  "date": "1931년 11월 4일 (수요일) 밤 9시 30분",
  "location": "경성부 종로 황금정 2정목 낙원구락부 2층 귀빈실",
  "synopsis": "1931년 11월 4일, 차가운 초겨울비가 경성 종로의 가스등을 적시던 밤.\n당대 모던보이와 모던걸들이 모여 재즈와 양주를 즐기던 최고의 사교장 '낙원구락부(樂園俱樂部)'.\n\n밤 9시 30분, 2층 복도 끝 가장 화려한 귀빈실(VIP룸)에서 날카로운 비명소리가 터져 나왔습니다.\n마포의 거부이자 악명 높은 골동품 거간꾼 '배상호(裵尙浩, 52세)'가 심장에 은장도가 깊숙이 박힌 채 싸늘한 주검으로 발견된 것입니다.\n\n경악스럽게도 귀빈실의 모든 문과 창문은 안쪽에서 단단히 빗장이 걸려 있던 완벽한 '밀실'이었습니다.\n사건 현장 탁자 위에는 깨진 와인병과 장미향이 밴 피 묻은 손수건, 그리고 반쯤 타다 남은 전보 용지가 뒹굴고 있었습니다.\n\n외부인의 침입은 불가능했던 시각, 귀빈실 주변에 머물렀던 다섯 명의 인물들.\n폭풍우와 경찰 통제로 구락부의 문은 굳게 닫혔고, 각자의 비밀을 숨긴 용의자들의 숨 막히는 추리 심문이 시작됩니다.",
  "victim": {
    "name": "배상호 (裵尙浩)",
    "age": 52,
    "description": "마포 나루터의 거상이자 경성 암시장을 주름잡는 골동품 및 사채업자. 탐욕스럽고 잔인하여 원한을 품은 자가 셀 수 없이 많음.",
    "causeOfDeath": "가슴 좌측 흉부 은장도 자상으로 인한 과다출혈 (두부 타박상 및 불명 독극물 복용 정황 동시 발견)",
    "crimeScene": "낙원구락부 2층 제1호 귀빈실 (내부 빗장 잠금, 창문 걸쇠 잠금 상태의 완전 밀실)"
  },
  "rulesAndEtiquette": [
    "자신의 역할 밀서에 적힌 비공개 정보는 본인만 읽고 타인에게 화면을 직접 보여주지 마십시오.",
    "자신의 목표를 달성하기 위해 거짓말을 하거나 진실을 숨길 수 있으나, 공개 정보와 사건 시각 자체를 조작할 수는 없습니다.",
    "타이머가 0이 되면 모든 밀담을 멈추고 각자 최종 추리 발표 후 최후의 투표를 진행합니다.",
    "비밀번호를 분실했거나 오류 발생 시 GM(진행자)에게 조용히 도움을 청하십시오."
  ],
  "characters": [
    {
      "id": "char_1",
      "name": "윤세영",
      "hanchaName": "尹世榮",
      "age": 27,
      "gender": "남",
      "occupation": "자유기고가 & 모던보이",
      "summary": "경성일보에 기고하는 유행 칼럼니스트. 서양 문물에 밝고 언변이 뛰어난 모던보이.",
      "avatarIcon": "detective",
      "passwordHint": "비밀번호: 단풍잎 (또는 1931)",
      "publicInfo": {
        "appearance": "서양식 펠트 중절모와 베이지색 더블 트렌치코트, 은테 안경을 단정히 착용.",
        "timeline": "사건 당일 밤 8시 40분경 낙원구락부 1층 메인 홀 바에 착석하여 칵테일을 마시며 잡지 원고를 구상 중이었다고 진술.",
        "testimony": "피해자 배상호와는 한 달 전 골동품 전시회 취재 차 안면을 텄을 뿐 깊은 원한은 전혀 없습니다. 9시경 화장실에 다녀왔을 뿐 귀빈실에는 발도 들이지 않았습니다.",
        "belongings": [
          "몽블랑 만년필",
          "경성일보 취재 수첩",
          "은제 담배 케이스",
          "소형 회중전등"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "WK/NWoc/P+W59nZo/0S1n9zWmuFVVLCl2u7DEHDoUM7dmzdYshYG+mfsMsA56aJlWnTpN2LOoFuuou4BnHH3PP5yHymA1AIsG5LdrXgAKYabfiI0RdA7v0njh9MqH1wkP4MN0tNvdXjfK+GNnVjpkNzC6sPyu7LdfqkuOvqd2sliAouG8Azw7L/3ziCBOq46SWYrTOSg+II8ILi1+kYPfzKGPfzBSNlwH/7Uf6B/E/a/r43NEJE1Hk2TDj8efsyNQCbFrIs5h/DQ/xHEXYdTt9QfXP6Mr0LugaJvVc+UX1n7oYTmB3z6FWrh7QAokcfvnSV926Tmm2H76I3sdGEb8NHePz0sSMER8yUKzFrtl488vZk0N7XHYB32rwPUVy7LivpY9YX38WUMiYSgVJBZ7Kxu22cPExSa2jM8c/097W6/Sd0qc/Rbn6+FEBpL8ijBUVRGIaX9zj0cGKCONgaYVE90C6xx3PLFh9r3t826XzFes1LvVQUcLD/aXiJyTmE1lVRAUZ7XDolta6aL6/fFZk28Gj84dTnjhC10vHe+rpeHSQz7GXucxq1RhgfhJw995P7AAduzTP9UHgmL2tWaNoOatflH1pR5uPPhx/dV4TU6zB5MfBk82UXcnMpWkPVPGMNonDYPokVJPx2/eqaOaj1AYpX08BuihHim4Kju+4N2TiL3lCSbN7gG9ampUojhst7wIl+FCGhTmhNWwa69UpNXKagCOi65bwUl6QaoYZE6e56W/ZdcbMzmlu/BYaDmZplLTag5I2ydPW6CRGNliz4SVMjvGquZAV2lFFNlB3/uw1GDz3Kzz3r3eKfB5tm4R1Piym3Qle4UZn8Hu7Q9DXdO2surl0gdW4ckUYZo0jRAKu3uVB97i/hyfevIo5+nalUUpzk807C9mKQMiJH2Oy98/d9kZZRP7BppVwHuWy4ZohgkirCMnA077apl9g+wGEgM602Ha/H0rHNUGqAEIqJI4KyYpoitMLOW3Cg82I8huwNdcWGxXdA6q3OYFdD/2WJFrOTWlbAN53oDgujcT5PXbTL1bht+hZE+7YvU6ULdK4zYrJTjW50E12ljscf3mnaEnYAiWVE5Oxl9145XaN2pbFsw0C0lYkJY4mfmv7XFHkKxrqd1G7DoosAhEauryH5NmLUJXQmb4PGAvvXdfGAjmpKqhD/uD29a8YP1RDNWdIuFmNpfX5jWkfQj/UvtbNIZammF5LRTADFqGAdDwu7eZ5yXG40FKY7jHyGrdojeVedq6WNdJdW42rYb05yeT9DKhNa6h/Ug+rbs5DeWZHftv2TAyEIpJj/jXHeOqjduuSnEJm9hxhH5kLuPIpKAtup6RMRfAIK47bTH4lQ+kewg8tU6b1P6Vyc40TbgWux7EaRdr7DG0aKrG2btTaVoJPxMVMNPWhl/pD2OG3f23jveWMC++6CHMq9zmZqAwrYR+KQZKtBZ+21dXx3qlSS2eAeYdO3KYCsorqE1MrwPX3kJvhlXMktu/YbtPe2gZHc7qWpsfaQNpC/7r6zUJkjmqJI9V06Gg6WLAYcORKbFMLIj6cxN3mAAllHlgPzfF7mmnmPIs2SJFwO380XEWG2RIxRbCcnKIfTE+qqoLmjSFTDCUqAPbFCdZnRnZ+6/e5TaYaNBFcJPd1JSi6y/nehfLrp9AjItZacHBVs4NnQobbu4gSugdJ/3aJnrXnMVk6vl8w84Mfuw/mB8A4GxSmZxD2cl2mVenxKY6DeHxp3EXFR5Nvg07cJF+Pm3UXbGnIk9BrHyoHpRX1s0GRxn/pOdsjvQ9ZNvyypx4a2NgY70DTQONNfchwAK1ha5MyCVFKPKg8eg7xrI7E1G8nLXZKZG175olk6GuxFZeAZyY30uvCSWD8v31i+N0x7V7rWUoDgwKGZCSDNSy2pMvy1p3n6Uz+zoijJr58Lz3414+VoDQkN85ZIJC3I2aoUt0oqAj25kksB8Mud7",
        "iv": "Z8qpa3JxQz6ikXbE",
        "salt": "dk+Cxr1pRjwe1Beszp3VfA=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "reVo4ABdCfU0Z98d/FoifHfIKbkEhSpf0C9stzycv8kZOiu3SnKd9Kv18S5fEIHvxvt0fu4loirZSrkwSVREJqzKrUJfiBMYEF1mgkg3pe7H6sGnGbn1JrnEpernuo65gKSQrOn3UTVmENqFf4vSteTCVum8pnQayWQrzRUU1+Mp5uFHgM+xmQ9fI4Yleq6b7am023TcBZvNcPkEO5TFVCQ2c6ZaUDLzDxcgOlZ9nPdjnitmTGUkXSZQd8dxXXqMyTuXNwqm+QPNON/kiNwUCF8RC/QmJXKtLRwQspfDHjgJNCIATTrY79w2BK/aYi8UsyKjsmfpUtlLW4uJMTwIH+1mM4ikR9RMgO40GI5wkQm89LX1Sef5b8h1qdrUZGadw+Mp38xCbQcr9KJgIDtQNGOC3EWcjDpQaLxx4BNJqKwz3fSKTWefbUzQXuP+cBscl15SBXV0eLaM50MDy11V299csccJP2KHdDKRkTKUx67AiGn1p/PmYhRGXozufL1k/eL0GD9xGoIwgL6jG6+c52t8R1oM3tSmX4h1pBhuzHDuVBAa5dU8dtYRAAOvlS13N++Jz1c5TLSGcnZDokCZOdXEIJOuJNpnzznoW5/slHWAJ2utUD4uEq8pTT1iKAr5VvmKR60vPSXa/O5VKDJHvsT+0JcId3mQfBXq9k6FtP8UAveRbNTqf6aoINHLUrSK0xXqzfzsp5lpt4E32Yz9N07M7y0Ey73FgSWw5pSEn0vfBKTH+i7kPpfDDGE2+Gi4FGZqF/QpQJ4fCaad8L/K3iFaA7xUmZJ29s7gc/iDpP4SF1+ZuPED4j/gqVR3aeT9C2v4xPxF43H4X0tiVbqe+7ASjN13aFBq49pb8Sv0/uEdBQmdIS53MNgE1tFyrefT+ReqFF5jtKd1rApYiDohl6UZdDzJhFONnvCSEt47jurGF93THBp1Mj691THM3eI+UrNhHbpUAucEtZIVmWGqoTGc+BkoCh5zCbFNSgOKYcEDg4aLrjtnRgLUSc5GGqVD8r1Dj4mjr6UZW9zhuYQy7mTe6/hpFD1XEAbZY1q9sWe3f65aLBNfRKZvNo2sL8aNIXZRFXQV5y7cBnhIdkpNpYDEd2T6Ce1sekVPBoiPYs7vhTfTuWWb9Q5Rr+Rm0ySoHk/j1YJOo9wXbcIpw2jRqEiG4K3zVExCIUWzQkSpC8fPU/Td2ZowIpayGGO1m6DlGBXc7RjR6pmjZ+ZpQ4Mz/97IOmMS3rixaliJDYjyxTEDXriLu6fQ+qNWJuRh8G6YZqqtU6Q8FmhG4VGbl4815WLxXwkXCNJbEBc4kg+tSHFRNZE4eUUwfC9sFNbtZ17ogxykcziqFcgZJCZHjqmOu2gdwYmlZ3tboFDkkkZLxxURW30nhiWvpmf9ZAGD70i7NNLk6edQeJ10MrPGXKwCu8+Ix2yVaoN8DqRCJL1fqmEwFzjCrQvJcgtqSCFJdoljpNKVsc3XBwdNJA8Nh2iyoUk5z6IPYl1pR2CokW0WYX4dQmhChvG2uILSB+eDH1VCVxYcnmR7/RtokFHBL9v9CBKNysLlsO36eBLNfn2rHJHZcl+5WQEUU2xw1G6kuBpBlR/Y0Qgk93hXV2UMoCf6V3XNnv4izMk5HRIdcw6JBkQtiVEiOGzSJ38idSpMskwTWWuZvHE2LZPTTiC9Rj5F26KmE+hv35qWFUNa59t459z6aeeD0gkA9s6ogxRDSWKwlfs5Hp3w+HEdP0ZPb4NpZfFKLpNtsRp/XUMNkZqpKPoVYI/vMhKVmOrg0yPYEBYud6emANnTG4WfZgxX3k8YjHMjv1ESEYh20HdbnzqPr/QjhoRZP1La2AgvSazIyUKcI4kbDxJBmoRsYflK2jEamUteZUwsx8jxqe66GxFNT14OVfrwCfbkfdPxx2YxhOBQD+UWzNZMlXpkQpgPedERxGdp247HDllpFg1IqIZhL1jQg12Orlvp",
        "iv": "2GaE2aoTQJ6FRIcr",
        "salt": "xmkxv04AYaO8DxIOOg6T7g=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "9DygQUgXwrayLtweKKNtdSS9roCswlAK52x66JccM/qndsGX9Z1VavNG0Kccd7TMNhzo/9hXBGXJi3Uo6oYkXqTPEdJkyb1dlat7nttuzlJbXvtmjZ75mZBjzz+QYLhDE84GTBatDGKF1kdysN340wTcSpoKTMOKRyKrzTvi2su3aMndo/8bi46GLnb/Yr3bOz7EKiIxLLYU+zAfUopcktRUHn7jjBFJHhS56zjhYXjF+Oy3UnkJPCzLvdT4HkQ7xvN23wY3ldF8HArrkmCSLlUr7R6wGAY/Z9uZH+BascXECpphpm7Y7zkAy/7TkX+b7+nnPJviVHE1c08A+KtEj0wRJQ6vADFDij6fL1wkju46a2WDyG8qfG/Zah5DcrwvKvXl2gh5XqvOSotWBRL+a/MvCZ9juwSHVTCowkROElp4rXmaI/aSGTPqskqcBFuJK4xbxLyPH34wFZjZJPw45iEfWURbiMBuBWydm7cdaPco5wiMZhDVo8tiDwlLE+cgtEFb+D0DR1qcbUCrcd+HQiTXey7Sqj0ohfXSsx22zIjJqKq/zCZOVbv0d0DJAUc3rqZo39u/XPRdQYlHLh2/2ec4qhAElnXwT2U4Y3ZicNO3EMHhNcRLaz/qHJD6zNwf1oqrjTTdzpXjnlwbZyEvL7yXuGl4qDAiZv+fawbmDSRWREPkZnn+J0FB5yWE7/bTd0bnXafO5FUBeKgHMWzsWFoitMd3Xw8FoBAtnfHwaFTAfzl7yCaqFbbFIMY16Isrv4rhmsiJAUv1GL5kgwWIsvgmu4c8wjESb9eb9Aw68BPHm96kDKewcRC0jnjUSCJ+kJCXRhufykPw4+W4qJWuimVvQL2UMS60kzcYIh4z8AFSBzTH6s8FkLmMb1+buOQ4PpoHTyknH4Fc2QS5Hm+zYX1AzbHRHjCc4Cu5voL2nVPvsRbGWI/0Ek1gkMf0GEoqAYZ+y515BdKSJBuob2Gr0OkRa0Am94bRuxVJzK51bfpX1Fr3g+Cv8G+84FuhmZwzxsXePP9/r2FCwKfKG9TSQrSXBN7/+a5BHE14NDZ/L7d30XoOwLRctcTxV5HOQBIbqqCPHcuc4+KOohLHAqPbagYsz+xKeZoD1zvaiehxytnQz0jKK3nENEMyHWXgLhkKUDU2IHkKsfXldSeHCd+HSXdSGHAL2Y0Nx5ygaIBeu6ID2K9aNxrQ0LiYs0WlBsvoRxCh9rA5B+yw2LtVNXfu+Gfl/Tq+lFCjRjFNoVDSQ1TahPwN2H8LgQq+DVdZQXUzRpwn4zWAAEj26wVRMKIhTntOWqTq/SSaPB59enw0+OB5e1OFrOqbShDEnMX5sGWjvZ5Z1mxP1CABsRw43qwEC/LmeocCAVZlCryS20F4FhzbLLnkTI4pcA6hih9JGc4PNqaeHuJqj9Bg0Y1E5JYR+YJsruVcJuYntGZycnOxr9eNo7WuHuVMtPgmHdFFZ5TqluTLzyfnwQdhDiRgtVFRd5vOLR/PYrxu+0+P3QrqBC864Vx21uAs8poryIzRQk6hu2AUerqZkj3QwSR3kpJDpbmiBRb5WrgfGzy94NWTYwzWkov7ZH8mF8kslU80b0rqkub5P+AZv5Esbp74eVpREMbz50QkrpLpzMPpC8xha4wKHwVSXs5Yk4y9Nw4I+PJt4eB+7qddbLlwYAv740UpCPbvjwxI6cXBKR/mfcePK6btddvDm35ICiKo4EVJrbniKGUIWz4wapP1/RgdxZIEYFVjgTovj87H5cLOksS3M+Wav7cqHLENcn3Uf353cQKCvYxCg/d1Sdnm+sL73+NfaBRVUOmPCvS9XOosIZiTtR3J59KdCFeeK9tPhcGMuKPrpCL0e9JEycnSpprjicil7fFcZy6VWRiic+LW2EGOZRn60303kUMqJgzsQTXvUmLZlEbtNpdO71JTwE05jAPvlauF7tOQcBnryYBIVNSA9Ne/+cbQ66Fy",
        "iv": "1hHb1Ugwi9aJr8Dq",
        "salt": "/bGWGe/8N5grWyqxnsaemw=="
      }
    },
    {
      "id": "char_2",
      "name": "강채령",
      "hanchaName": "姜彩鈴",
      "age": 24,
      "gender": "여",
      "occupation": "낙원구락부 프리마돈나(가수)",
      "summary": "매혹적인 목소리와 자태로 경성의 밤을 뒤흔든 낙원구락부의 간판 인기 가수.",
      "avatarIcon": "singer",
      "passwordHint": "비밀번호: 벨벳 (또는 2048)",
      "publicInfo": {
        "appearance": "화려한 와인빛 벨벳 드레스에 타조 깃털 숄, 짙은 붉은색 립스틱과 진주 귀걸이.",
        "timeline": "밤 8시 20분부터 9시 정각까지 메인 홀 무대에서 공연. 9시 05분경 무대를 내려와 2층 분장실로 이동해 쉬고 있었다고 주장.",
        "testimony": "배 회장님은 제 목소리를 아껴주시던 고마운 후원자이셨어요. 공연 끝나고 분장실에서 옷을 갈아입고 있었는데 이런 끔찍한 일이 생기다니 믿기지 않아요.",
        "belongings": [
          "향수병 (프랑스산 장미향)",
          "붉은 립스틱이 묻은 비단 손수건",
          "분장실 열쇠",
          "화려한 부채"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "5Gkh1LJwdSlJHXogwsuD5K1JP9+LnQvvIR+lBKjgE2RCWEheCvg4wlX6/tZXvyPh6qiWZekc4zg+uJeIZXIHMC5x9tl7cBftV+XjhW7Rgv8jmy2FferOduGmbjef3oCYmT+VaZXes8XKvxD5htB1/0xZLEacdv6qA2Q97eRXTmjkWUuFE4cLCzvDUMoGf6H/mpEKomTyRmDHmKZNg5ydznhbKAGHZcU6/8i0J7cGYpUtTsnMDx93Y0xcFIQnjyZP+XA6IxWEmWxjYtRj+CSk98XteojM7Nyv918hpZlOJx9M88qpxtBrtvXmgyQXRPvzkCDc6muPrkLPBv9910QHmLC7dBNnZZUWuzTtY9+NaX7ijLKqY19P2/YECd/o4OBPrglk+RHdX4Vp+RFrOu910psFdKdMl32/l7bv+n4wYS+O4Wrf3gkISf4127DegzNbDRVqYmbFKc8EEK2WDYSJedE9cSEB7A/YHwseC/Vbs3o0uIwG97dteRDz5EX6uE3DdBRI6I0z+H33m6GZbY3+BsdJUdv2KDQSrLVTtZ+Xszrh5FS7ylHfR1sZ/YAmtXr5c4sWHoexT+RwXugUGZ9YYqbtkVbGnwi9ajlhTLfjjK4m548lPdz9Tvc9G3ViwZx34/w/lgwIJ9uJZtDaUUnU53jX1+bhKJNyqstvze6LQsy3POzdh6rLzctpOOfbU0hVcbZZ4lE1S+/15CoL90iZ6s5icpNzVBR595Iots+ZUgPaoyDdtA7rLQMs0ttuvIIv1nZGBBcIVn7ubURvOUzhWQZ2hTQNVIT9+3QrevSi5fHr6GlXWFp2nIoYD3hJGv18hfCaS/g26RLj3vJXJZZvuJACJBJ1b5V43cG5SZYu/+HhLI4NmI9MzZiHOUD9UV8EQQFAPX73CXNa+HJPnPZoAhQkMsklhxyf+6Rdcc7eEjMeHdlMuZkKgQbCgKWvbp5n5akFTc9jkhuLu0qRqiK96HKR++2kMum6A8qCGK81cFiz7L0yt1sf5CZ5TRJ+PS9yc8a4GWeF1qNpdU+4OUyhbVQ8zy7cJl6VUlpsM7+YEBdOEbG7pI+xiRQog6MpknE0SW7LMDsamuRuXmB4+H3EhiWPXNEtU6ViRFcmpvLIDC/VbzHNbnUOVUAjPaoLnYigIpy89NYHjVx3Ggo+ui8KLcfid27GH2BfChvrNBAcNbWIB+kJAV3JOOo8y4hlLOLae3rCsabgjswnTzwn6NS13HL95CtucR25+0d2IP2Uupy2MvovPHnp+N+hMRyKBb5iRMlfDi8YU3ytKmp/vfTr2yebveL7dFHfxbPFZmIILzoE3fzx7K9XoOLR8PaQWDZ+UQepNbmQDmaBFojhf7h13tAyw5iXRw2hgG26job9y2wI60/FhNppDk0qBhGdwsZ8mgVaAhP+aOjDitTQ42mAoN2UkzVl1ALYxSuhvGBMI5pRx0RMUwahnqVXefNoKI/zc0yCdx9gKmQMrVW8Rq5g7lgfLvTVcKsELnT2xWSh/3cXj4Eeu37JD7C8TZmwo+RLsIi+ytA8gpBPSkIY4odKyoJL/gBtdLUoysIbx0ZdWKVHJ2jNqTft3jJyiU8Zt6P/L3+NLoG1ocRVDIxKIRu/vZDoh22Zh5LLIxuIIomFGVDcit7uYrwFbXTiJosgAqMuABgg+TlsnI5rOiwT/as4B9QAvBE97PURtZMFxEBuiqVAxLuNul1zWt0QJFl9t34MFAbvAInRKKGEDnkgtWt3muguIau6vibYLWnoSA9PEWtgMHdw9IG1q0oJ4sTE8TvW5exZspxZfIFUyQWIXkUYI6KY+ffNV5rEuCA=",
        "iv": "6bvp0yz7daEtKkhO",
        "salt": "d/tYDk2LY7XVXY634T1igw=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "lvjTYg2ssmEbKBQK3bxLb1AWK5XNyFcSs5JRNwsSna6/huSrmO7xnnvj1xm7t/Y9v57IE6dlHCffZaKPSLXGGnRnQNwyxys9jMTOC+/q7N6tdDdm1nSD8QTqhUyWQ71sDRI10MWtCtWPB0w+I1xlhCbJGjhp2KQ7YHSS/lO4fiMMhtHTAq04g0jXSkAzDxMA2/PYIAbHlEv9PGiUDNG4j4xfZkHf8YT20ZmT7FeNrlajuiu8+y1EONSJz5R6jRMUodjS4XIp3ua34Twou6oFZOHEkW7xzZOQotSmcaAr3O6blf3iaosmCXOQX5sf1TwaPNTJz0e+2H4iPZCQXPEEyBPmaHTjTnKVUVDNLLiaSPmODFzKLjC0jnaqGA/JKl9mzkcDsKrr8n33e2AHcyrgDXnGK12OJ7J5RiHTu/MeRc7CBp/oqpZ6vRT61NZO/5TM4AONDNOCu9a7nkhtQ4pr9ysz8RbuBMpN6eJpsaeUL+QahkMDkhpMz48WiiIZUaRhrcbQSC/F+UbWwiwqzo4iOTG9lH+R//ecWkto27IFQvuJaCnasDQBkEXldMmFuhuFBzPcHq0p8fKKwHAAkyVTtIyowDmkMU5vfKKvrRNL+57UUvpDcXHVw+aQ3a6/T0B6yEAf73uhDrFfouSPUEA6ZQODUrWQ13w+p+dThYWlDKLJP941BG0gB9iI0KOp1axkym55BRBwBQQfgkDUEmfF+VYaD+5GvJdN30GwJ5IE8zjYv0MQcwulcFwp6QL+e9ns5xhfQQWHX2g6Y+wp7diuDBOE9QR3OJcGdz/qj+oxY/3f7qXw+hZTBlYC3aJQ0GxWKrWruNQjEZlL1iKZhZMlGUsOx8UZ8zDF1CW0v3/dNFzs3Fu7w98S+Jh9ow71r0JBSyw7jj0PZyW9JnL0ZWgolX25xNtyY70wutC8FN1JwgjbgeUKWp0UH4Wnh7ReS35c30lVEIB+Gns6uf31PqcjPO2yR8A/AsX+5c7mF1RdyMXAjVS8069/b6Y4GEyJW5hJYjbTKHCqZ2EgOJl3QGPClCIt2Zp9UgwCgvv0E+2FS6XYZj1g1bGoMn43HvD5NQvfYLVLWNGSWqnux8fawxao9O8H3bwCeOSeSaOv8+3diQ6O2rXD6zLmOk7up4QI0FB7yhc5mpZsiT/HQcIBscKvHRlcoZUy5P6i87PPLihrSQWGk0H4dVlHzZ9zNCTvX+7weEYHMTPSS/iPVQaE9OhHZH0Uw6p6oW0xY7+Tbwt91Y15XqbNlFFbCZcKbA1tsXBfOgjlTEYOS6HTyxOmrnuOVqdj+Z3t058OFc/tK+AZZY6RbfW+m1B9t6jbVEtuzVwuK87TSmqkozv5nZtEvv4evkfKkiW4SDGhSnOZ6D+om/neBwe/p5xdR5mvCSAJYHl2tCe8j3wKqdP37PtX0F3tR3S0kxw3AyRDSjxm9SxHAU1egsH31MDqCYwxX1kSn0ejns/7Vo8DlkNWTYSfkARkwgSAn1Tocm/orj4UvJhIGW6RuNM1oynkLVyWl2KUaKdLy4fMGEFJMfHssuIL/oZ7sTeyt0LLkcYaXHscJN1GrpjJAlZ+zcgfSZheVjFLh3y0yoOYcNp4TdfHaawmH012gTDJ2OfZwSXZjgejqNtcsAeF/khz95xx68GrDH9/zfCEr8POhcXgSNqcqse1YHsVkzgZ5W6K13vsozRf3WPdC8pyEuk0+Ije2S9MUVevnp7JjMRG/fme9fJbhQUZnWRHd7wcr9aIn6pd84dKOaNPFI42md+AhJQWalXE5KKdP9tu3/hWPgkFimp9Gkvfy+BTq4R4QcIV95HcaY8=",
        "iv": "qVBjjhAO2SiY0Cw9",
        "salt": "wu9LlgPL/D5o6bV2UZAALw=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "1oD0St5oH6TOWRgxf+BcnkVakbI7bYqfEG57mVafmJCRygJ+fjPiun42It62Flpns1kcfkzSAaNtrICKtU/H9AE4O/6El+ho1bUTB0wew2P+J6Ss/CUeYkG8go46Dm1qw4iGYUI3lawtnLeyaINfp3Q0r7l7t+8MrZmX7KATZisCetuSkuHWUNMUybWLepA++H1RiPzFO6u9LrytIclF0w2q/w6ThyXx/6OYW7JHImjkwi2NjnPP/TV8dsE6MLPvpEBo8erfRtyHVoQ5dGm1LaXH4OzK1IobdCOL+YAT0f6iOZyiLrqje+ZheFITevfZstxYLRgElW5itWqgqENf7+Tir2CYHysVFepEvqKX516Dl449eQMNJMC3JEsRW1o6HtZhHde/z8+I4ejgOr3g7Nc94LMxIf9upQWhbWeOkUaEzl9l5mNnvmGIzqwgAW6SwvZKkFQei7Y3PwDJsfQwCTTsjs+B04Xuw6xzsVHm0wDPe0+OBNobsOgHsJT/Vsswq/4nJA2n01gTVLw3benflZR3Oen+eNpRf8lD0V0n9/if4FmNIGehPwaY0RYSzNx/k0iXI12TmNlk4in4o+RqrgogxYjJ9UjnlMxYgBMKWNTriDTqmIHfyWRVxqRCsnh33Wnnq5QwqD0tTo3SDDeVMYmYGwHJuMXiq2z5uA4Otyf1lwcGjVZruhSPFsecSumPjm3flQ10PHzvhHjGI5R3YU4e7ApXng96WzuC0w9hmMFvzrJ8uXH8nS7znHBQsqvSpoB/V96vIcWikgUswfFNjAyoBAvpGjw5HZkdbRHcFC49HvzTLEAqrf/I6h/eLZkjxoaJnUF+NYrxfrVOmq7E5LHZ9Bkh938HofAVAWK0nizDtFjKslgtXwI5ucsbw/qpZTsX1Ds0DoaITE18zM8sUrLemLliQIeYBnoJfkM23E1ScNv3MZVJ79hNnUProXyrGzUKZmgtsNQCOfyizRvQtX15AtD15qelYeLwPi2Hh6M1dEQZyyEJ8pT33H8Rv3ywwwAKn10XjUCYTVh7vc7e29nX3Bs50C9wxnnKROdlPHRTw36lahK4kUTcIxlVN3fKO9qcaKiP5ZkddiKw3B6puSZNHkLuhDviu0IfqKwRyOzwshwIdhMK3CGe9E5BITVdq36YLwl3jRji18nVmpa9sofJGs3NbvpNcGTgaWSks7FvggNHaenzBBNpFpfAfLn1ZROGgHNJJZYRLcWO1msPr6K76esZiWsdp7i1GgTH89hGl2nAd8FSwZ4kQw4ko+ZorGGWO/5IcFX6Tg6Xhyf/1BBepxQKRPDQFju91mRQjFjAXMPABe4yoAayOQ+nGSO206MP1qn8w+z7/2Y8FZnuTH4+tKG/7VfDhKrjDDZTdXnTl3INDLCIwMQlsB6AKfiuBFuPmZoobk7j5Z1nnUjvu1iSy5beZkXBpqyrqrYpFoxph0fAHAieq5WI6V0tDmbad6vwFjxCCb3CfQjlNd7Mrq9ipU2HHAQZA3TYP5OFO5oXOnYk7ocyISVEMiCMF3nEP5j+5tZCeMZVSx0KjsoMArbD2qEnqs1ohHH4UrCsN17RJI4p/tMnCmtlGNTZS//6QYXSxIk6sa4zwIlXrketuHGVI0vtm9G/WGHJ1UXZBMntvy4yKwYT4dzPIYOpGtECnXmDKUQLso6fA33jTCjxAo03mEo/NpijW8m6zJVIeYYO+8/aIckqbGAuIFnobu0vlW4LInTbvdeoZ+jwiIvZYLOKrvI6T6WyA4sAdTwA17fXZFaex1+C4HVoCno1L8usGGnklz7dMEy/gYZkBuLSC38ycisqeOB2dIw=",
        "iv": "Wtgvzx0Ro/6ZoDiY",
        "salt": "XDFe/RV4PQ/gJeyKkejZ0A=="
      }
    },
    {
      "id": "char_3",
      "name": "민우현",
      "hanchaName": "閔宇鉉",
      "age": 34,
      "gender": "남",
      "occupation": "낙원구락부 총지배인",
      "summary": "날카로운 눈빛과 흐트러짐 없는 태도로 구락부의 모든 비밀과 장부를 쥐고 있는 실세.",
      "avatarIcon": "manager",
      "passwordHint": "비밀번호: 회중시계 (또는 7733)",
      "publicInfo": {
        "appearance": "포마드로 빗어 넘긴 머리, 짙은 남색 핀스트라이프 쓰리피스 정장, 금장 회중시계 체인.",
        "timeline": "밤 8시 30분부터 9시 30분까지 1층 카운터 및 지배인실에서 금일 주류 매상과 장부를 검토 중이었다고 주장.",
        "testimony": "2층 귀빈실 마스터키는 제게만 있습니다. 배 회장님은 귀한 손님이라 방해받지 않도록 안쪽 빗장을 걸어두시는 버릇이 있었습니다. 저 역시 문을 연 적이 없습니다.",
        "belongings": [
          "구락부 마스터키 열쇠꾸러미",
          "장부용 흑색 가죽 수첩",
          "특수 철사 피크",
          "금장 회중시계"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "uxqCpEXu5L54uP8VAmBX/W+bWcaUMNlMSX64AF/jDK4Zf8FuXOaIFvewZWB8df//BsCMf7ujq5MteRdguSqcr7bdeCKrEMahof7IJv7p+sWqJbi51OK/XchtjS/d7JE/P2bRF6nMHghV3EZ2SSIGozEVlOSZS+6K24WYHYrcFTUYelG959Ez7yxCkMpwPrr3MjoAIyErOK3cREF7fr4gRAgp1jcdjhcPwR3sd1YbDBEioLh5Bn7A/+d7FGTvVmrJ77k+ZOSkIKA0kzuWZkYcHxdM0TITbA6g/Vi+X0z4VAUYe9pU2sWo2s3kVWlaSeiTHOPJ2Mjqur9t8hLEjUHxp+fQel8XPvCbP46XR723CbAtYoN0GPuQB9glhVQCebhTKVz8pkVPQo97YgqmhN7pBeM6QN6nAW0BfzDLd/72hBBkropc04zI1rI3FqQvDvURNH7Vsz+oBPt9ewTBgBHSTuKub2sL3j6ZmDw6DO32Uz91v0af8uDl7+OZ7TdroCGgM49UhHYKanA1QZqL8VJgcp8b84HoBO24Af0Jdu2su5Reesa63snFhssoB89KlVBSKhP2NJeBVL/rYQYEDiEbcgzMhm6exdLSNiCdYC3bfzpSl1Mx/NbIL6Wjjx3MmwV1omkAGM4vBvVm3HlDwuui+bMABKhmfk/uKIc231gyq3bjk6w7m+roSIPNW8P0VThKWw43Sm2M5YGvyea6HXj/yU6Dtf+ectXUzIcAubmZGd8mqgXD+eyXu9S7o/MX/y31zsc0S+3p6ECkBbjs36AhFhNTBSEUiDxY+4PSuq2PzpEhfomxNlRvkfDdlO1FSjyKD87PmB1icY5U59oVyAvAqcbymPl/XqgeR8yvAnsX90frnhkzOfiy8DF0fTG21+ZkLLgWBUC/BPowMGLH7FGmrR/kYWrYO9Ta1VFbbQPSDaC18JygeQWVqST9tPu0yZXilOgyfKnqCM/9M3WasdJODmz0UlZD2+IDn/GfnNDV34FhC7EutG0YZS6CdSwiLHhQObCsQB/a+kTazTSMaIGN+dz0uqYq9/Q9DMiEnM0s62mI3hUkyHYmheJ69eymDj/CY0QPAn8EKuKEoVkd1MBctoF5JI/1xrIHlJBJxjkXIku40W2qX6qy5LA+xE0jkSSXn0VGtyhmuvtV1hFCBHt7C0ZC6G1ZAwLBcEyVPsCyUvS3kP4vE/W/hS+JjNxZZZZiAhzqXBAipoxJlxlbUQ9RMdXKX3ukkSoEv6qMQr0eZEChcaoYg986WEdlsmh+Wh9NNIQC0TW5HpPMRD93TYXz3gHTofznTBWvmjjzCF5iaBcMFCsWebdhu7KCXGqg6v229G/xdsDzvURtx94xqg+A/YYx3xvCQecnQmDpaglMNMbCDFG+Hglxzi1vf51ctt9iOXbZs3GeOw8QmaKCeE5vv19oFkleVXmuRdVXddW/UAXPs6TuXla8IXlFAX3qoP9sJz4FPKJKmAHi6vhA73MAMTl8wBG3UgeMh00PrHF55t/b4z2G5u9GL+AGxPGUWXJ4JR/HUrhuB48REAc54ihdETm0LRx01HdVfgkoGe5ngrzjr7+k38hV8nBm0J26M0EDl84zDH7zZ6ZDFdjX/i5TEwW2MT1M4psPsayn2SnNELDgnur2ZzCa5ItxAj/f1ViB8oHjkI2IGLQSsWFRcHJ6v9cI0NC0gt9fDUnIZJwvR2MGGqdt2FLde/mA/zQyKPr9oBVl5pWgrWcvXJMkvSbfYQPfbg60ItDH7YnIntBVEF05FzjI/dkbGgU6SjuumtuBddwdwpvX1BuZh2GKY0GMuL1CnChRtt6QinecV7wm5/78K6khCdy97wHlHJmU8p/nMjj0T/WZx+usegsQ6j0bq4IUeTiG",
        "iv": "i50SVm1narzEE/HR",
        "salt": "yhbOlVc9/DnO+6CtujQ8VA=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "H/jmvaCmZQE543Wa/RntPx4fVriZZyXc7N6mxfF5tKCDdySOjyM0Wj7/YK6cV414puFPFRPydYS59FiFmomzpxd7rZ3D/lKpFQsj+KwSxB/V1IDlY1HKpMXzKL9xTw1U706ckPGX9jBAGjgcAYhsjfp+l30P6C14fWP04jeiTIRLS/IojZ55wkBKHPWDAGYGhMaaVj1xhOxBNNwBganH+dJnG1k30C/MWoGwSx8g+wFIeUBgYPXZ4ZdBzZ9jYCRIzFvUgrVKJ0I6kHE45hEvLlq/TjS0dAKS2nGwJAccGF1+nYLVKzAESSbMF4AmlNmr6rbj2p9miDAWHkAwGGWxlkGnROu5inkytp1+m8uSOFUVz2onm8atlSm72uJg7ABPnWS7dtwaqfC3wGG0vCieHEberoSVxhXUi72/qzE2wewxAXhuAoNxBg3VIS5GfI8M74OlnYniS1wUsbpOfYsa0D5/KlFc7yWULFTVuK1qFgDup+tjAaRqTUbJMF7jenLNuKAExamSGa8tyIPl7EweRzLBu7rM+e8PfdLFdHMJlgUCXr9DPCWT0rKBf3zvBdu1HWYCOSBQmuf/agCwspu6KK7i9HiWnN8/t4v26c4YuQdRKVC0Sfkc+rDcJS1gdQYnDWXXGjWAeXdktY1ja/VwiXbzCHFHeje4FcRjrOTA3Pv8zUhIh1962LAMK58oEXsSzG0AQF85gSTb5Zzb0bRpQjZz8RzC3fcN/4x2N4faUuqgdY/+GCoOkNngCk23hzebH501ayP6ZMFgHVIePmC9uTB3625wL4igvgqTkVIwQuLGwgThfJcWnSZ1iIPW7X1hMlCuV1kavVcUGQb6rRA+NN9DYsAWXea64ZJq55bs3bueoJiDRB+wBPksbIELrWGNsiCR7+/NycFHQSUQ8+4drQekiDpHlX+gs0PdNmsSWfgCydn6Umw5C9WH+I9s66l17h4MKXGLjtFj7QWmRp1amzzqQZ+VVnRPjaB071Nyx27PoYQ5FHXBUlr+jNXZHSTcshRqjYdSx9+YIT2v6YwKkeCKzJqWRnRIUGftozPwvmy8/cCs1yQLEAKtcfDlxAYwRONtQIKL89ERG/Hy/QBEHIovwD81RQa/VQW4oX9dheRDs1Lec5TyOA1owVqKwNToyX+5n0O8174tM/LpcSjKYlZJGmhDt7W4mPRSPcaGssJeG5hRxBnF3TBskbO51fZhb5PX5QmAkfFJmRCGWczKosrwnTcoUi+on5dLPh3UlSgIeamS4zTp6tJ4kp/EPdf6TYkVNFQdrIN/RocYld7sXSrRlPc/hu6CPSQxpL62EjIwn6/A+1cJVHF7DN/q8HdiWOav2VcmKg1e06mNbop3A2bTq1it+e4TKT2br2SMTKLg9Mmcf3QIWXexVyLm4g+gZs4t0DgY2D2Vumhcv8uUugFhJtUQ6yW6nsUeicKYvtuS7eMm3efa37D5ldkqiHqXx9+ng7US+Yd8ycmjU18U9ghtrztqtA5jyKo+T9dCS//8k8ayrnZxtwGLqP9qErpukdpZwfUf5BfI1Q3PUJehZifOszoMIYPhY3yZe86iFmDmUdln7qjWbdyAckRUHcLKRIEOh2ZN9pO45KvEfD0x/bD4UcJPEs0eTum34dUJfxCxAxz1YU+3g2TulBMO0Eb6cPpd34rRnOhCMxRtTChy2xYE54+w1qgXfNk0W54sbkRoNWWGhsnZwEQtEqpvjUSdwDXKKMo5BL7eSmMPbD9gBt9jfUX2oDHrC3PjM1tUCjMxPF7XOrUBgOa+g3hgalhKg6Cew530YAxBct+D6ysEikkaZR1f7Q2YipDRmWb++S82Y52OnedJNuoFwVVzSeN/RytqaaqYPSt4cLQ1Qq55fjUu8oKk",
        "iv": "CpaHEsKWyQrmHUQu",
        "salt": "khCfQXhR5rDAcEsMD6GrKg=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "yrKxEleqeSUT77FhuQS5/hS2sf8hBKuQttNGOy03zwRs+8IWuk8Bn0SdRfoYR1TIr5P/6hC9GPmsD9HjUdqDRoivGAxFM438AOgwL+EYb2yWddDPIIc4GX2w8avbuUye9HzHSitsD47ZBhKnCeZScph+o0F6tIn0ayPcigcagFg4CbyfBVYy15M9QANQcjjOgFgJlqNvVoPgGEcZTDWvWvrEH7+sdmyTJT+WjFQHfVcZ/JfkwjbM8YDpXmeW1EciqTbihliyIe59PGEnRPKOk+eHi36GWN1QFstJy97xrlZHdMIARkbd5UsBDpvGd/FlbNA26oq7/kYSqLQUbjHyQzQTBe7Tc5Bg2FqjkLkP1TO7gcVWomqAGM6HG89ZBZelFOD7y5vOgZlwMO/BEpBSpGmnS8TclEj0JSS9NtITjsdO0MBhEp7IBCuATT9P5iyEmT9Pi/5angEy42RFir9n5c6TOKBT5VBZesdwSavudzkW7lhXPMm32TprjucYqRhOA89vvx2NEXeKlne0Z13LjwKuB7MHg55vh2OU2rd/HsMjvnRmbOqmyA0v3BukLATM3ZqfyyyCmbtBLJbtkpiqup6OKXVXde4KI+AY24fztWzQWMY8fuWPv0JezItQI5dW4/PccktiHw5yMravIYwRIb4P0nlUp5/GX809ITxFQw9e6f8phl2tZGXT/eeoXw/k5rqCrQ7odHOZyVYXX0GnnVFggWbFpiC3cnO2GIYjNlhYOkEnfkXYOyacbv7pAUJ1oiNTwr7glAhYZZk/WeZ647wH1V5tnqjUlQUk8D0XUOVfqfNDlMJceRYnJSAlFAs5oZN43dnehSEdp6p8QJqM/ISSv99HaBvtpgdEgFsa4mZ8WsV7p3+d5sOJsKsQrrp5FrOINX8ueua55LrlrKRHDNYm8Eg7PkffBzHRdnSokg69Ixt8LQWHRh2iRtoHEFmTT9TGLb7Cx0cx6m+dzzBvteFzMkf2XG48YUuRCEJqwGk77AgXzALLh6iMAgxVWhy+1/jrG6UJzu0r8/0rjTegulQUs45g/b2MiXzbwR51WZTjqyKruEfptLRsdygdDzsFbbwgeH1Zj5KlHx37jZIZF3OFFPAC3uIgOQCX4ArS7jYExLeg3bJYGGyPUNrcUdQjLsyH45PsxnkzJWsOri0ZWCud3tdgEa5iMtMqle0EGVaZpu6Zly+b5KQqjMs1TsUIgvUlyVqUjIZJeyfAlJTUHoZyjteO4JhCCNRSdbu1DUort4poi0K4NF5YFBISiLnWQJ07gkySg5YLGUtQ16JIu5A943iHsqGbehGq11tWO2CKxEQWT7WZuDIMYDI3eb+2tGYYPi2MFefLxi3B6CIRv0wXnEZ/c0RlcfGc7o5z84FWoqQWFfHJl0qPUjUvvmD72elbie3M3dPnGKSnLkt0BlgH3DFbLeqAI6x5dFLkFtEIb5Czs+0KUn0siPqGSmo3H0h6/ri2Uj4AVdTlm33PnkVZ5WnYE5zJWvRDnYonU/Ony4Runq1dy5PG372pMYyK+3qM88zQKlUN1dMXsRg87Ise2p3fP+5aVN5lNZTu9TfCEJEjphmUXhwTt3kduSSRKfeUjAFt4KIAgfiXIfLpdP2Y/SURqmd7OcEmqhau5sx3dO/FvHbeMFYSX+wzqVuj6lyRIMnOJ20aLfdzB7DM1FHOzYMW7iDKgp1QkEIRnbkkh/l1vviDGe7+LDMTO2gpsNzwscmph4wOuPfbhCVN0AD9LfCSRPQVox65/d5yzNxHqvHUSqVeJgIzbp3WsBwqWZ3FZmBG5K9DaS+13/AZh6UzZ4/ubdQ1XI1OQ17gkkO7qhG6XAGSuKki3cWPUB6CiOZomrnQ5aIPeUaNLpYgBGw0UdMj",
        "iv": "mdtrWMKSODMmJNrL",
        "salt": "Y8reYQMM+KTnGdTMUH/UZQ=="
      }
    },
    {
      "id": "char_4",
      "name": "송백화",
      "hanchaName": "宋白花",
      "age": 45,
      "gender": "남",
      "occupation": "종로 혜민약방 주인 & 한의사",
      "summary": "종로 육의전 인근에서 명성이 자자한 혜민약방의 침구사이자 동양의학 권위자.",
      "avatarIcon": "doctor",
      "passwordHint": "비밀번호: 혜민 (또는 5512)",
      "publicInfo": {
        "appearance": "품위 있는 회색 명주 두루마기, 흰 수염을 정갈히 다듬었으며 낡은 흑색 가죽 왕진 가방을 휴대.",
        "timeline": "배상호의 지병인 협심증 환약을 전해주러 밤 8시 30분 구락부 도착. 차를 마시며 대기하다 8시 45분 배상호를 만나 약을 건네고 1층에서 찻값을 치렀다고 진술.",
        "testimony": "배 회장은 오랜 단골 환자입니다. 성격은 급하고 욕심이 많았으나 제게는 귀한 손님이었지요. 제가 건넨 심장약 환약을 드시고 편안해하셨는데 어찌 이런 일이...",
        "belongings": [
          "흑색 가죽 왕진 가방",
          "침통과 한방 진맥 베개",
          "약재 수첩",
          "황동 안경집"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "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",
        "iv": "xjlYBng3SmcrTSTl",
        "salt": "p7OUC7m4iTo2jQfMDgMoyQ=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "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",
        "iv": "lVxNNdH6kcNfV7sO",
        "salt": "RN830329Pi/4pDnWqTY0mQ=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "2OgQepBiS0JYNzIBuropNoa3tLplqpxgZgedBwHvxJM5EE84Y45XclzDljDGb4Yr8dbdKnOZiAcWKtC82V3/nu1xBb6F/tOkKxJaqztsBJ0yxqjSjBvyZZE6IJu7A6YU4VSjpCk9dp2m5irccjxsN05f4GwYZvpDGZcUSa3vWVI+ESrIseDuJSPeGRIGRXWxgc8ujlV7VqcdoTUZQrmOe0qoxRbybop/zflJtoc7OBBfnpff/qMfczZpeZDL7Gpaf+ekfXXBGNmUnwpviDZDmVNyYMvWrbq3r/WLbmREwp5kLluCQLHLv+un1bnFPYwmufoZTsMZ0O2Gub3MRGSTBGJwzlVwjSa0tzpyyAwq08uS8fe8UdHdCNdoQ1NZ5758Adb06IAFRYbm64TFzwg9CJODm2qyUWvRnNj6Tr+b8pCGBRKlyIZkB9c5NRoTnuFcS7SAOMcg1UhqVaj5SBkXejvDixcoKzLrP4VNSVJrjz1lRLKzUytvjIKp+TmxfvVxQRkLXW3d8ht2zpTqfc2878Vpmk8LjUKZPf9Z5VhfhgFto4ZQsvR43mTkWI/XVoqW/a3DNo8YLF4QrS7jwFXRioTtYadfIXiPR05XtsZKtmltNES4D9uynFTtyEy/hRZPZIYjkqS94ZOJCLqvi5GcK50XkHtcSCIe3b5iUNLKjYjzzRJz8CqpGuz1DJGl3I7XIBTgMvbiCaN06+bNHxp9BcpntjtWo/D2DMpfaAR+Axksne9E4fmcBTIDJC4FPwdzlFyC95xe1qIMCn2iM5U5xAMzmAW6Koango/6FVs6P8N6acvJfWia8tin81pOAGiEa+4b+dm5THbmZE3baf40eXdBAq+lDB+QU6GFADIHA6gMqD3jTwZbyd6Am+tZGZ9n6cJm0OhcXG2sWGe+6Yh/BaJbH2FNjKXO5GRildSwqJsddPf7Nys84YB/qQp7pmbs4cTfOaSSGElAyumPy6yNBzIWupkBYE8vazIrMTjHI7sYOstrEJnjTNwpLN/RPtdJ+rAVIsIkR/9+v89LRM5XTmsSVsEfn6cSgnSy1u6cnnEY3jqsCYHgUYtrMywHT2ri/Ji079MQMS6+t5Aks/7b+BsX75+2lJrqVQfxtbY6ea+fQRcK6w3GmGRvlwEnNxyyPJLguDj0i/iJT0Vy82r5OchQGhIgFhZxm7kzR61pVLTkqvlWnYEqSPcq+K9RxdufNy0neM33vhh8sJlUAFdwo5YXeSx2cRKyh3031U3dvH37yz8W9GJmjaHQe26cQj4i2PTVhGhOIg7d55cZIjODihxzQ0e/kvDSZ+Jvs7KKJryK6JJfa5JmIdN/dgs3Ps8L+WwedHkPyrAE+SAWNHAzSBjIVsUxE5t31ewL/dQL5jXstzUkkxEOmY365m7Ta2SrCkc3X/63yfsSxawT7i6mbTeiG8oz+170l3ARQqTsFUT2tMagjWWfOaCH9NH5DJa3EFJPZ9O3p2qCtfBckjoDd/1pAwaKS0XpTcvQwzYSTj6jMPKUH64df3prpJUqW5FtLVnazVVnKlojTP2vOxkBiFl+9L8t+HwqSNdAJ4Oohcv0gvtBuFdGbh8385daBoFbNtGbpPWvs9HkBnqqbdcRt84TuMD17zORTFWeBKl6Q6nHsUDtjlDARpEXMpWNwdYcrNUmH5E1z6fFxREqAEQUyjBpLjjhcYS9XZbVvtszRJpp2yTM17GO2IVl+Tm5LSjqhMDIjjYQGgQtDrKHoT1+zaS7Ssg8/r6eXORTZ/sYsdeFhoEGl0sNe7TKkFjlbaMhNf+ONDpmnN9Dkwr771dcfgDG/SYf+RIfR+dE177OXDrZ9LSJt5NbJPiTa2+abI7lIiv6xLmzhmDHj1sBxQ1vmRNMlr5Uec6cTBLvuUUI3IHrOiT2wjdyZ6Lyq/NrUWZdC/SCUOlXxDMfVbNhQxoOuqEbEjYzJqUN8J5SbtdWXB7fIjP5wtARxgyNinIJVrQN4vTrEdeB0ZtEErehQwexKK3gOoBJt1eViLP26Ky+vRyzzn4Q8bDlXkqgoDYkNRhDem+68GxizgXssw0VwuKsfFWTZUHJgicxFX9jd2npcZhjmlw=",
        "iv": "rEJeQqJIhCGDVgDF",
        "salt": "X3pGk+lSdh0OtwYmopay1A=="
      }
    },
    {
      "id": "char_5",
      "name": "고바야시 켄지",
      "hanchaName": "小林健二",
      "age": 29,
      "gender": "남",
      "occupation": "경성제대 법학부생 & 아마추어 탐정",
      "summary": "조선과 일본의 법률을 연구하며 서양 에드거 앨런 포와 코난 도일의 추리소설에 심취한 인텔리.",
      "avatarIcon": "scholar",
      "passwordHint": "비밀번호: 인텔리 (또는 9090)",
      "publicInfo": {
        "appearance": "단정한 짙은 회색 제복풍 정장, 둥근 흑색 뿔테 안경, 두꺼운 독일제 법률 서적을 옆구리에 낌.",
        "timeline": "밤 8시부터 1층 구석 테이블에서 커피를 마시며 독서 중이었다고 진술. 9시 30분경 2층에서 지배인이 비명을 지르자 즉시 달려가 현장을 통제했다고 밝힘.",
        "testimony": "저는 단순한 손님입니다. 하지만 법학도로서 현장이 훼손되는 것을 막고자 경찰이 오기 전까지 아무도 구락부를 벗어나지 못하도록 문을 폐쇄하길 강력히 건의했습니다.",
        "belongings": [
          "독일제 법학 서적",
          "돋보기",
          "소형 사진기(라이카 I)",
          "가죽 필통"
        ]
      },
      "encryptedSecret": {
        "ciphertext": "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",
        "iv": "rP4nT304Qhk7brPg",
        "salt": "+Z98Bbohf17Er7e2jgKSSg=="
      },
      "encryptedSecretAlt": {
        "ciphertext": "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",
        "iv": "+jeRHjPsdKBabh38",
        "salt": "s5Nbnkh+uzESQbT8+NER+Q=="
      },
      "encryptedSecretForGm": {
        "ciphertext": "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",
        "iv": "PcXWQ+jfcSv5BMMu",
        "salt": "7ot85lHBeUNM5e0TBRo52Q=="
      }
    }
  ],
  "adminPasswordHash": {
    "hash": "ltiSu2ktme+0wtIX+QADzwWB7XGJ9rModjquXvhDum4=",
    "salt": "LmR+E8Ub7EjDWsWs4Iz7GQ=="
  },
  "defaultTimerMinutes": 60
};
