import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login() {
  const [toggle, setToggle] = useState(false);
  const [studentUser, setStudent] = useState('');
  const [studentPassword, setStuPass] = useState('');
  const [teacher, setTeacher] = useState('');
  const [teacherPassword, setTeacPass] = useState('');
  const navigate = useNavigate();

  const getAdmin = () => {
    console.log('hello Admin');
    navigate('/admin');
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        userName: 'Admin',
        password: '1234',
        role: 'admin',
      })
    );
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log('submit');

    let data;
    if (type === 'teacher' && teacher === 'Admin') {
      getAdmin();
    } else {
      if (type === 'student') {
        data = {
          userName: studentUser,
          password: studentPassword,
        };
        setStudent('');
        setStuPass('');
      } else {
        data = {
          userName: teacher,
          password: teacherPassword,
        };
        setTeacher('');
        setTeacPass('');
      }

      axios
        .post(`https://event-hub-5axu.onrender.com/${type}Login`, data)
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            localStorage.setItem(
              'userDetails',
              JSON.stringify({
                ...result.data.userDetails,
                role: type,
              })
            );
            localStorage.setItem('isAuthenticated', 'true');
            if (type === 'student') {
              navigate('/dashboard');
            } else {
              navigate('/teacher');
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleClass = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="login">
      <div className={`container ${toggle ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={(e) => handleSubmit(e, 'student')} className="sign-in-form">
              <h2 className="title">Student</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setStudent(e.target.value)}
                  value={studentUser}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setStuPass(e.target.value)}
                  value={studentPassword}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>

            <form className="sign-up-form" onSubmit={(e) => handleSubmit(e, 'teacher')}>
              <h2 className="title">Teacher</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setTeacher(e.target.value)}
                  value={teacher}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setTeacPass(e.target.value)}
                  value={teacherPassword}
                />
              </div>
              <input type="submit" className="btn" value="Login" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <img src="/teacher.png" alt="Teacher" height={400} style={{ margin: '-5px' }} />
              <p>Login as Teacher</p>
              <button className="btn transparent" id="sign-up-btn" onClick={toggleClass}>
                Login
              </button>
            </div>
            
          </div>

          <div className="panel right-panel">
            <div className="content">
              <img src="/student.png" alt="Student" height={400} />
              <p>Login as Student</p>
              <button className="btn transparent" id="sign-in-btn" onClick={toggleClass}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
