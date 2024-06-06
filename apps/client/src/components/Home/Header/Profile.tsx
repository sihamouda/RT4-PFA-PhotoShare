import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../../State/Store';
import { login, signup } from '../../../State/Login/authSlice';

const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Profile: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [change, setChange] = useState("Sign in");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (change === "Sign in") {
        handleLogin(data.email, data.password);
        console.log("auth login");
      } else {
        handleSignup(data.fullName, data.email, data.password);
        console.log("auth signup");
      }
    } catch (error) {
      console.log(error);
      setError("root", {
        message: "An error occurred",
      });
    }
  };

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
    console.log("auth login");
  };

  const handleSignup = (fullName: string, email: string, password: string) => {
    dispatch(signup({ fullName, email, password }));
    console.log("auth signup");
  };

  return (
    <>
      <button type="button" className="profile-button" onClick={handleShow}>
        <FontAwesomeIcon icon={faUser} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='Signup'>{change}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='Signup'>
            <form id='editForm' className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
              {change === "Sign up" &&
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label id='name' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Fullname
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      {...register("fullName")}
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="name"
                      type="text"
                    />
                  </div>
                </div>
              }

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label id='mail' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="mail"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label id='password' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </div>
              </div>
              {change === "Sign in" ?
                <div>
                  <div className='center-buttons'>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot your password?
                    </a>
                  </div>
                  <div>
                    Don't have an account?
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => { setChange("Sign up") }}>
                      Register
                    </a>
                  </div>
                </div> :
                <div>
                  Already have an account?
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => { setChange("Sign in") }}>
                    Sign in
                  </a>
                </div>
              }
              <Button className='center-buttons' variant="primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
              </Button>
              {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
