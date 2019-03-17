export function bodyValidator(body) {
    if(!/^([a-zA-Z0-9]+)@(naver|gmail)\.com$/.test(body.email)) {
        throw new Error('이메일은 네이버나 구글로만 가입가능합니다.');
    } else if(!/^[a-zA-Z0-9]{8,16}$/.test(body.password)) {
        throw new Error('비밀번호는 8자이상 16자이하로만 가능합니다.');
    } else if(!/[a-z]+/.test(body.password) || !/[A-Z]+/.test(body.password) || !/[0-9]+/.test(body.password)) {
        throw new Error('비밀번호는 영어대문자, 소문자, 숫자로 구성되어있어야 합니다.')
    } else if (body.password && body.password !== body.password_confirm) {
        throw new Error('비밀번호와 비밀번호확인값이 다릅니다.');
    }
}