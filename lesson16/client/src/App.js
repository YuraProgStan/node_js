import {useForm} from "react-hook-form";
import {userService} from './services';
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const App = () => {
  const {reset, handleSubmit, register} = useForm();
  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState([]);

  const emailInput = useRef();

  const submit = async (user) => {
    await userService.create(user)
    reset()
  }

  const getByEmail = async () => {
    const email = emailInput.current.value;
    const {data} = await userService.getByEmail(email);
    setUser(data)
  }

    useEffect( () => {
        (async () => {
            const res = await userService.getAll();
            setUserState(res.data.data);
        })()
    }, []);
  return (
      <div>
          <div>
              {userState.map(v=>
                  <div key={v.id}>{v.firstName}</div>
              )}
          </div>
        <form onSubmit={handleSubmit(submit)}>
          <div><label>firstName: <input type="text" {...register('firstName')}/></label></div>
          <div><label>lastName: <input type="text" {...register('lastName')}/></label></div>
          <div><label>age: <input type="text" {...register('age')}/></label></div>
          <div><label>phone: <input type="text" {...register('phone')}/></label></div>
          <div><label>email: <input type="text" {...register('email')}/></label></div>
          <div><label>password: <input type="text" {...register('password')}/></label></div>
          <button>Create</button>
        </form>
        <div>
          <input type="text" placeholder={'email'} ref={emailInput}/>
          <button onClick={getByEmail}>getByEmail</button>
        </div>
        <hr/>
        <div>
          {user && JSON.stringify(user)}
        </div>
      </div>
  );
};

export {App};