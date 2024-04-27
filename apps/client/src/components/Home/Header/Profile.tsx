import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

  const schema = z.object({
    fullName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  type FormFields = z.infer<typeof schema>;


  const Profile: React.FC = () => {

  //modal state
  const [show, setShow] = useState<boolean>(false);
  //login state
  const [change, setChange] = useState("Sign in");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //email state
  const [email, setEmail] = useState('');
  //password state
  const [password, setPassword] = useState('');
  //fullname state
  const [fullName, setFullName] = useState('');

  const {
     register,
     handleSubmit,
     setError,
     formState: { errors, isSubmitting },
   } = useForm<FormFields>({
     resolver: zodResolver(schema),
   });

    const onSubmit: SubmitHandler<FormFields>  = async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
      } catch (error) {
        console.log(error);
        setError("root", {
          message: "This email is already taken",
        });
      }
    };

  return (
    <>
        {/* <button type="button" className="profile-button" data-toggle="modal" data-target="#login" >
          <FontAwesomeIcon icon={faUser} />
        </utton>
        {/* Modal */}
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
            {change === "Sign up" ?
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label id='name' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Fullname
              </label>
            </div>
            <div className="md:w-2/3">
              <input {...register("fullName")} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              id="name" 
              type="text"
              />
              <script>console.log("yes")</script>
            </div>
          </div> : <></>}

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label id='mail' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="mail" 
                type="email"
                {...register("email")}
                /> 
                <script>console.log("yes")</script>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label  id='password' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                  password
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="password" 
                  type="password"
                  {...register("password")}
                  />
              </div>
            </div>
            {change === "Sign in" ?
            <div>
              <div className='center-buttons'>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" >
                  Forgot your password ?
                  </a>  
              </div>
              <div>
                Dont have an account ?
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => {setChange("Sign up")}}>
                  Register
                  </a> 
              </div>
            </div> : 
            <div>
              Already have an account ?
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => {setChange("Sign in")}}>
                Sign in
                </a>
            </div>}
            <Button className='center-buttons' variant="primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>                 
              {errors.root && <div className="text-red-500">{errors.root.message}</div>}
          </form>
          </div>
            </Modal.Body>

        {/* <div className='Signup'>
        <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <Button variant="primary">Login</Button>
            </form>
        </div> */}

        <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;

  