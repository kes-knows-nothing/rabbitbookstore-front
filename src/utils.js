export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const LOGIN_ID = 'loginId';
const JOIN_NAME = 'joinName';
const LOGIN_TOKEN = 'token';

// 로그인 시 아이디 저장을 체크했을 경우 이메일(아이디) 저장
export const setSaveId = (value) => localStorage.setItem(LOGIN_ID, value);

// 로그인 페이지 접근 시 저장된 이메일(아이디) 호출
export const getSaveId = () => localStorage.getItem(LOGIN_ID);

// 로그인 시 아이디 저장을 체크 해제 한 경우 이메일(아이디) 삭제
export const removeSaveId = () => localStorage.removeItem(LOGIN_ID);

// 로그인 시 jwt 토큰을 로컬스토리지에 저장
export const setSaveToken = (jwt) => localStorage.setItem(LOGIN_TOKEN, jwt);

// 토큰 가져오기(ex.로그인/로그아웃 체크 용)
export const getSaveToken = () => localStorage.getItem(LOGIN_TOKEN);

// 로그아웃 시 jwt 토큰을 로컬스토리지에 삭제
export const removeToken = () => localStorage.removeItem(LOGIN_TOKEN);

// 회원가입 시 입력한 이름 저장
export const setSaveJoinName = (value) =>
    localStorage.setItem(JOIN_NAME, value);

// 회원가입 완료 후 이름 호출
export const getSaveJoinName = () => localStorage.getItem(JOIN_NAME);

// 회원가입 완료 후 일회성 사용을 위해 이름 삭제
export const removeSaveJoinName = () => localStorage.removeItem(JOIN_NAME);

// 공통으로 사용 하는 fetch함수(PUT요청)
export const putFetch = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `token ${getSaveToken()}`,
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

// 공통으로 사용 하는 fetch함수(GET요청)
export const getFetch = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `token ${getSaveToken()}`,
        },
    });
    return await response.json();
};

// 공통으로 사용 하는 fetch함수(POST요청)
export const postFetch = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    return await response.json();
};

// 공통으로 사용 하는 fetch함수(DELETE요청)
export const deleteFetch = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `token ${getSaveToken()}`,
        },
    });
    return await response.json();
};

// 한글 정규식
export const korChk = (str) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);

// 이메일 정규식
export const emailChk = (email) => {
    // eslint가 정규식을 제대로 확인을 못하는 것 같음... 더 쉽고 간편한 정규식 찾으면 변경 예정...
    const emailRegex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
};
