import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // const data = response.data;

            const data = {
                token: "fake-jwt-token-12345",
                user: {
                    name: "Даниэль (Диспетчер)",
                    role: "admin"
                }
            };

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            console.log("Успешный вход!", data.user);
            alert(`Добро пожаловать, ${data.user.name}! Мок-авторизация успешна.`);

            navigate('/dashboard');

        } catch (error) {
            console.error("Ошибка авторизации", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h2>Вход в систему асфальт план</h2>
            <form onSubmit={handleLogin}
                  style={{display: 'flex', flexDirection: 'column', width: '300px', gap: '10px'}}>
                <input
                    type="email"
                    placeholder="Электронная почта сотрудника"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{padding: '10px'}}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{padding: '10px'}}
                />
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: '#007eae',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;