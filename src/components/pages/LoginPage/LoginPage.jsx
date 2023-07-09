import './LoginPage.scss';
import loginLogo from '../../../assets/images/rabbit.png';
import loginBg from '../../../assets/images/login_bg.png';
import logoNaver from '../../../assets/images/logo_naver.png';
import logoKakao from '../../../assets/images/logo_kakao.png';
import logoGoogle from '../../../assets/images/logo_google.png';

import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSaveId, removeSaveId, setSaveId } from '../../../utils';

const Login = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [email, setEmail] = useState(getSaveId() ? getSaveId() : '');
    const [password, setPassword] = useState('');

    const [idSave, setIdSave] = useState(getSaveId() ? true : false); // 아이디 저장 localStorage에 저장된 아이디가 있는지 조회

    const onInput = (e) => {
        const { name: targetName, value: targetValue } = e.target;

        if (targetName === 'email') setEmail(targetValue);
        else if (targetName === 'password') setPassword(targetValue);
    };

    const onChange = () => {
        setIdSave((prev) => !prev);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!emailChk(email)) {
            alert('이메일을 정확하게 입력해주세요');
            emailRef.current.focus();
            return;
        }
        if (password.length < 10 || password.length > 20) {
            alert('비밀번호를 정확하게 입력해주세요');
            passwordRef.current.focus();
            return;
        }

        // 유효성 통과 후 로직(Get)
        // const response = await fetch(
        //     `http://localhost:3000/users?email=${email}&password=${password}`,
        // );
        // const jsonData = await response.json();
        // console.log(jsonData);

        // 이메일(아이디) 저장 체크용
        if (idSave) setSaveId(email);
        else {
            if (getSaveId()) {
                removeSaveId();
            }
        }

        // 회원가입 완료 시
        navigate('/');
    };

    // 이메일 정규식
    const emailChk = (email) => {
        // eslint가 정규식을 제대로 확인을 못하는 것 같음... 더 쉽고 간편한 정규식 찾으면 변경 예정...
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return emailRegex.test(email);
    };

    return (
        <div className="login">
            <div className="header_menu">
                <h1 className="main_logo">
                    <Link to="/">
                        <img src={loginLogo} alt="로고" />
                        <p>토끼 책방</p>
                    </Link>
                </h1>
            </div>
            <div className="login_container">
                <div className="con_wrap">
                    <div className="login_inner">
                        <div className="login_left">
                            <strong className="fw_bold">안녕하세요!</strong>
                            <p>
                                토끼책방은 다양한 지식과
                                <br />
                                예술문화 경험을 제공합니다.
                            </p>
                            <p className="join_txt">
                                지금 바로 가입하고 혜택을 받으세요!
                                <Link to="/join">
                                    <span>회원가입</span>
                                </Link>
                            </p>
                            <img src={loginBg} alt="로그인 백그라운드 이미지" />
                        </div>

                        <div className="login_form">
                            <h2>로그인</h2>
                            <form onSubmit={onSubmit} autoComplete="off">
                                <input
                                    type="text"
                                    placeholder="이메일을 입력해주세요"
                                    name="email"
                                    value={email}
                                    onChange={onInput}
                                    ref={emailRef}
                                />
                                <input
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    name="password"
                                    value={password}
                                    onChange={onInput}
                                    ref={passwordRef}
                                />
                                <div className="login_features">
                                    <input
                                        type="checkbox"
                                        className="ch_check hide"
                                        id="ipChk1"
                                        checked={idSave}
                                        onChange={onChange}
                                    />
                                    <label htmlFor="ipChk1" className="label">
                                        이메일 저장
                                    </label>
                                    <button>아이디 찾기 | 비밀번호 찾기</button>
                                </div>
                                <button className="blue_btn">로그인</button>
                            </form>
                            <p>SNS 계정으로 로그인하기</p>
                            <ul className="auth_login_list">
                                <li>
                                    <img src={logoNaver} alt="네이버 로고" />
                                </li>
                                <li>
                                    <img src={logoKakao} alt="카카오 로고" />
                                </li>
                                <li>
                                    <img src={logoGoogle} alt="구글 로고" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
