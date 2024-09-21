import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {

  const {createUser} = useContext(AuthContext)

  const handleRegister = (e) => {

    
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(email, password);

    createUser(email,password)
    .then(result=>{
        console.log(result.user);

        // এখানে ইউজার ক্রিয়েট হয়েছে যা ফায়ারবেজ এ আছে, চাইলে এই ইউজার ডাটাবেজে ও রাখা যায়


        
        const createdAt = result.user?.metadata?.creationTime;

        // ডাটাবেজে এটা (user) পাঠাবো
        const user = {email, createdAt:createdAt};

        fetch('https://coffee-server-delta.vercel.app/user',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);

            if(data.insertedId){
                Swal.fire({
                    title: "Success!",
                    text: "User Added Successfully",
                    icon: "success",
                    confirmButtonText: "Okay",
                  });
            }

            form.reset()
        })
    })



    .catch(error=>{
        console.error(error);
    })
  };
  return (
    <div>
      <nav className="flex justify-center gap-4">
        <Link to="/addCoffee">
          <button className="btn"> Add </button>
        </Link>
        <Link to="/updateCoffee">
          <button className="btn"> Update </button>
        </Link>

        <Link to="/login">
          <button className="btn"> Login </button>
        </Link>

        <Link to="/user">
          <button className="btn"> User </button>
        </Link>
      </nav>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">REGISTER</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
